Voici une version restructurée et formatée de votre fichier `README.md`, prête à être utilisée sur GitHub. Je n'ai ajouté aucune nouvelle fonctionnalité, j'ai simplement organisé vos informations pour les rendre claires et professionnelles.

---

# 🎙️ AppAudioVersTexte

**AudioVersTexte** est une application web légère (PWA) conçue pour transformer instantanément des fichiers audio en archives textuelles exploitables.

En s'appuyant sur l'intelligence artificielle de **Google Cloud Speech-to-Text**, l'outil permet aux utilisateurs d'uploader des enregistrements (mémos vocaux, messages de répondeur, notes de réunion) et d'obtenir une transcription écrite précise. Chaque fichier traité est automatiquement loggé et ajouté aux sauvegardes locales.

---

## 📋 Prérequis

Pour faire fonctionner la transcription, un compte Google Cloud est nécessaire (offre gratuite de 90 jours avec 200€ de crédit disponible actuellement).

1. Créer une zone projet sur Google Cloud.
2. Accéder à la rubrique **API et Service**.
3. Activer l'API **Speech-to-Text**.
4. Générer une **clé API**.

---

## 🛠️ Stack Technique & Bibliothèques

* **TailwindCSS** : Framework CSS utilisé pour gérer le responsive design.
* **Wavesurfer.js** : Librairie open-source de visualisation audio pour créer des formes d'ondes interactives et personnalisables.
* **LocalForage** : Librairie de stockage asynchrone pour stocker des fichiers volumineux côté client.
* **Google Cloud Speech-to-Text** : API de transcription.

---

## 📂 Structure du Projet

### `index.html`

Structure principale de l'application. Voir la balise `<head>` pour les inclusions PWA et scripts.

### `index.js`

Contient la logique principale et les écouteurs d'événements (listeners).

* **Gestion Async** : Le bouton de soumission utilise une fonction `async` pour gérer le délai de réponse de l'API Google, mettant "en pause" le code JS en attendant le résultat.
* **Feedback UI** : Plutôt que d'utiliser la console, une `div` (id="status") affiche les erreurs et le statut directement à l'utilisateur.

### `audiotraitement.js`

Indispensable pour l'uniformisation des fichiers audio.

* Permet d'envoyer un format universel à l'API, peu importe l'extension d'origine.
* **Gestion des Canaux** : L'API Speech-to-Text nécessite du **Mono (Single Channel)**. Par défaut, Wavesurfer enregistre en stéréo (2 canaux).
* *Configuration Wavesurfer pour forcer le Mono :*
```javascript
const PARAMRECORD = {
  deviceId: deviceId,
  channelCount: 1, // Force le mode mono
}

```



---

## 🧩 Solutions Techniques & Challenges

### 1. Persistance des Données (LocalForage)

Le `localStorage` classique est limité à 5Mo et ne gère pas bien les fichiers binaires (MP3/Blobs).

* **Solution** : Utilisation de l'API **LocalForage**. Elle permet de stocker les fichiers audio directement dans le navigateur pour conserver un historique persistant même après fermeture de la page.

### 2. Manipulation des Fichiers (DataTransfer API)

Lorsqu'un utilisateur enregistre un audio via le micro, le fichier est généré en mémoire (Blob). Pour placer ce fichier dans un `<input type="file">` standard (nécessaire pour le traitement classique), une permission spéciale est requise.

* **Solution** : Utilisation de l'API **DataTransfer** pour simuler un upload utilisateur.
```javascript
const DATATRANSFER = new DataTransfer();
const FILE = new File(["contenu"], "test.txt");

DATATRANSFER.items.add(FILE);

// Injection dans l'input
document.querySelector('input').files = DATATRANSFER.files;

```



### 3. Système de Glisser/Déposer (Drag & Drop)

Implémenté via un champ `input` caché, recouvert par une zone visuelle active pour le drop. Utilise également l'API File.

---

## 📱 Progressive Web App (PWA)

Le projet est configuré pour être installable comme une application native.

* **URL de démo** : `https://srv-peda2.iut-acy.univ-smb.fr/jacqutim/AppAudioVersTexte-main/`
* **`manifest.json`** : Gère le nom, les icônes et l'affichage de l'application.
* **`pwa.js`** : Script de gestion pour l'installation et le rechargement de la page/cache.
* **Favicons** : Générés via RealFaviconGenerator.

---

## 🚀 Roadmap (À faire / Fixes)

**Corrections en cours :**

* [ ] Finaliser la gestion des boutons PWA pour la mise à jour de l'app.

**Idées d'améliorations :**

* [ ] Améliorer le Responsive Design et l'interface globale.
* [ ] Créer un Logo et définir un nom définitif.