type SplitResultItem = {
    filename: string;
    blob: Blob;
};

type InitOptions = {
    prefix?: string; // ex: "pdfsplit"
};

export default function initPdfSplitter(opts?: InitOptions): void {
    const prefix = (opts?.prefix ?? "").trim();

    const byId = <T extends HTMLElement>(id: string): T | null =>
        document.getElementById(id) as T | null;

    // Stöd både prefixade id:n och gamla id:n (fallback)
    const id = (key: string) => (prefix ? `${prefix}-${key}` : key);

    const dropzone = byId<HTMLDivElement>(id("dropzone")) ?? byId<HTMLDivElement>("dropzone");
    const fileInput = byId<HTMLInputElement>(id("fileInput")) ?? byId<HTMLInputElement>("fileInput");
    const zipToggle = byId<HTMLInputElement>(id("zipToggle")) ?? byId<HTMLInputElement>("zipToggle");
    const splitBtn = byId<HTMLButtonElement>(id("splitBtn")) ?? byId<HTMLButtonElement>("splitBtn");
    const fileMeta = byId<HTMLParagraphElement>(id("fileMeta")) ?? byId<HTMLParagraphElement>("fileMeta");
    const statusLine = byId<HTMLParagraphElement>(id("statusLine")) ?? byId<HTMLParagraphElement>("statusLine");
    const errorLine = byId<HTMLParagraphElement>(id("errorLine")) ?? byId<HTMLParagraphElement>("errorLine");
    const results = byId<HTMLDivElement>(id("results")) ?? byId<HTMLDivElement>("results");

    if (!dropzone || !fileInput || !zipToggle || !splitBtn || !fileMeta || !statusLine || !errorLine || !results) {
        return;
    }

    // Idempotens: undvik dubbel-wire vid Astro navigation
    if (dropzone.dataset.pdfSplitWired === "1") return;
    dropzone.dataset.pdfSplitWired = "1";

    let currentFile: File | null = null;
    let currentPageCount = 0;

    const setStatus = (msg: string) => {
        statusLine.textContent = msg;
    };

    const setError = (msg: string) => {
        errorLine.textContent = msg;
    };

    const clearMessages = () => {
        setStatus("");
        setError("");
    };

    const clearResults = () => {
        results.innerHTML = "";
    };

    const humanBytes = (bytes: number): string => {
        const units = ["B", "KB", "MB", "GB"];
        let v = bytes;
        let i = 0;
        while (v >= 1024 && i < units.length - 1) {
            v /= 1024;
            i++;
        }
        return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
    };

    const baseName = (name: string): string => {
        const n = name.replace(/\.[^/.]+$/, "");
        const safe = n
            .replace(/[/\\?%*:|"<>]/g, "-")
            .replace(/\s+/g, " ")
            .trim();
        return safe || "pdf";
    };

    const padPage = (n: number): string => String(n).padStart(3, "0");

    const readAsArrayBuffer = (file: File): Promise<ArrayBuffer> =>
        new Promise((resolve, reject) => {
            const r = new FileReader();
            r.onerror = () => reject(new Error("Kunde inte läsa filen."));
            r.onload = () => resolve(r.result as ArrayBuffer);
            r.readAsArrayBuffer(file);
        });

    const isPdf = (file: File): boolean => file.type === "application/pdf" || /\.pdf$/i.test(file.name);

    const downloadBlob = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
    };

    const renderZipResult = (zipFilename: string, zipBlob: Blob) => {
        results.innerHTML = `
      <div class="rounded-xl border border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
        <div class="text-sm font-semibold">Klart</div>
        <div class="mt-1 text-xs text-foreground/60">${zipFilename}</div>
        <button id="${id("zipDownloadLink")}" class="mt-3 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black" type="button">
          Ladda ner ZIP
        </button>
      </div>
    `;

        const btn = byId<HTMLButtonElement>(id("zipDownloadLink"));
        if (btn) {
            btn.addEventListener("click", () => downloadBlob(zipBlob, zipFilename));
        }
    };

    const renderMultiResults = (items: SplitResultItem[]) => {
        const cards = items
            .map(
                (it, idx) => `
        <button
          type="button"
          data-idx="${idx}"
          class="w-full text-left rounded-xl border border-black/10 bg-black/[0.02] p-3 hover:bg-black/[0.04] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
        >
          <div class="text-sm font-semibold">Sida ${idx + 1}</div>
          <div class="text-xs text-foreground/60">${it.filename}</div>
        </button>
      `
            )
            .join("");

        results.innerHTML = `
      <div class="text-sm font-semibold">Filer skapade</div>
      <div class="mt-2 grid gap-2">${cards}</div>
    `;

        results.querySelectorAll("button[data-idx]").forEach((b) => {
            b.addEventListener("click", () => {
                const idx = Number((b as HTMLButtonElement).dataset.idx);
                const it = items[idx];
                if (it) downloadBlob(it.blob, it.filename);
            });
        });
    };

    const updateUiForFile = (file: File, pageCount: number) => {
        fileMeta.textContent = `${file.name} (${humanBytes(file.size)}) • ${pageCount} sidor`;
        splitBtn.disabled = pageCount < 2;

        if (pageCount < 2) setStatus("PDF:en har bara 1 sida, så det finns inget att dela upp.");
        else setStatus("Redo att dela upp PDF:en.");
    };

    const loadAndCountPages = async (file: File): Promise<number> => {
        const bytes = await readAsArrayBuffer(file);
        const { PDFDocument } = await import("pdf-lib");
        const pdf = await PDFDocument.load(bytes, { ignoreEncryption: false });
        return pdf.getPageCount();
    };

    const splitPdf = async (file: File): Promise<SplitResultItem[]> => {
        const bytes = await readAsArrayBuffer(file);
        const { PDFDocument } = await import("pdf-lib");

        const srcPdf = await PDFDocument.load(bytes, { ignoreEncryption: false });
        const pageCount = srcPdf.getPageCount();

        const out: SplitResultItem[] = [];
        const bn = baseName(file.name);

        for (let i = 0; i < pageCount; i++) {
            setStatus(`Skapar sida ${i + 1} av ${pageCount}...`);

            const dstPdf = await PDFDocument.create();
            const [copied] = await dstPdf.copyPages(srcPdf, [i]);
            dstPdf.addPage(copied);

            dstPdf.setCreator("Solopreneur PDF-verktyg");
            dstPdf.setProducer("Solopreneur");

            const pdfBytes = await dstPdf.save({ useObjectStreams: true });
            const blob = new Blob([pdfBytes], { type: "application/pdf" });

            out.push({
                filename: `${bn}_p${padPage(i + 1)}.pdf`,
                blob,
            });

            await new Promise((r) => setTimeout(r, 0));
        }

        return out;
    };

    const toZip = async (items: SplitResultItem[]): Promise<Blob> => {
        const JSZip = (await import("jszip")).default;
        const zip = new JSZip();

        for (const it of items) zip.file(it.filename, it.blob);

        setStatus("Bygger ZIP...");
        return await zip.generateAsync({
            type: "blob",
            compression: "DEFLATE",
            compressionOptions: { level: 6 },
        });
    };

    const handleFile = async (file: File) => {
        clearMessages();
        clearResults();

        if (!isPdf(file)) {
            currentFile = null;
            currentPageCount = 0;
            splitBtn.disabled = true;
            fileMeta.textContent = "";
            setError("Filen verkar inte vara en PDF. Välj en .pdf.");
            return;
        }

        currentFile = file;
        splitBtn.disabled = true;
        setStatus("Läser PDF...");

        try {
            const pageCount = await loadAndCountPages(file);
            currentPageCount = pageCount;
            updateUiForFile(file, pageCount);
        } catch (err: unknown) {
            currentFile = null;
            currentPageCount = 0;
            splitBtn.disabled = true;
            fileMeta.textContent = "";
            setStatus("");
            setError(err instanceof Error ? err.message : "Kunde inte läsa PDF:en. Den kan vara skadad eller lösenordsskyddad.");
        }
    };

    // Drag & drop
    const setDragOver = (on: boolean) => {
        dropzone.classList.toggle("is-dragover", on);
    };

    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        setDragOver(true);
    });

    dropzone.addEventListener("dragleave", () => setDragOver(false));
    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        setDragOver(false);
        const dt = e.dataTransfer;
        if (!dt?.files?.length) return;
        void handleFile(dt.files[0]);
    });

    dropzone.addEventListener("click", () => fileInput.click());
    dropzone.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileInput.click();
        }
    });

    fileInput.addEventListener("change", () => {
        const f = fileInput.files?.[0] ?? null;
        if (!f) return;
        void handleFile(f);
    });

    splitBtn.addEventListener("click", async () => {
        clearMessages();
        clearResults();

        const f = currentFile;
        if (!f) {
            setError("Välj en PDF först.");
            return;
        }

        if (currentPageCount < 2) {
            setError("PDF:en har mindre än 2 sidor och kan därför inte delas upp.");
            return;
        }

        splitBtn.disabled = true;

        try {
            setStatus("Startar uppdelning...");
            const items = await splitPdf(f);

            if (zipToggle.checked) {
                const zipFilename = `${baseName(f.name)}_split.zip`;
                const zipBlob = await toZip(items);
                setStatus("Klart. ZIP är redo för nedladdning.");
                renderZipResult(zipFilename, zipBlob);
            } else {
                setStatus("Klart. Klicka på en sida för att ladda ner.");
                renderMultiResults(items);
            }
        } catch (err: unknown) {
            setStatus("");
            setError(err instanceof Error ? err.message : "Ett fel inträffade vid uppdelning. Testa en annan PDF eller försök igen.");
        } finally {
            splitBtn.disabled = !(currentFile && currentPageCount >= 2);
        }
    });
}
