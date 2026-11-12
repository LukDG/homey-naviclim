Pilotez votre climatiseur Atlantic ou Fujitsu General depuis Homey via Zigbee, sans compte cloud.

Cette application prend en charge l’interface Zigbee Atlantic Naviclim (modèle Zigbee « Adapter Zigbee FUJITSU »), le module enfichable pour les unités split Atlantic et Fujitsu General. Chaque climatiseur nécessite sa propre interface.

Ce que vous pouvez faire
- Allumer et éteindre le climatiseur
- Choisir le mode : auto, froid, chaud, déshumidification ou ventilation seule
- Régler des consignes distinctes pour le refroidissement et le chauffage
- Voir la température actuelle
- Régler la vitesse du ventilateur : auto et niveaux 1 à 4 (le niveau 1 est le mode silencieux)
- Régler la position du volet : ouvert au quart, à moitié, aux trois quarts ou complètement
- Tout utiliser dans vos Flows
- Choisir dans quel mode le climatiseur démarre lorsque vous l’allumez
- Ouvrir les réglages de l’application pour une vue d’ensemble de tous vos climatiseurs
- Regrouper les climatiseurs qui partagent une unité extérieure ; le premier appareil allumé est le maître et décide si le chauffage ou le refroidissement est autorisé

Ajouter un appareil
Assurez-vous que l’interface Naviclim n’est pas appairée à une autre box. Si elle l’est, supprimez-la d’abord de cette box et réinitialisez l’interface. Allez ensuite dans Appareils dans l’application Homey, ajoutez un appareil, choisissez Naviclim et mettez l’interface en mode appairage comme décrit dans sa notice d’installation. Laissez la façade de l’unité intérieure ouverte jusqu’à la fin de l’appairage.

Bon à savoir
- L’interface ne peut pas signaler la position du volet ni le réglage du ventilateur silencieux. Homey affiche la dernière valeur qu’il a lui-même définie. Si vous les modifiez avec la télécommande, Homey ne le remarque pas.
- Les niveaux 1 et 2 du ventilateur sont identiques pour l’interface. Homey se souvient de celui que vous avez choisi.
- Définir un mode depuis Homey allume aussi le climatiseur.
- La règle de groupe ne s’applique qu’au chauffage face au refroidissement ou à la déshumidification. Auto et ventilation seule ne sont pas limités, car l’interface ne peut pas savoir ce que fait réellement une unité en mode auto.

Cette application n’est pas développée par Atlantic ou Fujitsu General et n’est pas affiliée à ces sociétés. Les noms de produits sont utilisés uniquement pour décrire les appareils compatibles.
