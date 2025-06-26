<div align="center">
    <img src="https://github.com/Daavje/RoosterSync/blob/main/images/HWC-Agenda-Logo128.png?raw=true"/>
    <h1>RoosterSync</h1>
    <h3>Altijd je rooster bij de hand - automatisch gesynchroniseerd vanuit Outlook</h3>
</div>

RoosterSync toont je rooster direct in je browser, zonder gedoe. De extensie haalt je planning automatisch uit je Outlook-agenda, zodat je altijd een actueel overzicht hebt van je lessen of afspraken.

### Functies:

- Direct je rooster bekijken in Chrome

- Automatische synchronisatie met je Outlook-agenda

- Duidelijke dagweergave

- Lichtgewicht en gebruiksvriendelijk

Of je nu student bent of werkt met een vast rooster - RoosterSync zorgt dat jij altijd weet waar je moet zijn.

## Web Store
Microsoft Edge:    Nog niet Beschikbaar.

Google Chrome:     Niet beschikbaar!
## Installatie
### Download de extensie:
Ga naar de website waar de Chrome-extensie beschikbaar is en zoek naar de downloadoptie. Meestal wordt dit aangeboden als een gecomprimeerd bestand (ZIP).

### Pak het ZIP-bestand uit:
Nadat je het ZIP-bestand hebt gedownload, pak je het uit naar een map op je computer. Je kunt hiervoor gebruikmaken van de ingebouwde functie van je besturingssysteem of een programma zoals WinRAR of 7-Zip.

### Open het Chrome-extensiebeheer:
Typ `chrome://extensions/` in de adresbalk van Chrome en druk op Enter.
Of klik op de drie puntjes in de rechterbovenhoek van je Chrome-venster, ga naar 'Meer hulpprogramma's' en kies 'Extensies'.
Activeer de ontwikkelaarsmodus:
Zorg ervoor dat de ontwikkelaarsmodus is ingeschakeld. Dit kun je vinden als een schakelaar ergens bovenaan de extensiebeheerpagina.

### Laad de extensie:
Klik op de knop 'Pak een ingepakt bestand uit' of 'Load unpacked', afhankelijk van je Chrome-versie.

### Selecteer de map van de uitgepakte extensie:
Navigeer naar de map waarin je de extensie hebt uitgepakt en selecteer deze. Klik op 'OK' of 'Open' om de extensie te laden.

### Controleer of de extensie is toegevoegd:
Na het laden zou de extensie in de lijst met geïnstalleerde extensies moeten verschijnen. Je ziet mogelijk ook het pictogram van de extensie naast de adresbalk van je browser.

### Configureer indien nodig:
Sommige extensies vereisen configuratie. Als dat het geval is, ga naar de extensie-instellingen en pas deze naar wens aan.

### Test de extensie:
Open een nieuw tabblad en probeer de functionaliteit van de extensie uit om te controleren of deze naar behoren werkt.

## ICS-link instellen

RoosterSync gebruikt een zogenaamde **ICS-link** om je rooster op te halen vanuit je Outlook-agenda. Deze link verwijst naar een .ics-bestand dat automatisch je afspraken bijhoudt. Je hoeft dit slechts één keer in te stellen.

### Stap 1: ICS-link ophalen uit Outlook

1. Ga naar [Outlook op het web](https://outlook.office.com/).
2. Klik rechtsboven op het tandwiel en kies **Alle Outlook-instellingen weergeven**.
3. Navigeer naar **Agenda > Gedeelde agenda's**.
4. Onder het kopje **Publiceren**, selecteer de agenda die je wilt gebruiken.
5. Kies voor **Alle details tonen** en klik op **Publiceren**.
6. Kopieer de ICS-link die verschijnt (deze eindigt op `.ics`).

> Gebruik **de ICS-link**, niet de HTML-link.

### Stap 2: Zet de ICS-link in het juiste bestand

1. Open het bestand `ics_url.txt` in de map van de extensie.
2. Plak daar de ICS-link die je net hebt gekopieerd, op één regel.
   
   Bijvoorbeeld: `https://outlook.office365.com/owa/calendar/jouwrooster.ics`

3. Sla het bestand op.

### Stap 3: Herlaad de extensie in Chrome

1. Open een nieuw tabblad en ga naar:  
`chrome://extensions/`

2. Zet rechtsboven **Ontwikkelaarsmodus** aan.

3. Klik op **Herlaad** (bij de extensie), of verwijder en laad hem opnieuw via **"Load unpacked"**.

4. RoosterSync zal nu automatisch je rooster ophalen via de ICS-link.

Je hoeft dit maar één keer te doen. De extensie onthoudt de link zolang het `ics_url.txt`-bestand in de map blijft staan.  
Heb je een nieuw rooster of een andere agenda? Vervang dan simpelweg de link in het bestand.