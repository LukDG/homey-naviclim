Styr dit Atlantic- eller Fujitsu General-airconditionanlæg fra Homey via Zigbee, uden nogen cloudkonto.

Appen understøtter Atlantic Naviclim Zigbee-interfacet (Zigbee-model ”Adapter Zigbee FUJITSU”), plug-in-modulet til Atlantic- og Fujitsu General-splitenheder. Hvert airconditionanlæg har brug for sit eget interface.

Det kan du gøre
- Tænde og slukke airconditionanlægget
- Vælge tilstand: auto, køling, varme, affugtning eller kun ventilator
- Indstille separate måltemperaturer til køling og varme
- Se den aktuelle temperatur
- Indstille ventilatorhastighed: auto og niveau 1 til 4 (niveau 1 er lydløs tilstand)
- Indstille lamelposition: kvart, halvt, tre kvart eller helt åben
- Bruge det hele i dine Flows
- Vælge, hvilken tilstand airconditionanlægget starter i, når du tænder det
- Åbne appens indstillinger for en oversigt over alle dine airconditionanlæg
- Gruppere airconditionanlæg, der deler en udendørsenhed; den første tændte enhed er master og afgør, om opvarmning eller køling er tilladt

Tilføj en enhed
Sørg for, at Naviclim-interfacet ikke er parret med en anden hub. Hvis det er, skal du fjerne det dér og nulstille interfacet først. Gå derefter til Enheder i Homey-appen, tilføj en enhed, vælg Naviclim, og sæt interfacet i parringstilstand som beskrevet i installationsvejledningen. Lad indendørsenhedens frontpanel stå åbent, indtil parringen er færdig.

Godt at vide
- Interfacet kan ikke melde lamelpositionen eller indstillingen for lydløs ventilator tilbage. Homey viser den sidste værdi, Homey selv har indstillet. Hvis du ændrer dem med fjernbetjeningen, opdager Homey det ikke.
- Niveau 1 og 2 for ventilatorhastighed ser ens ud for interfacet. Homey husker, hvilket du valgte.
- Hvis du indstiller en tilstand fra Homey, tændes airconditionanlægget også.
- Gruppereglen gælder kun opvarmning over for køling eller affugtning. Auto og kun ventilator begrænses ikke, fordi interfacet ikke kan se, hvad en enhed i automatisk tilstand faktisk gør.

Denne app er ikke lavet af eller tilknyttet Atlantic eller Fujitsu General. Produktnavne bruges kun til at beskrive kompatible enheder.
