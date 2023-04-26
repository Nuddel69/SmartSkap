</p><h1>Automatisert Skapsystem</h1>
<p>Dette prosjektet har som formål å automatisere et skap med et rutenett av 6x6 hull hvor bokser kan plasseres. Hver boks har en unik QR-kode på baksiden, som skannes av en arm på baksiden av skapet når en ny boks blir satt inn. Informasjon om boksens posisjon og innhold blir da lagret i en SQL-database. Et webgrensesnitt er tilgjengelig for å registrere bokser og legge inn bestillinger. Systemet er drevet av en Raspberry Pi, og motorene styres gjennom G-Code.</p>

<p><img src="./media/grensesnitt.png" alt="Webgrensesnitt"></p>

<h2>Til Herman og Sukhmani</h2>
Hvordan bruke venv
<br>
For å gå inn i venv
<ol>
	<li>Pass på at du er i Smartskap/ mappen</li>
	<li>Skriv `source Skap-venv/bin/activate`</li>
	<li>Se til at det står `(Skap-venv)` helt foran på hver linje</li>
</ol>
<br>
For å gå ut av venv
<ol>
	<li>Fra hvor som helst på systemet</li>
	<li>Skriv `deactivate`</li>
</ol>

<h2>Hvordan fungerer det</h2>
<p>For å bruke systemet kan du følge disse trinnene:</p>
<ol>
    <li>Registrere bokser ved å navigere til "Legg til boks"-fanen på webgrensesnittet og fylle ut informasjonen om boksen.</li>
    <li>Legge inn en bestilling ved å gå til "Legg til bestilling"-fanen og velge produktene du ønsker å bestille fra rullegardinmenyen. Trykk deretter på "Bestill" knappen.</li>
    <li>Systemet vil automatisk bevege armen rundt for å finne boksene som inneholder produktene i bestillingen. Når boksene er funnet, vil de bli skjøvet ut av skapet.</li>
    <li>Systemet vil, men gjevne mellomrom gå igjennom og oppdatere inventaret ved å skanne kodene på alle boksene</li>
</ol>

<h2>Teknologi</h2>
<p>Dette prosjektet er bygget med følgende teknologier:</p>
<table>
<thead>
    <tr><th>Teknologi</th><th>Beskrivelse</th></tr>
</thead>
    <tbody>
        <tr><td>Python</td><td>Hovedprogrammeringsspråket for alle bevegelige deler</td></tr>
        <tr><td>Flask</td><td>Web-rammeverk for kommunikasjon mellom webgrensesnittet og python</td></tr>
        <tr><td>HTML, CSS og JS</td><td>Språkene brukt for å skrive webgrensesnittet</td></tr>
        <tr><td>SQL</td><td>Database for å lagre informasjon om boksene</td></tr>
        <tr><td>Raspberry pi</td><td>microcomputer for å styre systemet</td></tr>
        <tr><td>G-Code</td><td>Språk for å kontrollere bevegelse av motorene</td></tr>
    </tbody>
</table>

<h2>Lisens</h2>
<p>Dette prosjektet er lisensiert under MIT-lisensen. Se LICENSE-filen for mer informasjon.</p></div>
