---
title: "GitHub och lösenordsfällan – så fick jag upp min lokala AstroPaper på rätt sätt"
author: "Daniel Borkeby"
pubDatetime: 2026-01-15T22:20:00Z
modDatetime: 2026-01-15T22:20:00Z
slug: "github-och-losenordsfallan-astropaper"
featured: false
draft: true
tags: ["GitHub", "Git", "Astro", "AstroPaper", "Visual Studio", "VS Code", "Codespaces", "Versionshantering", "SSH", "Token"]
ogImage: ""
description: "Jag trodde att det svåra var att få AstroPaper att fungera lokalt. Det visade sig att nästa steg – GitHub – var där jag fastnade. Här är vad som egentligen händer med lösenord, och hur du gör kopplingen en gång och sen jobbar från repo:t."

tid: "5-10 min"
nivå: "Bas"
kategori: "Blogg"
ingress: "Det svåraste med GitHub var inte Git. Det var lösenordet. Här är min enkla väg från lokal AstroPaper till ett repo jag kan jobba från framåt – utan att fastna i samma fälla."
---

Jag trodde att “nu är det klart” när AstroPaper rullade lokalt.

Men nästa steg (GitHub) var där jag fastnade.

Inte på kommandon.
Inte på filer.
Utan på en enda sak: lösenord.

## Varför lösenordet inte fungerar (och varför det känns så dumt)

Det som händer är egentligen rätt enkelt:

GitHub accepterar inte längre ditt vanliga kontolösenord när du pushar via HTTPS.

Så när Git frågar efter:

- Username
- Password

…så är “Password” inte ditt vanliga lösenord.

Det är antingen:

- en Personal Access Token (token), eller
- en SSH-nyckel

När man inte vet det känns det som att man gör allt rätt men ändå blir stoppad. Och det är exakt där många fastnar första gången.

## Vad jag vill uppnå med GitHub

Jag vill inte “jobba med Git”.

Jag vill:

- göra kopplingen en gång
- och sen jobba normalt från repo:t

Alltså: ändra lokalt → commit → push → klart.

Samtidigt får jag:

- backup
- historik
- kontroll på versioner
- möjlighet att jobba från flera datorer

## Steg 1: Skapa ett privat repo på GitHub

Jag rekommenderar att börja med ett privat repo (och gärna ett separat konto om du vill hålla saker avskilt).

1. Logga in på GitHub
2. Skapa ett nytt repository
3. Välj:
   - Name: t.ex. `solopreneur.se`
   - Visibility: Private
   - Skapa repo utan extra “auto README” om du redan har projektet lokalt (valfritt, men förenklar)

Nu har du ett tomt repo som du kopplar din lokala folder till.

## Steg 2: Välj hur du vill lösa inloggningen (token eller SSH)

Du har två bra alternativ. Skillnaden är främst vad du vill optimera för: snabb start eller “perfekt setup”.

### Alternativ A: Token via HTTPS (enklast första gången)

Det här är mitt “bara få det gjort”-val.

Du skapar en token på GitHub och använder den som lösenord vid första pushen.

I GitHub:
- Settings → Developer settings → Personal access tokens
- Skapa en token (för classic token räcker normalt rättigheten `repo` om du jobbar med privata repo:n)

Sen i projektets rot (där `package.json` ligger):

~~~bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<ditt-konto>/<ditt-repo>.git
git push -u origin main
~~~

När den frågar om password: klistra in din token.

Viktigt: i många terminaler syns inte det du klistrar in. Det är normalt.

Efter första lyckade pushen sparas detta ofta automatiskt via credential-hantering i Windows, och då slipper du skriva token igen.

### Alternativ B: SSH-nyckel (stabilt “en gång och klart”)

SSH är ofta det mest stabila på sikt.

Men första gången är det fler steg:
- skapa nyckel
- lägga in nyckeln i GitHub
- byta remote till SSH

Om du vill slippa tokens helt kan SSH vara rätt väg, men om målet är att komma i mål snabbt: börja med token.

Kort version:

~~~bash
ssh-keygen -t ed25519 -C "din-email@domän.se"
~~~

Kopiera public key och lägg in i GitHub:

~~~bash
cat ~/.ssh/id_ed25519.pub
~~~

Byt remote och pusha:

~~~bash
git remote set-url origin git@github.com:<ditt-konto>/<ditt-repo>.git
git push -u origin main
~~~

## Visual Studio vs VS Code (min praktiska syn)

Du kan göra allt via terminalen oavsett editor. Men så här ser jag på det.

### Visual Studio

Jag föredrar Visual Studio.

Mest för att jag är van, och för att Git-stödet ofta är “klicka och kör”.

Bra val om du:
- vill ha GUI för Git
- vill minimera terminal
- redan lever i Visual Studio till vardags

### Visual Studio Code

VS Code är ofta smidigare för Astro/Node-projekt.

Och den stora fördelen är att du kan köra i molnet via GitHub Codespaces.

Det betyder:
- öppna repo:t i webbläsaren
- få en VS Code-miljö med terminal
- göra ändringar, committa och pusha utan att installera allt lokalt

Bra val om du:
- vill kunna jobba från flera datorer
- vill slippa installationsstrul på en ny maskin
- gillar ett lättviktigt flöde

## Bonus: Små ändringar direkt i GitHub

Om din sida inte uppdateras så ofta kan du ibland vinna på enkelhet.

Du kan redigera filer direkt i GitHub:

- öppna filen
- klicka Edit
- spara (commit)

Bra för:
- små textändringar
- snabbfixar

Sämre för:
- större ändringar
- saker du vill testa lokalt innan

## Min enkla rutin efter första gången

När repo:t är kopplat och första pushen är gjord vill jag ha det så här enkelt:

1) Hämta senaste:

~~~bash
git pull
~~~

2) Gör ändringar

3) Spara versionen:

~~~bash
git add .
git commit -m "Uppdaterar innehåll"
~~~

4) Skicka upp:

~~~bash
git push
~~~

Det är den nivån jag vill ha: enkelt, stabilt, och utan lösenordsstrul.