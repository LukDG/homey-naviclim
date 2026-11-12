Styr din Atlantic- eller Fujitsu General-luftkonditionering från Homey via Zigbee, utan något molnkonto.

Appen stöder Atlantic Naviclim Zigbee-gränssnittet (Zigbee-modell ”Adapter Zigbee FUJITSU”), insticksmodulen för Atlantic- och Fujitsu General-splitenheter. Varje luftkonditionering behöver ett eget gränssnitt.

Det här kan du göra
- Slå på och av luftkonditioneringen
- Välja läge: auto, kyla, värme, avfuktning eller endast fläkt
- Ställa in separata måltemperaturer för kyla och värme
- Se aktuell temperatur
- Ställa in fläkthastighet: auto och nivå 1 till 4 (nivå 1 är tyst läge)
- Ställa in lamellposition: fjärdedels, halv, tre fjärdedelar eller helt öppen
- Använda allt i dina Flows
- Välja vilket läge luftkonditioneringen startar i när du slår på den
- Öppna appens inställningar för en översikt över alla dina luftkonditioneringar
- Gruppera luftkonditioneringar som delar en utomhusenhet; den första påslagna enheten är master och avgör om värme eller kyla är tillåten

Lägga till en enhet
Kontrollera att Naviclim-gränssnittet inte är parkopplat med en annan hubb. Om det är det, ta bort det där och återställ gränssnittet först. Gå sedan till Enheter i Homey-appen, lägg till en enhet, välj Naviclim och sätt gränssnittet i parkopplingsläge enligt installationsanvisningen. Låt innerenhetens frontpanel vara öppen tills parkopplingen är klar.

Bra att veta
- Gränssnittet kan inte rapportera lamellposition eller inställningen för tyst fläkt. Homey visar det senaste värdet som Homey själv har ställt in. Om du ändrar dem med fjärrkontrollen märker Homey det inte.
- Nivå 1 och 2 för fläkthastighet ser likadana ut för gränssnittet. Homey kommer ihåg vilken du valde.
- Att ställa in ett läge från Homey slår också på luftkonditioneringen.
- Gruppregeln gäller bara värme mot kyla eller avfuktning. Auto och endast fläkt begränsas inte, eftersom gränssnittet inte kan se vad en enhet i autoläge faktiskt gör.

Den här appen är inte tillverkad av eller ansluten till Atlantic eller Fujitsu General. Produktnamn används bara för att beskriva kompatibla enheter.
