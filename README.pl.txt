Steruj klimatyzatorem Atlantic lub Fujitsu General z poziomu Homey przez Zigbee, bez konta w chmurze.

Aplikacja obsługuje interfejs Zigbee Atlantic Naviclim (model Zigbee „Adapter Zigbee FUJITSU”), moduł wtykowy do jednostek split Atlantic i Fujitsu General. Każdy klimatyzator wymaga własnego interfejsu.

Co możesz zrobić
- Włączać i wyłączać klimatyzator
- Wybierać tryb: auto, chłodzenie, grzanie, osuszanie lub tylko wentylator
- Ustawiać osobne temperatury docelowe dla chłodzenia i grzania
- Sprawdzać aktualną temperaturę
- Ustawiać prędkość wentylatora: auto oraz poziomy od 1 do 4 (poziom 1 to tryb cichy)
- Ustawiać pozycję lamel: otwarte w ćwierci, do połowy, w trzech czwartych lub całkowicie
- Używać wszystkiego w swoich Flow
- Wybierać, w jakim trybie klimatyzator startuje po włączeniu
- Otwierać ustawienia aplikacji, aby zobaczyć przegląd wszystkich klimatyzatorów
- Grupować klimatyzatory korzystające z jednej jednostki zewnętrznej; pierwsze włączone urządzenie jest nadrzędne i decyduje, czy dozwolone jest grzanie czy chłodzenie

Dodawanie urządzenia
Upewnij się, że interfejs Naviclim nie jest sparowany z innym hubem. Jeśli jest, najpierw usuń go tam i zresetuj interfejs. Następnie w aplikacji Homey przejdź do Urządzeń, dodaj urządzenie, wybierz Naviclim i przełącz interfejs w tryb parowania zgodnie z instrukcją instalacji. Nie zamykaj panelu przedniego jednostki wewnętrznej, dopóki parowanie się nie zakończy.

Warto wiedzieć
- Interfejs nie potrafi zgłaszać pozycji lamel ani ustawienia cichego wentylatora. Homey pokazuje ostatnią wartość, którą sam ustawił. Jeśli zmienisz je pilotem, Homey tego nie zauważy.
- Poziomy 1 i 2 prędkości wentylatora wyglądają dla interfejsu tak samo. Homey zapamiętuje, który wybrałeś.
- Ustawienie trybu z poziomu Homey włącza także klimatyzator.
- Zasada grupy dotyczy tylko grzania w odniesieniu do chłodzenia lub osuszania. Tryby Auto i tylko wentylator nie są ograniczane, ponieważ interfejs nie wie, co faktycznie robi jednostka w trybie auto.

Ta aplikacja nie została stworzona przez Atlantic ani Fujitsu General i nie jest z nimi powiązana. Nazwy produktów służą wyłącznie do opisania kompatybilnych urządzeń.
