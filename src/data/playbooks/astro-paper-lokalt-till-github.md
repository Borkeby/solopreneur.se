---
title: "Från lokal AstroPaper till GitHub – utan lösenordsstrul"
author: "Daniel Borkeby"
pubDatetime: 2026-01-15T21:30:00Z
modDatetime: 2026-01-15T21:30:00Z
slug: "astro-paper-lokalt-till-github"
featured: false
draft: true
tags: ["Git", "GitHub", "Astro", "AstroPaper", "Visual Studio", "VS Code", "Codespaces", "Versionshantering"]
ogImage: ""
description: "Så får du upp din lokala AstroPaper-installation på GitHub: privat repo, första pushen, och hur du slipper lösenordsproblem med token eller SSH."

tid: "10-15 min"
nivå: "Bas"
kategori: "Guide"
ingress: "När AstroPaper fungerar lokalt är nästa steg att få upp projektet på GitHub. Du gör kopplingen en gång – sedan jobbar du alltid från repo:t och slipper kaos med filer och versioner."
---

När du fått AstroPaper att fungera lokalt kommer nästa naturliga steg: lägg upp projektet på GitHub.

Målet är enkelt:

- Du gör grundkopplingen en gång.
- Sen jobbar du alltid från repo:t: ändra lokalt → commit → push.
- Du får backup, historik och en tydlig plats där allt bor.

Den största stötestenen brukar vara “lösenord”. Det beror på att GitHub inte längre accepterar ditt vanliga kontolösenord när du pushar via HTTPS. Du behöver antingen:

- Personal Access Token (token) via HTTPS (vanligast och enklast första gången)
- SSH-nyckel (stabilt och “en gång och klart”, men lite fler steg första gången)

Jag rekommenderar att du börjar med token. Det brukar vara minst friktion.

## 1) Skapa repo på GitHub (rekommenderat: privat)

Jag rekommenderar privat repo för den här typen av projekt, särskilt om du inte vill visa koden offentligt.

1. Logga in på GitHub
2. Skapa ett nytt repository
3. Välj:
   - Name: t.ex. `solopreneur.se`
   - Visibility: Private
   - Skapa repo utan extra “auto README” om du redan har ett lokalt projekt (valfritt, men förenklar)

Nu har du ett tomt repo som vi kopplar din lokala folder till.

## 2) Välj verktyg: Visual Studio eller VS Code

Du kan göra allt via terminalen oavsett editor, men här är min syn:

### Visual Studio
- Fördel: bra Git-stöd via GUI, credential-hantering brukar “bara fungera”.
- Nackdel: för Node/Astro kan det ibland kännas mer omständligt än nödvändigt.

Jag föredrar Visual Studio, men det är sannolikt mycket vana.

### Visual Studio Code
- Fördel: perfekt för webprojekt, snabbt, tydlig filstruktur.
- Stor bonus: kan köras i molnet via GitHub Codespaces.
- Nackdel: om du är ovan vid Git kan du behöva titta lite mer på vad som händer.

Oavsett val: repo och arbetsflöde blir samma.

## 3) Rekommenderad väg: HTTPS + token (slipper “password”-strul)

Det här är den vanligaste vägen när man fastnar på lösenord.

### Steg A: Skapa en Personal Access Token (PAT)

I GitHub:

1. Gå till Settings
2. Developer settings
3. Personal access tokens
4. Skapa en token

Om du kör “classic token”, brukar detta räcka:
- `repo` (för privata repo:n)

Kopiera token och spara den säkert. Du ser den normalt bara en gång.

### Steg B: Koppla ditt lokala projekt till repo:t och pusha

Öppna terminal i projektets rot (där `package.json` ligger) och kör:

~~~bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<ditt-konto>/<ditt-repo>.git
git push -u origin main
~~~

När du pushar kommer Git fråga efter inloggning:

- Username: ditt GitHub-användarnamn
- Password: klistra in din token (inte ditt vanliga lösenord)

Viktigt: i många terminaler syns inte texten när du klistrar in token. Det är normalt.

### Steg C: Slipp skriva token igen

På Windows sparas detta vanligtvis via Git Credential Manager. Om du ändå får frågan varje gång:

- Se till att du har uppdaterat Git for Windows (den brukar installera credential-hanteringen)
- Efter en lyckad inloggning ska den spara uppgifterna

När detta sitter är arbetsflödet i praktiken: `git push` utan extra steg.

## 4) Alternativ: SSH-nyckel (om du vill slippa tokens)

SSH är ofta “snyggast” när allt är igång. Men det är några extra steg första gången.

### Skapa nyckel

~~~bash
ssh-keygen -t ed25519 -C "din-email@domän.se"
~~~

Kopiera public key:

~~~bash
cat ~/.ssh/id_ed25519.pub
~~~

Lägg in den i GitHub:
- Settings → SSH and GPG keys → New SSH key

Byt remote till SSH:

~~~bash
git remote set-url origin git@github.com:<ditt-konto>/<ditt-repo>.git
git push -u origin main
~~~

Klart.

## 5) Om du vill slippa terminal: publicera via Visual Studio

Visual Studio kan göra mycket via GUI:

1. Öppna din projektfolder
2. Initiera Git-repo (om det inte redan finns)
3. Publicera/pusha till GitHub när du är inloggad

Om du hamnar i “password”-problemet här också är det fortfarande token som gäller (GitHub-lösenord fungerar inte för push via HTTPS).

## 6) VS Code + moln: GitHub Codespaces

En stor fördel med VS Code är att du kan köra utveckling i molnet:

- Öppna repo:t på GitHub
- Klicka Code → Codespaces → Create codespace

Där får du en webbaserad VS Code med terminal. Du kan göra ändringar, committa och pusha utan att ens ha Node installerat lokalt.

Det här är extra bra om du:
- vill kunna jobba från flera datorer
- vill slippa installationsstrul på en ny maskin

## 7) Snabbfixar: ändra direkt i GitHub

Om din sida inte uppdateras så ofta och du bara ska ändra en text:

- Öppna filen i GitHub
- Klicka Edit
- Spara (commit)

För små ändringar är det effektivt. Nackdelen är att du inte får samma lokala “kör och testa”-flöde.

## 8) Rekommenderat arbetssätt efter första gången

När repo:t är kopplat och första pushen är gjord:

1) Börja alltid med att hämta senaste:

~~~bash
git pull
~~~

2) Gör dina ändringar

3) Spara versionen:

~~~bash
git add .
git commit -m "Uppdaterar guide om GitHub"
~~~

4) Skicka upp till GitHub:

~~~bash
git push
~~~

Det är det. Inget mer.

## 9) Varför det är värt att göra detta

Att jobba mot ett repo i en riktig editor (Visual Studio / VS Code) är en stor uppgradering jämfört med att “ändra filer lite här och där”:

- Du har historik på allt.
- Du kan backa om något går sönder.
- Du slipper tappa bort vad som är senaste versionen.
- Du kan jobba strukturerat och bygga vidare utan att vara rädd att sabba något.

Det tar lite tid första gången. Sen sparar det dig garanterat tid varje vecka.