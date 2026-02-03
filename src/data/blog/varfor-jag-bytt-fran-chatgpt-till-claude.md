---
title: "Varför jag bytte från ChatGPT till Claude – och varför det förändrade allt"
author: "Daniel Borkeby"
pubDatetime: 2026-02-03T09:00:00Z
modDatetime: 2026-02-03T09:00:00Z
slug: "varfor-jag-bytt-fran-chatgpt-till-claude"
featured: false
draft: false
tags: ["AI", "Kod", "Produktivitet", "Verktyg", "Soloföretag", "Solopreneur", "Claude", "ChatGPT"]
ogImage: ""
description: "Jag trodde länge att det inte var någon ide att byta AI-chatt. Sedan testade jag Claude Code: ett arbetsflöde där AI:n läser hela repot och gör koordinerade ändringar."
tid: "8-12 min"
nivå: "Bas"
kategori: "Blogg"
ingress: "Jag trodde att valet av AI-chatt inte spelade någon roll. Sedan testade jag Claude Code och insåg att skillnaden sitter i arbetsflödet: från copy paste till full koll på repot."
---

Jag har arbetat med AI sedan hypen började för ett par år sedan med OpenAIs ChatGPT som alla andra. Länge trodde jag att det inte spelade någon roll vilken AI-chatt man använde. ChatGPT, Claude, Gemini – alla tävlade om topplaceringarna på benchmarks, och varannan vecka var det en ny modell som påstods vara bäst. Varför byta när nästa vecka ändå utser en ny vinnare?

Så jag stannade kvar hos ChatGPT. Uppgraderade till deras dyraste abonnemang – ChatGPT Pro för 200 USD per månad – och tänkte att jag hade det bästa som gick att få. Copy/Paste från chatten in i min kodbas fungerade. Det var omständligt, men det fungerade.

Sen provade jag Claude Code. Och insåg att att det var dags att ändra uppfattning.

## Copy/Paste vs. att AI:n läser hela ditt repo

Problemet med att använda ChatGPT (eller vilken chatt som helst) för kodning är grundläggande: du kopierar och klistrar in kodstycken fram och tillbaka. Du ger chatten ett utdrag, får tillbaka en lösning, kopierar in den i din editor, testar, hittar ett fel, kopierar felet tillbaka till chatten, och så fortsätter det.

Det fungerar, men det är ungefär lika effektivt som att skicka fax jämfört med mail.

Claude Code ändrar hela den dynamiken. Det är ett terminalverktyg som läser ditt lokala repository direkt – hela kodbasen, filstrukturen, konfigurationsfilerna, allt.

När jag ber Claude Code om hjälp förstår den kontexten på ett sätt som ingen chatt-session kan matcha. Den vet vilka beroenden projektet använder, hur komponenterna hänger ihop, och kan göra koordinerade ändringar över flera filer samtidigt.

Det går helt enkelt inte att jämföra. Det är verkligen som natt och dag.

## Vibe coding blev plötsligt verklighet

Du har säkert hört begreppet "vibe coding" – att beskriva vad du vill ha i naturligt språk och låta AI:n skapa koden åt dig.

Med ChatGPT i ett chattfönster var det alltid lite av en kamp. Man fick en kodsnutt tillbaka som kanske fungerade isolerat men inte passade in i det befintliga projektet. Man blev mer av en mellanhand mellan AI:n och kodbasen.

Med Claude Code som har tillgång till hela repot blir det plötsligt mycket enklare. Jag kan säga:

"Lägg till en ny API-endpoint för användarregistrering som följer samma mönster som de befintliga endpoints."

Claude Code förstår faktiskt vilka mönster jag menar, eftersom den har läst hela kodbasen. Den kan skapa filer, uppdatera routes, lägga till relevanta typer och tester – i ett svep. Den bygger dessutom åt dig och fixar om det skulle uppstå byggfel innan den anser sig vara klar.

Utvecklare runt om i världen beskriver samma sak: Claude producerar oftare mer produktionsnära kod direkt från start, med färre missar och bättre kontextförståelse i större projekt. En utvecklare uttryckte det så här: efter ungefär 3 000 rader kod tappar ChatGPT tråden, medan Claude håller ihop helheten.

## Halva priset dessutom

Här kommer den riktigt intressanta biten.

