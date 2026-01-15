# AppAudioVersTexte

AudioVersTexte est une application web légère conçue pour transformer instantanément des fichiers audio en archives textuelles exploitables.

En s'appuyant sur l'intelligence artificielle de Google Cloud Speech-to-Text, l'outil permet aux utilisateurs d'uploader des enregistrements (mémos vocaux, messages de répondeur, notes de réunion) et d'obtenir une transcription écrite précise. Chaque fichier traité est automatiquement loger et ajouté à dans les sauvegardes.

Projet en PWA voir les fichiers:
manifest.js pour changer le nom et l'hébergement du site https://srv-peda2.iut-acy.univ-smb.fr/jacqutim/AppAudioVersTexte-main/
pwa.js pour installer et recharger la page
voir la balise head de index.html
dossier favion générer par https://realfavicongenerator.net/

Un prérequit est de crée un compte Google Cloud, actuellement il existe une offre 90 gratuit avec 200euro de crédit.
Etape 1: Crée une zone projet
Etape 2: Accéder a la rubrique API et Service
Etape 3: Activé l'API Speech to Text
Etape 4: Générer un clé API

Sutructure du projet
Fichier index.html
Fichier index.js
Il contient les listener qui vérifie si des actions on été effectuer par l'utilisateurs.
Le bouton submit de l'audio, est une fonction async car elle contient un requete vers une API, on utilise cela car il y a du délais avant de recevoir la réponse. En faisant ca on met "en pause" le code javascript
https://docs.cloud.google.com/speech-to-text/docs/sync-recognize?hl=fr

Plutôt que d'affichier des messages en console, on utilise une champs de text pour affichiers le status et les erreurs à l'utilisateurs. L'id de la div est "status"
En cas d'erreur l'utilisateurs sera informé du problème rencontré

Fichier audiotraitement.js
Ce fichier est utile pour le traitement des fichiers audios, il est indispensable car il permet de d'envoyer à l'API un fichier audio universelle, l'utilisateurs n'a pas a se soucier de l'extentions de son fichier audio.

Utilisation du local storage pour crée un historique de

Les library Graphique
J'utilise le Framework TailwindCSS pour gérer plus facilement le responsive designe
J'utilise le Wavesurfer, Wavesurfer.js is an open-source audio visualization library for creating interactive, customizable waveforms.
est une library de visualization d'audio open-source. Elle permet de custom la forme des audios et d'exploiter si il y a du son.

Utilisé l'API FILE

Idée supplémentaire:
Faire un responsive et une joli interface
Stocker l'historique des vocaux en localstorage
Fonctionnalité transcription en Streaming
Trouver un joli Logo et un nom pour le site
Finir la DOC
Gérer les buttons de pwa pour recharger la pages sur l'APP
