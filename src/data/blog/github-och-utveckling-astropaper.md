---
title: "GitHub och källkodsredigerare – så fick jag upp min lokala AstroPaper till molnet"
author: "Daniel Borkeby"
pubDatetime: 2026-01-20T22:20:00Z
modDatetime: 2026-01-20T22:20:00Z
slug: "github-och-utveckling-astropaper"
featured: false
draft: false
tags: ["GitHub", "Git", "Astro", "AstroPaper", "Visual Studio", "VS Code", "Codespaces", "Versionshantering", "SSH", "Token", "AI"]
ogImage: ""
description: "Nästa steg var att få min lokala AstroPaper till molnet och GitHub, samt välja och börja använda en källkodsredigerare i stället för Notepad."
tid: "5-10 min"
nivå: "Bas"
kategori: "Blogg"
ingress: "Det svåraste med GitHub var inte Git. Det var lösenordet. Här är min enkla väg från lokal AstroPaper till ett repo jag kan jobba från framåt."
---

Efter att mitt AstroPaper rullade lokalt var det dags att ta nästa steg: få upp allt på GitHub.

Jag trodde det skulle vara “lite Git-kommandon”.  
Det visade sig vara en helt annan sak jag fastnade på.

## Jag fastnade på ett lösenord som inte var ett lösenord

När Git pushar via HTTPS frågar den efter:

- Username
- Password

Jag gjorde det man gör av ren reflex: skrev in mitt GitHub-lösenord.

Det fungerade inte.

Och det är här många (inklusive jag) fastnar: GitHub menar inte ditt kontolösenord när den frågar efter “Password”.

## Vad GitHub faktiskt menar med “Password”

GitHub accepterar normalt inte kontolösenord för Git-åtgärder via HTTPS.  
I praktiken har du två vanliga alternativ:

- Personal Access Token (PAT) som du använder som “lösenord”
- SSH-nyckel (en mer “en gång och klart”-lösning, men lite fler steg första gången)

När man inte vet det, känns det som att man gör allt rätt och ändå blir stoppad.  

## Vad jag egentligen ville uppnå

Jag ville inte “jobba med Git”.

Jag ville:

- göra kopplingen en gång
- gå från lokalt till GitHub och molnet
- och sen jobba normalt från repo:t

Och som bonus får jag:

- backup
- historik
- kontroll på versioner
- möjlighet att jobba från flera datorer

## När allt föll på plats

Jag valde token-spåret (PAT) för att få det gjort snabbt.

Två små saker var extra förvirrande första gången:

- Token ska klistras in som “Password”
- I många terminaler syns det inte att du klistrar in något (det ska tydligen vara så)

## Källkodsredigerare: Visual Studio eller VS Code?

När repo:t väl är kopplat spelar editor mindre roll. Arbetsflödet är samma.

Min syn:

- Visual Studio: tryggt om du gillar GUI och redan kan verktyget.
- VS Code: ofta smidigare i Astro/Node-projekt, och du kan köra i molnet via Codespaces.

Jag använder båda beroende på läge.

## Vill du göra exakt samma resa?

> Jag har lagt allt “hur du gör”-innehåll som en guide. Den innehåller steg-för-steg: repo, första pushen, token eller SSH, och hur du slipper lösenordsstrul:  
> **[Från lokal AstroPaper till GitHub utan lösenordsstrul](/playbooks/astro-paper-lokalt-till-github/)**

## Nästa inlägg

Nästa steg handlar om hur jag jobbar i editorn när jag bygger vidare i AstroPaper, och hur jag använder AI för att få det resultat jag vill.
