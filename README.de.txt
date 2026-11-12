Steuere deine Atlantic- oder Fujitsu-General-Klimaanlage von Homey aus über Zigbee, ganz ohne Cloud-Konto.

Diese App unterstützt die Atlantic-Naviclim-Zigbee-Schnittstelle (Zigbee-Modell „Adapter Zigbee FUJITSU“), das Steckmodul für Split-Geräte von Atlantic und Fujitsu General. Jede Klimaanlage benötigt eine eigene Schnittstelle.

Das kannst du tun
- Die Klimaanlage ein- und ausschalten
- Den Modus wählen: Auto, Kühlen, Heizen, Entfeuchten oder nur Lüfter
- Getrennte Zieltemperaturen für Kühlen und Heizen einstellen
- Die aktuelle Temperatur sehen
- Die Lüfterstufe einstellen: Auto und Stufe 1 bis 4 (Stufe 1 ist der leise Modus)
- Die Lamellenposition einstellen: viertel, halb, dreiviertel oder ganz offen
- Alles in deinen Flows verwenden
- Festlegen, in welchem Modus die Klimaanlage beim Einschalten startet
- In den App-Einstellungen eine Übersicht aller Klimaanlagen öffnen
- Klimaanlagen, die sich ein Außengerät teilen, gruppieren; das erste eingeschaltete Gerät ist der Master und entscheidet, ob Heizen oder Kühlen erlaubt ist

Gerät hinzufügen
Stelle sicher, dass die Naviclim-Schnittstelle nicht mit einer anderen Zentrale gekoppelt ist. Falls doch, entferne sie dort und setze die Schnittstelle zuerst zurück. Gehe dann in der Homey-App zu Geräte, füge ein Gerät hinzu, wähle Naviclim und versetze die Schnittstelle in den Kopplungsmodus, wie in ihrer Installationsanleitung beschrieben. Lasse die Frontblende des Innengeräts geöffnet, bis die Kopplung abgeschlossen ist.

Gut zu wissen
- Die Schnittstelle kann die Lamellenposition und die Einstellung des leisen Lüfters nicht zurückmelden. Homey zeigt den zuletzt selbst gesetzten Wert. Änderst du diese mit der Fernbedienung, bemerkt Homey das nicht.
- Stufe 1 und 2 der Lüfterstufe sehen für die Schnittstelle gleich aus. Homey merkt sich, welche du gewählt hast.
- Wenn du in Homey einen Modus einstellst, wird die Klimaanlage auch eingeschaltet.
- Die Gruppenregel gilt nur für Heizen gegenüber Kühlen oder Entfeuchten. Auto und „Nur Lüfter“ sind nicht eingeschränkt, weil die Schnittstelle nicht erkennen kann, was ein Gerät im Automodus tatsächlich tut.

Diese App stammt nicht von Atlantic oder Fujitsu General und steht in keiner Verbindung zu ihnen. Produktnamen werden nur verwendet, um kompatible Geräte zu beschreiben.
