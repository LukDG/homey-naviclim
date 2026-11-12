Styr Atlantic- eller Fujitsu General-klimaanlegget ditt fra Homey via Zigbee, uten noen skykonto.

Appen støtter Atlantic Naviclim Zigbee-grensesnittet (Zigbee-modell «Adapter Zigbee FUJITSU»), plug-in-modulen for Atlantic- og Fujitsu General-splittenheter. Hvert klimaanlegg trenger sitt eget grensesnitt.

Dette kan du gjøre
- Slå klimaanlegget på og av
- Velge modus: auto, kjøling, varme, avfukting eller kun vifte
- Stille inn separate måltemperaturer for kjøling og varme
- Se gjeldende temperatur
- Stille inn viftehastighet: auto og nivå 1 til 4 (nivå 1 er stille modus)
- Stille inn lamellposisjon: kvart, halvt, tre kvart eller helt åpen
- Bruke alt i Flowene dine
- Velge hvilken modus klimaanlegget starter i når du slår det på
- Åpne appinnstillingene for en oversikt over alle klimaanleggene dine
- Gruppere klimaanlegg som deler en utedel; den første påslåtte enheten er master og avgjør om oppvarming eller kjøling er tillatt

Legge til en enhet
Pass på at Naviclim-grensesnittet ikke er paret med en annen hub. Hvis det er det, fjern det der og tilbakestill grensesnittet først. Gå deretter til Enheter i Homey-appen, legg til en enhet, velg Naviclim og sett grensesnittet i paringsmodus slik det er beskrevet i installasjonsveiledningen. La frontpanelet på innedelen stå åpent til paringen er ferdig.

Greit å vite
- Grensesnittet kan ikke melde tilbake lamellposisjonen eller innstillingen for stille vifte. Homey viser den siste verdien Homey selv har satt. Hvis du endrer dem med fjernkontrollen, merker ikke Homey det.
- Nivå 1 og 2 for viftehastighet ser like ut for grensesnittet. Homey husker hvilket du valgte.
- Å sette en modus fra Homey slår også på klimaanlegget.
- Gruppereglen gjelder bare oppvarming mot kjøling eller avfukting. Auto og kun vifte begrenses ikke, fordi grensesnittet ikke kan se hva en enhet i automodus faktisk gjør.

Denne appen er ikke laget av eller tilknyttet Atlantic eller Fujitsu General. Produktnavn brukes bare for å beskrive kompatible enheter.
