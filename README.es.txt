Controla tu aire acondicionado Atlantic o Fujitsu General desde Homey a través de Zigbee, sin ninguna cuenta en la nube.

Esta app es compatible con la interfaz Zigbee Atlantic Naviclim (modelo Zigbee «Adapter Zigbee FUJITSU»), el módulo enchufable para unidades split de Atlantic y Fujitsu General. Cada aire acondicionado necesita su propia interfaz.

Qué puedes hacer
- Encender y apagar el aire acondicionado
- Elegir el modo: auto, frío, calor, deshumidificar o solo ventilador
- Establecer temperaturas objetivo separadas para frío y calor
- Ver la temperatura actual
- Ajustar la velocidad del ventilador: auto y niveles del 1 al 4 (el nivel 1 es el modo silencioso)
- Ajustar la posición de las lamas: un cuarto, medio, tres cuartos o totalmente abiertas
- Usar todo en tus Flows
- Elegir en qué modo arranca el aire acondicionado al encenderlo
- Abrir los ajustes de la app para ver un resumen de todos tus aires acondicionados
- Agrupar aires acondicionados que comparten una unidad exterior; el primer dispositivo encendido es el maestro y decide si se permite calentar o enfriar

Añadir un dispositivo
Asegúrate de que la interfaz Naviclim no esté emparejada con otro hub. Si lo está, elimínala allí y restablece primero la interfaz. Luego ve a Dispositivos en la app de Homey, añade un dispositivo, elige Naviclim y pon la interfaz en modo de emparejamiento como se describe en su manual de instalación. Mantén abierto el panel frontal de la unidad interior hasta que termine el emparejamiento.

Conviene saber
- La interfaz no puede informar de la posición de las lamas ni del ajuste de ventilador silencioso. Homey muestra el último valor que él mismo estableció. Si los cambias con el mando a distancia, Homey no lo detecta.
- Los niveles 1 y 2 de la velocidad del ventilador son iguales para la interfaz. Homey recuerda cuál elegiste.
- Establecer un modo desde Homey también enciende el aire acondicionado.
- La regla de grupo solo se aplica a calentar frente a enfriar o deshumidificar. Auto y solo ventilador no se restringen, porque la interfaz no puede saber qué hace realmente una unidad en modo auto.

Esta app no está creada por Atlantic ni Fujitsu General ni está afiliada a ellas. Los nombres de producto se usan solo para describir dispositivos compatibles.
