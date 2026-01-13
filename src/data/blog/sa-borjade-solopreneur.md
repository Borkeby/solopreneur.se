---
author: "Daniel Borkeby"
pubDatetime: 2026-01-12T09:00:00Z
modDatetime: 2026-01-12T09:00:00Z
title: "Så började Solopreneur: från billig domän till första statiska sidan"
slug: "sa-borjade-solopreneur"
featured: false
draft: false
tags: ["Solopreneur", "Astro", "AstroPaper", "Webb", "Nybörjare"]
description: "Jag hade aldrig byggt en hemsida tidigare. Det började med ett namn, en billig domän och en tydlig idé: inga låsningar, bara bygga själv – steg för steg."
ingress: "Jag hade aldrig byggt en hemsida tidigare. Det började med ett namn, en billig domän och en tydlig idé: inga låsningar, bara bygga själv – steg för steg."
kategori: "Bygga"
nivå: "Bas"
tid: "10–15 min"
---

Solopreneur började inte som en “storslagen produktplan”, utan efter en enkel kedja av små beslut.

Jag såg en sida med ett liknande namn, blev nyfiken och började kolla runt. Av någon anledning kollade jag om domänen var ledig vilket den var. Dessutom var den billig så jag köpte den direkt.

Där och då hade jag tre saker:

1. Ett namn och en domän.
2. Noll erfarenhet av att bygga en hemsida.
3. En idé om att jag ville bygga något själv.

Resten fick jag lista ut.

## Jag ville inte bli låst (även om det passar många)

Det finns naturligtvis tjänster där du kan bygga både snygga och avancerade webbplatser “gratis” på kort tid.

Problemet (för mig) är att “gratis” ofta betyder:

- Det funkar fint tills du vill ha en egen domän, bättre SEO, fler sidor, formulär, extra integrationer, bättre prestanda, något eget skript, eller något som ligger utanför standardmallen.
- Och när du väl vill ha “det lilla extra” (vilket man nästan alltid vill), så börjar kostnaderna komma – och du är redan låst i deras sätt att jobba.

Jag ville inte hamna i den typen av beroende. Det kanske är helt rätt väg för någon annan, men jag ville kunna styra allt själv: struktur, innehåll, design, prestanda och hur sidan växer över tid.

Och helt ärligt: jag ser en utmaning i att bygga själv. Jag vill förstå hur det hänger ihop och lära mig något.

## Statisk vs dynamisk webbplats: skillnaden som gjorde allt tydligare

När jag började fråga runt (ja, jag frågade ChatGPT väldigt tidigt) återkom en grundfråga:

Vad är egentligen skillnaden mellan en statisk och en dynamisk webbplats?

### Statisk webbplats
En statisk sajt består i grunden av färdiga filer (HTML/CSS/JS) som kan levereras direkt. Sidorna byggs “i förväg” och kan serveras extremt snabbt.

Typiska fördelar:
- Snabb laddning och hög prestanda
- Enklare drift (färre rörliga delar)
- Bra för innehåll: bloggar, guider, landningssidor, dokumentation

Viktigt: “statisk” betyder inte “tråkig”. Du kan fortfarande ha interaktivitet med JavaScript, formulär, externa API:er, inbäddningar och verktyg.

### Dynamisk webbplats
En dynamisk sajt genererar innehåll vid varje besök (eller vid behov), ofta kopplat till databas, inloggning, användarspecifikt innehåll och logik på serversidan. Se [Paidin Finans](https://www.paidin.se/) som ett exempel. Du skapar ett konto som egenanställd för att kunna fakturera utan företag, kan logga in, skapa kunder, fakturor osv.

Typiska andra användningsfall:
- Inloggade dashboards (startsidor)
- Personliga vyer per användare
- E-handel med konton, orderhistorik, lager, osv.
- System där data ändras ofta och är användarstyrd

För mig blev detta avgörande: Solopreneur skulle primärt vara innehåll och resurser. Då passade en statisk grund väldigt bra.

## Två spår som var gratis: och varför jag landade i Astro

När jag bad om förslag fick jag fram två huvudspår som båda är gratis och open source: Astro och en annan statisk generator (ett vanligt alternativ i den kategorin är Hugo).

Jag fastnade för Astro av tre skäl:

1. **Innehåll först** – det kändes naturligt att skriva i Markdown (MD) och bygga upp guider och blogginlägg.
2. **Prestandatänk** – Astro är byggt för att leverera snabba sidor och bara skicka det som behövs till besökaren.
3. **Flexibilitet** – jag ville ha möjligheten att bygga vidare, inte bara publicera texter.

Sedan hittade jag AstroPaper: en mall som gav mig en fungerande struktur direkt (layout, navigation, innehåll, styling). För någon som aldrig byggt en sajt tidigare var det exakt vad jag behövde.

## Första milstolpen: få upp sidan lokalt

Mitt första mål var inte “gör det snyggt” eller “bygg allt på en gång”.

Mitt första mål var enklare:

- Få upp defaultsidan lokalt.
- Ändra en rad text.
- Se ändringen slå igenom.

När det var gjort visste jag att jag hade kontroll på grunderna: filer, struktur och flödet från ändring → resultat.

> Vill du göra samma resa? Jag har skrivit en enkel guide som visar exakt hur du kommer igång lokalt – utan att du behöver några förkunskaper eller pengar för den delen (det är gratis):  
> **[Kom igång med AstroPaper lokalt (nybörjarguide) – så gjorde jag med Solopreneur](/playbooks/kom-igang-med-astropaper-lokalt/)**

## Mer än “bara en statisk sida”: verktyg och annat jag kan bygga vidare med

En rolig insikt med Astro var att “statisk” inte betyder att du är begränsad till artiklar.

Du kan hosta verktyg, resurser och interaktiva saker på samma sajt, så länge du tänker smart:

- Små kalkylatorer och formulär
- Resurssidor och guider med struktur
- Komponenter och innehåll som kan återanvändas
- Små “features” som gör sajten mer levande

Det var precis den typen av sida jag var ute efter: en stabil innehållsgrund, men med utrymme att bygga roliga och snygga saker över tid.

## Det här lärde jag mig direkt

Några saker blev tydliga tidigt:

- Det är lättare att komma igång om du har ett tydligt första delmål (t.ex. “visa sidan lokalt”).
- “Gratis” är sällan gratis om du vill bygga något som du äger och kan styra fullt ut.
- Att bygga själv tar mer tid i början, men du får kontroll och förståelse som du har nytta av hela vägen.

## Om du vill göra samma sak

Om du är nybörjare och vill komma igång utan att krångla:

- Börja med att köra sidan lokalt.
- Gör en minimal ändring.
- Fortsätt sedan steg för steg.

Jag har gjort guiden så enkel som möjligt här:
**[Kom igång med AstroPaper lokalt (nybörjarguide) – så gjorde jag med Solopreneur](/playbooks/kom-igang-med-astropaper-lokalt/)**

Nästa inlägg kan jag skriva om hur jag gick från “det fungerar lokalt” till Github och källkodsredigerare som Visual Studio och Visual Code).
