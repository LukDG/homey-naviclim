Controlla il tuo condizionatore Atlantic o Fujitsu General da Homey tramite Zigbee, senza alcun account cloud.

Questa app supporta l’interfaccia Zigbee Atlantic Naviclim (modello Zigbee «Adapter Zigbee FUJITSU»), il modulo plug-in per le unità split Atlantic e Fujitsu General. Ogni condizionatore richiede una propria interfaccia.

Cosa puoi fare
- Accendere e spegnere il condizionatore
- Scegliere la modalità: auto, raffreddamento, riscaldamento, deumidificazione o solo ventilazione
- Impostare temperature obiettivo separate per raffreddamento e riscaldamento
- Vedere la temperatura attuale
- Impostare la velocità della ventola: auto e livelli da 1 a 4 (il livello 1 è la modalità silenziosa)
- Impostare la posizione delle alette: aperte di un quarto, a metà, di tre quarti o completamente
- Usare tutto nei tuoi Flow
- Scegliere in quale modalità parte il condizionatore quando lo accendi
- Aprire le impostazioni dell’app per una panoramica di tutti i tuoi condizionatori
- Raggruppare i condizionatori che condividono un’unità esterna; il primo dispositivo acceso è il master e decide se è consentito riscaldare o raffreddare

Aggiungere un dispositivo
Assicurati che l’interfaccia Naviclim non sia associata a un altro hub. Se lo è, rimuovila da lì e ripristina prima l’interfaccia. Poi vai su Dispositivi nell’app Homey, aggiungi un dispositivo, scegli Naviclim e metti l’interfaccia in modalità di associazione come descritto nel manuale di installazione. Tieni aperto il pannello frontale dell’unità interna finché l’associazione non è completata.

Da sapere
- L’interfaccia non può segnalare la posizione delle alette né l’impostazione della ventola silenziosa. Homey mostra l’ultimo valore da lui stesso impostato. Se li modifichi con il telecomando, Homey non se ne accorge.
- I livelli 1 e 2 della velocità della ventola sembrano uguali all’interfaccia. Homey ricorda quale hai scelto.
- Impostare una modalità da Homey accende anche il condizionatore.
- La regola di gruppo vale solo per riscaldamento contro raffreddamento o deumidificazione. Auto e solo ventilazione non sono limitati, perché l’interfaccia non può sapere cosa fa davvero un’unità in modalità auto.

Questa app non è prodotta da Atlantic o Fujitsu General né affiliata a esse. I nomi dei prodotti sono usati solo per descrivere i dispositivi compatibili.
