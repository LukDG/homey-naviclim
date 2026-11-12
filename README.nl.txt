Bedien je Atlantic- of Fujitsu General-airco vanuit Homey via Zigbee, zonder cloudaccount.

Deze app ondersteunt de Atlantic Naviclim Zigbee-interface (Zigbee-model "Adapter Zigbee FUJITSU"), de insteekmodule voor Atlantic- en Fujitsu General-splitunits. Elke airco heeft een eigen interface nodig.

Wat je kunt doen
- De airco aan- en uitzetten
- De modus kiezen: auto, koelen, verwarmen, ontvochtigen of alleen ventilator
- Aparte doeltemperaturen voor koelen en verwarmen instellen
- De huidige temperatuur bekijken
- De ventilatorsnelheid instellen: auto en stand 1 tot 4 (stand 1 is de stille modus)
- De lamelpositie instellen: kwart, half, driekwart of volledig open
- Alles gebruiken in je Flows
- Kiezen in welke modus de airco start wanneer je hem inschakelt
- In de app-instellingen een overzicht van al je airco's bekijken
- Airco’s die dezelfde buitenunit delen groeperen; het eerste toestel dat aan staat is de master en bepaalt of verwarmen of koelen is toegestaan

Een apparaat toevoegen
Zorg dat de Naviclim-interface niet gekoppeld is aan een andere hub. Is dat wel zo, verwijder hem daar dan en reset de interface eerst. Ga daarna in de Homey-app naar Apparaten, voeg een apparaat toe, kies Naviclim en zet de interface in koppelmodus zoals beschreven in de installatiehandleiding. Laat het voorpaneel van het binnenunit open tot het koppelen klaar is.

Goed om te weten
- De interface kan de lamelpositie en de stille-ventilatorinstelling niet terugmelden. Homey toont de laatste waarde die het zelf heeft ingesteld. Wijzig je die met de afstandsbediening, dan merkt Homey dat niet.
- Stand 1 en 2 van de ventilatorsnelheid zien er voor de interface hetzelfde uit. Homey onthoudt welke je koos.
- Een modus instellen vanuit Homey zet de airco ook aan.
- De groepsregel geldt alleen voor verwarmen tegenover koelen of ontvochtigen. Auto en alleen ventilator worden niet beperkt, omdat de interface niet kan zien wat een unit in automodus werkelijk doet.

Deze app is niet gemaakt door of verbonden met Atlantic of Fujitsu General. Productnamen worden alleen gebruikt om compatibele apparaten te beschrijven.