ChatGPT Pro kostar 200 USD/månad. Jag kör nu Claude Max för 100 USD/månad. Det är hälften av priset.

Och för den summan får jag inte bara chatten utan även Claude Code inkluderat i samma abonnemang. Högre användningslimiter än grundplanen, tillgång till de senaste modellerna och funktionerna, och ett verktyg som faktiskt integrerar med mitt arbetsflöde istället för att vara ett separat fönster där jag kopierar text mellan.

Som solopreneur, där varje krona räknas, är det en enkel kalkyl. Tidsvinsten är dessutom enorm.

## Där ChatGPT fortfarande har ett försprång

Jag ska dock tillägga.

ChatGPT gör flera riktigt bra saker som Claude inte matchar ännu, och det är Pulse. Pulse är ChatGPTs funktion som gör research åt dig och levererar en personlig sammanställning.

Den analyserar din chatthistorik, ditt minne och dina kopplade appar (till exempel kalender och e-post) och ger visuella kort med uppdateringar som är relevanta för just dig.

Som beslutsfattare och solopreneur är det genuint användbart. En kurerad briefing med branschnyheter, projektinsikter och påminnelser om saker jag behöver agera på sparar tid och hjälper mig hålla koll.

Det är en funktion jag saknar hos Claude. För att nämna en annan är Canvas i ChatGPT bättre än Claud Artifacts enligt min mening.

## Problemen som fick mig att lämna

Men Pulse och Canvas räcker inte för att uppväga de problem som har byggts upp.

Det som till slut fick mig att byta var en kombination av saker.

ChatGPT har blivit märkbart slöare för mig. Svar som tidigare kom snabbt tar plötsligt mycket längre tid att generera. Ofta hänger sig gränssnittet helt, speciellt vid längre chattar.

Dessutom upplevde jag att de ofta verkar ändra hur modellen svarar. Plötsligt blev svaren annorlunda i tonen, ibland överdrivet inställsamma, ibland kortare utan förvarning.

Den sortens inkonsekvens är störande när man försöker bygga upp ett arbetsflöde man kan lita på. Man vill ha ett pålitligt verktyg, inte en modell som beter sig som en ny person varje vecka.

## Lärdomen: det handlar inte om benchmarks

Min största insikt är att debatten om vilken AI-modell som är "bäst" ofta missar poängen.

Så länge jag bara jämförde chattar med chattar – ChatGPT mot Claude mot Gemini i ett webbfönster – var skillnaderna marginella. Alla kunde generera hyfsad kod. Alla kunde skriva okej.

Den verkliga skillnaden uppstår i arbetsflödet.

Claude Code som kan läsa mitt lokala repo och göra ändringar direkt i min kodbas är inte bara en bättre chatt. Det är en helt annan kategori av verktyg.

## Vem borde byta?

Om du mest använder AI för att ställa frågor, skriva texter eller brainstorma idéer finns det ärligt talat ingen större anledning att byta. Alla stora modeller gör det bra.

Men om du kodar – och särskilt om du jobbar mycket i större projekt – är Claude Code en gamechanger.

Kombinationen av att modellen har full insyn i din kodbas, producerar mer genomtänkt kod och kostar mindre gör att det inte finns så mycket att fundera på.

Jag betalade 200 USD i månaden för att kopiera och klistra in kod mellan ett chattfönster och min editor.

Nu betalar jag 100 USD i månaden för en AI som läser hela mitt projekt och gör ändringarna åt mig.

## Vem är jag?

Jag heter Daniel Borkeby, driver [Solopreneur.se](https://solopreneur.se), [Paidin Finans](https://paidin.se) och [Paidin Redovisning](https://paidin.se/redovisning) samt bygger digitala projekt med AI som hjälp i vardagen. Följ med på resan.

<div class="so-card so-card-emphasis" style="margin-top: 2rem; padding: 1.25rem;">
  <div style="font-weight: 600; font-size: 1.125rem; line-height: 1.4;">
    Prenumerera på nyhetsbrevet
  </div>
  <p style="margin-top: .5rem;">
    Användbara tips, mina lärdomar och nya resurser på Solopreneur.se - Direkt i din inkorg.
  </p>
  <div style="margin-top: 1rem;">
    <a class="so-btn-primary" href="/nyhetsbrev/" data-pi-event="newsletter_signup">
      Prenumerera
    </a>
  </div>
</div>