type RGBA = { r: number; g: number; b: number; a: number };
type RGBKey = "r" | "g" | "b";

export default function initColorPicker(opts: { prefix: string }): void {
    const prefix = opts.prefix;

    const root = document.getElementById(`${prefix}-root`);
    if (!root) return;

    // Undvik dubbel-init vid astro navigation
    if ((root as HTMLElement).dataset.wired === "1") return;
    (root as HTMLElement).dataset.wired = "1";

    const byId = <T extends HTMLElement>(id: string): T | null =>
        document.getElementById(id) as T | null;

    const picker = byId<HTMLInputElement>(`${prefix}-picker`);
    const hexInput = byId<HTMLInputElement>(`${prefix}-hex`);
    const hexError = byId<HTMLElement>(`${prefix}-hexError`);

    const eyedropperBtn = byId<HTMLButtonElement>(`${prefix}-eyedropperBtn`);
    const eyedropperHint = byId<HTMLElement>(`${prefix}-eyedropperHint`);

    const rRange = byId<HTMLInputElement>(`${prefix}-r`);
    const gRange = byId<HTMLInputElement>(`${prefix}-g`);
    const bRange = byId<HTMLInputElement>(`${prefix}-b`);
    const aRange = byId<HTMLInputElement>(`${prefix}-a`);

    const rNum = byId<HTMLInputElement>(`${prefix}-rNum`);
    const gNum = byId<HTMLInputElement>(`${prefix}-gNum`);
    const bNum = byId<HTMLInputElement>(`${prefix}-bNum`);
    const aNum = byId<HTMLInputElement>(`${prefix}-aNum`);

    const swatch = byId<HTMLElement>(`${prefix}-swatch`);
    const cssLine = byId<HTMLElement>(`${prefix}-css`);
    const textLine = byId<HTMLElement>(`${prefix}-text`);

    const outHex = byId<HTMLInputElement>(`${prefix}-outHex`);
    const outHex8 = byId<HTMLInputElement>(`${prefix}-outHex8`);
    const outRgb = byId<HTMLInputElement>(`${prefix}-outRgb`);
    const outRgba = byId<HTMLInputElement>(`${prefix}-outRgba`);
    const outHsl = byId<HTMLInputElement>(`${prefix}-outHsl`);
    const outCss = byId<HTMLInputElement>(`${prefix}-outCss`);
    const toast = byId<HTMLElement>(`${prefix}-toast`);

    // Guard: saknas något -> avbryt init
    if (
        !picker ||
        !hexInput ||
        !hexError ||
        !rRange ||
        !gRange ||
        !bRange ||
        !aRange ||
        !rNum ||
        !gNum ||
        !bNum ||
        !aNum ||
        !swatch ||
        !cssLine ||
        !textLine ||
        !outHex ||
        !outHex8 ||
        !outRgb ||
        !outRgba ||
        !outHsl ||
        !outCss ||
        !toast
    ) {
        return;
    }

    const clamp = (v: number, min: number, max: number) =>
        Math.min(max, Math.max(min, v));
    const clamp255 = (v: number) => clamp((v | 0) as number, 0, 255);
    const pad2 = (n: number) => n.toString(16).toUpperCase().padStart(2, "0");

    const normalizeHex = (input: string): string | null => {
        const s = String(input ?? "").trim();
        if (!s) return null;

        const raw = s.startsWith("#") ? s.slice(1) : s;
        const ok =
            /^[0-9a-fA-F]{3}$/.test(raw) ||
            /^[0-9a-fA-F]{4}$/.test(raw) ||
            /^[0-9a-fA-F]{6}$/.test(raw) ||
            /^[0-9a-fA-F]{8}$/.test(raw);

        if (!ok) return null;

        if (raw.length === 3 || raw.length === 4) {
            const expanded = raw
                .split("")
                .map((c) => c + c)
                .join("");
            return "#" + expanded.toUpperCase();
        }

        return "#" + raw.toUpperCase();
    };

    const hexToRgba = (hex: string): RGBA | null => {
        const h = normalizeHex(hex);
        if (!h) return null;

        const raw = h.slice(1);
        const r = parseInt(raw.slice(0, 2), 16);
        const g = parseInt(raw.slice(2, 4), 16);
        const b = parseInt(raw.slice(4, 6), 16);

        if (raw.length === 8) {
            const a = parseInt(raw.slice(6, 8), 16) / 255;
            return { r, g, b, a };
        }

        return { r, g, b, a: 1 };
    };

    const rgbaToHex = (c: { r: number; g: number; b: number }) =>
        "#" + pad2(clamp255(c.r)) + pad2(clamp255(c.g)) + pad2(clamp255(c.b));

    const rgbaToHex8 = (c: RGBA) => {
        const alpha = clamp(c.a ?? 1, 0, 1);
        return rgbaToHex(c) + pad2(Math.round(alpha * 255));
    };

    const rgbToHsl = (c: { r: number; g: number; b: number }) => {
        const rn = clamp255(c.r) / 255;
        const gn = clamp255(c.g) / 255;
        const bn = clamp255(c.b) / 255;

        const max = Math.max(rn, gn, bn);
        const min = Math.min(rn, gn, bn);
        const d = max - min;

        let h = 0;
        if (d !== 0) {
            if (max === rn) h = ((gn - bn) / d) % 6;
            else if (max === gn) h = (bn - rn) / d + 2;
            else h = (rn - gn) / d + 4;

            h = Math.round(h * 60);
            if (h < 0) h += 360;
        }

        const l = (max + min) / 2;
        const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

        return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
    };

    const recommendedTextColor = (c: { r: number; g: number; b: number }) => {
        const yiq = (clamp255(c.r) * 299 + clamp255(c.g) * 587 + clamp255(c.b) * 114) / 1000;
        return yiq >= 140 ? "#111111" : "#FFFFFF";
    };

    const setHexError = (on: boolean) => {
        hexError.classList.toggle("hidden", !on);
        hexInput.classList.toggle("border-red-500", on);
    };

    const setToast = async (message?: string) => {
        if (message) toast.textContent = message;
        toast.classList.remove("hidden");
        await new Promise((r) => setTimeout(r, 900));
        toast.classList.add("hidden");
        toast.textContent = "Kopierat";
    };

    let state: RGBA = { r: 26, g: 115, b: 232, a: 1 };

    const render = () => {
        const hex = rgbaToHex(state);
        const hex8 = rgbaToHex8(state);
        const aPct = Math.round(clamp(state.a, 0, 1) * 100);

        picker.value = hex;
        hexInput.value = hex;

        rRange.value = String(clamp255(state.r));
        gRange.value = String(clamp255(state.g));
        bRange.value = String(clamp255(state.b));
        aRange.value = String(aPct);

        rNum.value = String(clamp255(state.r));
        gNum.value = String(clamp255(state.g));
        bNum.value = String(clamp255(state.b));
        aNum.value = String(aPct);

        const bg = `rgba(${clamp255(state.r)}, ${clamp255(state.g)}, ${clamp255(
            state.b
        )}, ${clamp(state.a, 0, 1).toFixed(3)})`;

        swatch.style.background = bg;
        cssLine.textContent = `background: ${aPct === 100 ? hex : bg};`;

        const rec = recommendedTextColor(state);
        textLine.textContent = rec;
        textLine.style.color = rec;

        outHex.value = hex;
        outHex8.value = hex8;
        outRgb.value = `rgb(${clamp255(state.r)}, ${clamp255(state.g)}, ${clamp255(state.b)})`;
        outRgba.value = `rgba(${clamp255(state.r)}, ${clamp255(state.g)}, ${clamp255(
            state.b
        )}, ${clamp(state.a, 0, 1).toFixed(3)})`;

        const hsl = rgbToHsl(state);
        outHsl.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

        outCss.value = `--so-color: ${hex};`;
    };

    const setFromHex = (hex: string) => {
        const rgba = hexToRgba(hex);
        if (!rgba) {
            setHexError(true);
            return;
        }
        setHexError(false);
        state = { ...rgba };
        render();
    };

    picker.addEventListener("input", () => setFromHex(picker.value));

    hexInput.addEventListener("input", () => {
        const normalized = normalizeHex(hexInput.value);
        if (!normalized) {
            setHexError(true);
            return;
        }
        setFromHex(normalized);
    });

    const wireChannel = (rangeEl: HTMLInputElement, numEl: HTMLInputElement, key: RGBKey) => {
        const apply = (v: string) => {
            state = { ...state, [key]: clamp255(Number(v)) };
            setHexError(false);
            render();
        };
        rangeEl.addEventListener("input", () => apply(rangeEl.value));
        numEl.addEventListener("input", () => apply(numEl.value));
    };

    wireChannel(rRange, rNum, "r");
    wireChannel(gRange, gNum, "g");
    wireChannel(bRange, bNum, "b");

    const wireAlpha = (rangeEl: HTMLInputElement, numEl: HTMLInputElement) => {
        const apply = (v: string) => {
            const pct = clamp(Number(v), 0, 100);
            state = { ...state, a: pct / 100 };
            setHexError(false);
            render();
        };
        rangeEl.addEventListener("input", () => apply(rangeEl.value));
        numEl.addEventListener("input", () => apply(numEl.value));
    };

    wireAlpha(aRange, aNum);

    root.addEventListener("click", async (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;

        const btn = target.closest("[data-copy]");
        if (!btn) return;

        const id = btn.getAttribute("data-copy");
        if (!id) return;

        const input = document.getElementById(id);
        if (!(input instanceof HTMLInputElement)) return;

        try {
            await navigator.clipboard.writeText(input.value);
            await setToast("Kopierat");
        } catch {
            input.focus();
            input.select();
        }
    });

    // Pipett (EyeDropper)
    const hasEyeDropper = typeof window !== "undefined" && "EyeDropper" in window;

    if (eyedropperHint) {
        eyedropperHint.textContent = hasEyeDropper
            ? "Fungerar i Chrome/Edge. Klicka och peka på en pixel."
            : "Stöds inte i din webbläsare. Använd färgrutan eller HEX.";
    }

    if (eyedropperBtn) {
        eyedropperBtn.disabled = !hasEyeDropper;

        if (hasEyeDropper) {
            eyedropperBtn.addEventListener("click", async () => {
                try {
                    const EyeDropperCtor = (window as any).EyeDropper as new () => {
                        open: () => Promise<{ sRGBHex: string }>;
                    };

                    const eye = new EyeDropperCtor();
                    const result = await eye.open();

                    const normalized = normalizeHex(result?.sRGBHex ?? "");
                    if (!normalized) {
                        setHexError(true);
                        return;
                    }

                    setFromHex(normalized);
                    await setToast("Färg hämtad");
                } catch {
                    // ESC/avbryt => ignorera
                }
            });
        }
    }

    render();
}
