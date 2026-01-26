(function () {
    function uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0;
            var v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    function getOrCreate(key, storage) {
        var v = storage.getItem(key);
        if (!v) {
            v = uuidv4();
            storage.setItem(key, v);
        }
        return v;
    }

    function getUtm() {
        var p = new URLSearchParams(location.search);
        var source = p.get("utm_source");
        var medium = p.get("utm_medium");
        var campaign = p.get("utm_campaign");
        var content = p.get("utm_content");
        var term = p.get("utm_term");

        if (!source && !medium && !campaign && !content && !term) return null;

        return {
            source: source || undefined,
            medium: medium || undefined,
            campaign: campaign || undefined,
            content: content || undefined,
            term: term || undefined,
        };
    }

    function buildClient() {
        var anonId = getOrCreate("pi_analytics_anon", localStorage);
        var sessionId = getOrCreate("pi_analytics_session", sessionStorage);

        return {
            anonId: anonId,
            sessionId: sessionId,
            lang: navigator.language || undefined,
            tzOffsetMinutes: new Date().getTimezoneOffset() * -1,
            viewport: { w: window.innerWidth, h: window.innerHeight },
        };
    }

    function postJson(url, siteId, body) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Analytics-SiteId": siteId,
            },
            body: JSON.stringify(body),
            keepalive: true,
        }).catch(function () {
            // V1: ignorera klientfel
        });
    }

    function nowUtcIso() {
        return new Date().toISOString();
    }

    function create(config) {
        if (!config || !config.baseUrl || !config.siteId) return null;

        var baseUrl = String(config.baseUrl).replace(/\/+$/, "");
        var siteId = String(config.siteId);

        function trackPageview() {
            var body = {
                clientEventId: uuidv4(),
                occurredUtc: nowUtcIso(),
                path: location.pathname,
                title: document.title || undefined,
                referrer: document.referrer || undefined,
                utm: getUtm() || undefined,
                client: buildClient(),
            };

            return postJson(baseUrl + "/v1/ingest/pageview", siteId, body);
        }

        function trackEvent(name, props) {
            var body = {
                clientEventId: uuidv4(),
                occurredUtc: nowUtcIso(),
                path: location.pathname,
                name: String(name),
                props: props || undefined,
                client: buildClient(),
            };

            return postJson(baseUrl + "/v1/ingest/event", siteId, body);
        }

        return { trackPageview: trackPageview, trackEvent: trackEvent };
    }

    window.paidinAnalytics = { create: create };
})();
