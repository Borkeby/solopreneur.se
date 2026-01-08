---
title: "Momskalkylatorn: från idé till live – och problemet med LinkedIn-preview"
author: "Daniel Borkeby"
pubDatetime: 2026-01-08T10:00:00Z
modDatetime: 2026-01-08T10:00:00Z
slug: "momskalkylatorn-fran-ide-till-live"
featured: false
draft: false
tags: ["Moms", "Verktyg", "Soloföretag", "Astro", "Open Graph", "LinkedIn"]
ogImage: ""
description: "Så byggde jag Momskalkylatorn, hur lång tid det tog, vilka utmaningar som dök upp – och hur jag fick Open Graph att fungera på LinkedIn."

tid: "5-10 min"
nivå: "Bas"
kategori: "Blogg"
ingress: "Jag byggde en egen momskalkylator för att bevisa konceptet med Solopreneur – och lärde mig mer än jag trodde om Open Graph och LinkedIn."
-----------

Jag vet att det finns massor av momskalkylatorer. Ändå byggde jag en själv.

Dels för att Momskalkylatorn är ett av de där “enkla men viktiga” verktygen som jag vet att många faktiskt använder i vardagen. Dels för att jag vill bevisa konceptet med Solopreneur: små, konkreta verktyg och guider som gör soloföretagande lite enklare.

Och efter 10 år med "fakturera utan företag" företaget [Paidin Finans](https://www.paidin.se/) är min bild tydlig: en av de vanligaste och mest missförstådda momsgrejerna är baklängesmoms. Du har ett totalbelopp (inkl. moms) och vill snabbt få fram momsbeloppet och belopp exkl. moms. Det låter trivialt men skapar ofta osäkerhet.

## Vad Momskalkylatorn löser
Momskalkylatorn hjälper dig räkna:

- Moms baklänges (från inkl. moms till exkl. moms och momsbelopp)
- Moms framlänges (från exkl. moms till inkl. moms)
- Vanliga momssatser: 25 %, 12 % och 6 %

Den är byggd för att vara snabb: skriv in belopp, välj momssats, få ut resultat direkt.

## Tidsåtgång: utveckling och innehåll
Jag har medvetet hållit verktyget smalt. Syftet är inte att skapa en “mega-app”, utan att leverera värde snabbt och sedan finputsa om det behövs.

Ungefärlig tidsåtgång (för transparens):

- **Utveckling av verktyget:** 30 min
- **Test/justeringar:** 30 minuter
- **Copy och publicering:** 1 timma
- **OG/LinkedIn-preview felsökning:** 1 timma

(Det som överraskade mig mest var att OG-delen tog oproportionerligt lång tid jämfört med själva verktyget. Men så är det alltid när man gör något för första gången). Nu är det gjort och fungerar framöver utan att jag behöver göra något samt att jag vet vart jag ska ändra om jag så önskar.

För dig som inte vet vad OG är: det är den bild och text som visas när man klistrar in en länk i ett inlägg (t.ex. www.solopreneur.se). Det styrs av Open Graph-taggar som `og:title`, `og:description` och `og:image`.

<img src="/og/solopreneur-og.jpg" alt="OG-bild för Solopreneur" style="max-width:600px;width:100%;height:auto;" loading="lazy" decoding="async" />

## Utmaningen jag inte räknade med: Open Graph och LinkedIn
Jag hade koll på grunderna: `og:title`, `og:description`, `og:image`. Ändå ville LinkedIn inte visa bilden.

Det jag lärde mig:

### 1) LinkedIn bryr sig inte om vad jag “har lokalt”
En klassiker: allt såg rätt ut i min lokala miljö, men `og:image` råkade peka på **localhost**. För mig fungerade det lokalt. Men självklart hittade inte LinkedIn min OG.

### 2) Stabil URL till OG-bilden är guld värd
Jag flyttade därför OG-bilden till en stabil path i `public/og/solopreneur-og.jpg`.

Det gjorde URL:en enkel och förutsägbar, och minskade risken för cache- eller byggrelaterade överraskningar.

### 3) Post Inspector var ett nytt verktyg för mig
Det här verktyget visste jag inte ens fanns:
[LinkedIn Post inspector](https://www.linkedin.com/post-inspector/)

För den som redan jobbat med det här är det säkert självklart, men är ett oväntat enkelt och användbart verktyg:

- Du kan se exakt vad LinkedIn läser.
- Du kan trigga en ny “scrape”.
- Du kan verifiera att titel, beskrivning och bild verkligen är uppdaterade.

### 4) “Inspector rätt” betyder inte alltid “Inlägg rätt”
En annan lärdom: även om Post Inspector visar rätt, kan LinkedIn-kompositorn fortfarande visa gammal preview. Lösningen var att tvinga LinkedIn att hämta om förhandsvisningen genom att lägga till en liten extra parameter i länken när jag postade, t.ex.:

`https://www.solopreneur.se/?v=2`

Det tvingar LinkedIn att skapa en ny preview för den exakta URL:en.

## Varför jag skriver detta
För att:

1. Momskalkylatorn är ett konkret steg i att bygga Solopreneur som en plats med riktiga verktyg.
2. Jag vill vara transparent med vad som tar tid i praktiken.
3. Jag tror fler än jag har svurit över OG/preview i sociala medier.

Om du bygger egna verktyg eller publicerar mycket innehåll: lägg 5 minuter på att titta på Post Inspector. Det sparar timmar.

## Uppföljning: hur gick det efter publicering?
Jag kommer uppdatera detta inlägg med data efter publiceringen.

### Efter 24 timmar
- Visningar på verktygssidan: X
- Klick från LinkedIn: X
- Interaktioner på inlägget (reaktioner/kommentarer): X
- Nya prenumeranter (om relevant): X

### Efter 7 dagar
- Visningar på verktygssidan: X
- Klick från LinkedIn: X
- Interaktioner totalt: X
- Lärdomar/justeringar jag gjort: X

## Testa Momskalkylatorn
Du hittar den här: [Momskalkylatorn](https://www.solopreneur.se/verktyg/#moms-kalkylator)

Har du önskemål om fler kalkylatorer? Skriv gärna en rad på Discord communityt:
