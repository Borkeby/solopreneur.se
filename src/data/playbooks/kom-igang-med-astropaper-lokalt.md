---
title: "Kom igång med AstroPaper lokalt (nybörjarguide) – så gjorde jag med Solopreneur"
author: "Daniel Borkeby"
pubDatetime: 2026-01-09T09:00:00Z
modDatetime: 2026-01-09T09:00:00Z
slug: "kom-igang-med-astropaper-lokalt"
featured: false
draft: false
tags:
  - "Astro"
  - "AstroPaper"
  - "Kom igång"
  - "Solopreneur"
ogImage: ""
description: "En nybörjarguide på basnivå: ladda ner AstroPaper, starta det lokalt och öppna sidan i webbläsaren via localhost."
tid: "30–60 min"
nivå: "Bas"
kostnad: "Gratis"
kategori: "Guider"
ingress: "När jag drog igång Solopreneur ville jag kunna köra sajten lokalt direkt för att se hur det fungerade, utan att behöva kunna utvecklarverktyg. Här är exakt hur du gör: ladda ner AstroPaper, starta det i ett kommandofönster och öppna sidan i webbläsaren."
---

## Vad du ska göra (superenkelt)

Du ska göra tre saker:

1. Installera Node.js
2. Ladda ner AstroPaper som en vanlig mapp på din dator
3. Öppna ett kommandofönster, skriva två kommandon och sedan öppna webbläsaren

Du behöver inte Visual Studio Code. Du kan öppna filer i Anteckningar (Notepad) om du vill ändra text.

## Kort ordlista (vad sakerna betyder)

- **Astro:** Ett verktyg/ramverk för att bygga webbplatser. Astro skapar sidor som blir snabba att ladda och passar bra för bloggar och innehåll.
- **AstroPaper:** En färdig webbplats-mall byggd med Astro. Den innehåller struktur, design och exempel-innehåll så att du snabbt kan komma igång.
- **Node.js:** Ett program som gör att din dator kan köra JavaScript-verktyg lokalt. AstroPaper behöver Node.js för att kunna installeras och startas.
- **PowerShell:** Ett kommandofönster i Windows där du kan skriva kommandon, till exempel för att gå till rätt mapp och starta sajten.
- **ZIP:** En ”paketerad” fil (komprimerad) som innehåller en hel mapp med filer. När du laddar ner som ZIP behöver du packa upp den för att få en vanlig mapp.
- **Git:** Ett verktyg för versionshantering (”spara historik” och spåra ändringar i filer). Det används ofta av utvecklare.
- **Repo (repository):** Själva projektet – en mapp med alla filer som hör ihop. På GitHub kallas ett projekt ofta för ett ”repo”.
- **GitHub:** En webbplats där projekt (repo) kan ligga online. AstroPaper ligger på GitHub.
- **Markdown (MD):** Ett enkelt textformat där du skriver med lättlästa tecken (t.ex. # för rubriker) och som sedan automatiskt omvandlas till formaterad text på webben.

I den här guiden använder vi inte Git aktivt – vi laddar ner AstroPaper som ZIP för att göra det så enkelt som möjligt.

## Steg 1: Installera Node.js

AstroPaper behöver Node.js för att kunna starta lokalt.

1. Öppna webbläsaren
2. Gå till Node.js: https://nodejs.org
3. Ladda ner **LTS** och installera (nästa, nästa, nästa fungerar bra)

Efter installationen är du redo.

## Steg 2: Ladda ner AstroPaper (utan Git)

Det här är enklaste sättet om du är ny.

1. Öppna webbläsaren
2. Gå till AstroPaper på GitHub: https://github.com/satnaing/astro-paper
3. Klicka på **Code**
4. Välj **Download ZIP**
5. Packa upp zip-filen till en plats du hittar lätt

Exempel på en enkel plats:

```text
C:\solopreneur\astro-paper
```

Viktigt: "solopreneur" i exemplet är bara ett mappnamn jag valde på min dator. Tänk på det som ”din projektmapp”. Du kan lika gärna använda t.ex.:

```text
C:\mina-sajter\astro-paper
D:\projekt\astro-paper
```

Välj en sökväg du själv tycker är enkel att hitta.

När du är klar ska du ha en mapp som innehåller filer som heter till exempel `package.json` och en mapp som heter `src`.

## Steg 3: Öppna PowerShell

Du ska nu öppna ett fönster där man kan skriva kommandon.

1. Klicka på Start-menyn
2. Skriv: PowerShell
3. Öppna Windows PowerShell

Ett blått eller svart fönster öppnas.

## Steg 4: Gå till rätt mapp (viktigast)

Först måste du stå i rätt katalog (mapp) innan du startar sidan.

Skriv detta i PowerShell och tryck Enter:

```text
cd C:\solopreneur\astro-paper
```

Viktigt: Byt ut sökvägen ovan mot din egen. Om du valde en annan mapp i Steg 2, ska `cd`-kommandot peka på den mappen.

Kontrollera att du står rätt genom att skriva:

```text
dir
```

Du ska nu se en lista med filer. Leta efter:

```text
package.json
src
public
```

Om du inte ser dem så står du i fel mapp.

### Om du står i fel mapp

Gå upp en nivå:

```text
cd ..
```

Gå in i en mapp (exempel):

```text
cd astro-paper
```

Kör sedan `dir` igen tills du ser `package.json`.

## Steg 5: Första gången: förbered projektet

Det här gör du bara första gången i en ny AstroPaper-mapp.

Skriv:

```text
npm install
```

Det kan ta en stund. När den är klar får du tillbaka en ny rad där du kan skriva igen.

## Steg 6: Starta sidan lokalt

Skriv:

```text
npm run dev
```

Efter några sekunder kommer PowerShell skriva ut en adress som börjar med `http://localhost`.

Vanligt är:

```text
http://localhost:4321
```

## Steg 7: Öppna sidan i webbläsaren

1. Öppna Chrome (eller valfri webbläsare)
2. Skriv exakt adressen som stod i PowerShell

Exempel:

```text
http://localhost:4321
```

Nu ska du se AstroPaper-sidan lokalt på din dator.

## Steg 8: Stoppa sidan

Gå tillbaka till PowerShell-fönstret och tryck:

```text
Ctrl + C
```

## Så ser en enkel filstruktur ut (vad som är vad)

När du tittar i mappen (i Utforskaren) ser du ungefär detta:

```text
astro-paper/
  public/
  src/
    pages/
    data/
      blog/
  package.json
  astro.config.mjs
```

Det du behöver veta som nybörjare:

```text
src/data/blog/  → innehåller inlägg i Markdown
public/         → innehåller bilder och andra statiska filer
```

## Gör en enkel ändring (utan utvecklarverktyg)

Låt sidan fortsätta vara igång (`npm run dev` ska fortfarande rulla i PowerShell).

1. Öppna Utforskaren och gå till `src/data/blog/`
2. Högerklicka på en `.md`-fil
3. Välj **Öppna med**
4. Välj **Anteckningar (Notepad)**
5. Ändra en rad text och spara
6. Gå till webbläsaren och uppdatera sidan

Om du ser ändringen är allt korrekt uppsatt.

## Så gjorde jag när jag startade Solopreneur

Jag började exakt så här: först få upp defaultsidan lokalt, sedan göra en liten textändring för att bevisa att allt fungerade. Efter det började jag byta ut innehåll, lägga in egna guider och bygga vidare steg för steg.
