---
title: "Från lokal AstroPaper till GitHub utan lösenordsstrul"
author: "Daniel Borkeby"
pubDatetime: 2026-01-19T22:20:00Z
modDatetime: 2026-01-19T22:20:00Z
slug: "astro-paper-lokalt-till-github"
featured: false
draft: false
tags: ["Git", "GitHub", "Astro", "AstroPaper", "Visual Studio", "VS Code", "Codespaces", "Versionshantering", "SSH", "Token", "AI"]
ogImage: ""
description: "Så får du upp din lokala AstroPaper-installation på GitHub: privat repo, första pushen, och hur du slipper lösenordsproblem med token eller SSH."
tid: "10-15 min"
nivå: "Bas"
kostnad: "Gratis"
kategori: "Guider"
ingress: "När AstroPaper fungerar lokalt är nästa steg att få upp projektet på GitHub. Du gör kopplingen en gång – sedan jobbar du alltid från repo:t och slipper kaos med filer och versioner."
---

När du fått AstroPaper att fungera lokalt kommer nästa naturliga steg: lägg upp projektet på GitHub.

Målet är enkelt:

- Du gör grundkopplingen en gång.
- Sen jobbar du alltid från repo:t: ändra lokalt → commit → push.
- Du får backup, historik och en tydlig plats där allt bor.

Den vanligaste stötestenen är “lösenord”. GitHub accepterar normalt inte ditt vanliga kontolösenord när du pushar via HTTPS. Du behöver antingen:

- Personal Access Token (token) via HTTPS (ofta minst friktion)
- SSH-nyckel (stabilt och “en gång och klart”, men lite fler steg)

Jag rekommenderar att du börjar med token.

## Förberedelser (1 minut)

Du behöver:

- Ett GitHub-konto
- Ett lokalt AstroPaper-projekt (du står i projektets rot, där `package.json` ligger)
- Git installerat på datorn

Öppna en terminal i projektmappen (PowerShell på Windows funkar bra).

## 1) Skapa ett repo på GitHub (rekommenderat: privat)

1. Logga in på GitHub
2. Skapa ett nytt repository
3. Välj:
   - Name: t.ex. `solopreneur.se`
   - Visibility: Private
   - Skapa repo utan extra “auto README” om du redan har projektet lokalt (valfritt, men förenklar)

Nu har du ett tomt repo.

## 2) Initiera Git i ditt lokala projekt

Stå i projektets rot (där `package.json` ligger) och kör:

~~~bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
~~~

## 3) Koppla repo:t som “remote” och pusha

Byt ut `<ditt-konto>` och `<ditt-repo>`:

~~~bash
git remote add origin https://github.com/<ditt-konto>/<ditt-repo>.git
git push -u origin main
~~~

Nu kommer Git fråga efter inloggning. Här fastnar många – men lösningen är enkel.

## 4) HTTPS + token (PAT): vanligast och enklast första gången

### A) Skapa en Personal Access Token

I GitHub (översiktligt):

- Settings → Developer settings → Personal access tokens (svår att hitta, men den finns där)
- Skapa en token

Om du använder en “classic token” brukar rättigheten `repo` räcka för privata repo:n.

Kopiera token och spara den säkert. Du ser den normalt bara en gång.

### B) Använd token som “Password”

När Git frågar:

- Username: ditt GitHub-användarnamn
- Password: klistra in token (inte ditt vanliga lösenord)

Viktigt: i många terminaler syns inte det du klistrar in. Det är normalt.

### C) Slipp skriva token igen (vanligast på Windows)

Efter första lyckade pushen sparas detta ofta automatiskt via credential-hantering i Windows.

Om du ändå får frågan varje gång:

- Uppdatera Git for Windows (credential-hanteringen följer normalt med)
- Kontrollera att du inte kör något ovanligt terminal-läge som blockerar credential-store


## 5) Editor: Visual Studio eller VS Code

Du kan göra allt i terminalen oavsett editor.

Min praktiska syn:

- Visual Studio: bra om du vill köra Git via GUI och redan är hemma där.
- VS Code: ofta smidigare i Astro/Node-projekt och har bra flöde för filredigering.

### Bonus: VS Code i molnet via Codespaces

Om du vill kunna jobba från flera datorer (utan att installera lokalt):

- Öppna repo:t på GitHub
- Klicka Code → Codespaces → Create codespace

Du får en webbaserad VS Code med terminal där du kan ändra, committa och pusha.

## 6) Snabbfixar: ändra direkt i GitHub (om det är små saker)

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

## Snabb felsökning (om du fastnar)

Om pushen inte går igenom, kontrollera detta:

- Står du i rätt mapp (där `package.json` ligger)?
- Är repo-url korrekt (`<ditt-konto>/<ditt-repo>`)?
- Kör du HTTPS: använd token som “Password” (inte kontolösenord)
- Kör du SSH: ligger public key i GitHub och pekar remote på `git@github.com:...`?
- Testa att köra `git remote -v` och se att origin är som du tror

När detta sitter är GitHub-delen i praktiken “en gång och klart”.