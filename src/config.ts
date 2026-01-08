export const SITE = {
    // Använd alltid publik URL i prod. Lokalt får du localhost automatiskt.
    website:
        import.meta.env.PROD
            ? (import.meta.env.PUBLIC_SITE_URL ?? "https://www.solopreneur.se")
            : (import.meta.env.PUBLIC_SITE_URL ?? "http://localhost:4321"),

    author: "Daniel Borkeby",
    profile: "https://www.solopreneur.se",
    desc: "Solopreneur.se – guider, verktyg och kunskap för soloföretagare.",
    title: "Solopreneur.se",

    // Viktigt: lägg OG-bilden i public/og/solopreneur-og.jpg
    // och peka dit (utan 'public/')
    ogImage: "og/solopreneur-og.jpg",

    lightAndDarkMode: true,
    postPerIndex: 4,
    postPerPage: 4,
    scheduledPostMargin: 15 * 60 * 1000,
    showArchives: true,
    showBackButton: true,
    editPost: {
        enabled: false,
        text: "",
        url: "",
    },
    dynamicOgImage: true,
    dir: "ltr",
    lang: "sv",
    timezone: "Europe/Stockholm",
} as const;
