# 1. Nom du projet

**Nom du projet :** HealthCare+ Frontend — Interface React de consommation de l'API sécurisée

---

# 2. Présentation du projet

Ce projet est une application React qui consomme l'API REST HealthCare+ (développée en Spring Boot) pour offrir une interface utilisateur complète et sécurisée à un système de gestion médicale.

Il s'adresse aux utilisateurs finaux du système (patients, médecins, administrateurs) ainsi qu'aux développeurs souhaitant comprendre comment intégrer une authentification JWT et une gestion des rôles côté client.

Son objectif principal est de permettre aux utilisateurs de créer un compte, de se connecter, de conserver leur session et d'accéder uniquement aux pages autorisées selon leur rôle, en communiquant avec les endpoints d'authentification déjà disponibles dans l'API Spring Boot.

---

# 3. Problématique

Le problème identifié est que la sécurisation d'une API ne suffit pas : le frontend doit lui aussi gérer correctement les tokens JWT, les sessions et les erreurs HTTP, sinon l'utilisateur peut être déconnecté involontairement ou accéder à des pages non autorisées.

La solution proposée permet de gérer automatiquement l'authentification, le stockage et le rafraîchissement des tokens, la protection des routes selon le rôle de l'utilisateur, ainsi que la gestion centralisée des erreurs HTTP renvoyées par l'API.

---

# 4. Fonctionnalités principales

- Créer un compte utilisateur via le formulaire d'inscription
- Se connecter et récupérer un token JWT depuis l'API
- Conserver la session utilisateur (stockage et persistance du token)
- Rafraîchir automatiquement le token lorsqu'il expire
- Protéger les routes et n'afficher que les pages autorisées selon le rôle
- Gérer automatiquement les erreurs HTTP (401, 403, 500, etc.)
- Se déconnecter et invalider la session
- Consommer les endpoints de l'API HealthCare+ (patients, rendez-vous, fichiers)

---

# 5. Technologies utilisées

| Technologie | Utilisation dans le projet |
|-------------|----------------------------|
| React | Développement de l'interface utilisateur |
| React Router | Gestion des routes et protection des pages selon le rôle |
| Axios (ou Fetch API) | Communication avec l'API REST et gestion des intercepteurs |
| Context API / Redux | Gestion de l'état global (utilisateur, token, rôle) |
| Figma | Maquettage de l'interface utilisateur |
| Docker | Conteneurisation et déploiement de l'application |

---

# 6. Installation et lancement

## 6.1 Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Git
- L'API HealthCare+ (backend Spring Boot) démarrée et accessible

## 6.2 Cloner le dépôt

```bash
git clone <LIEN_DU_DEPOT_FRONTEND>
```

## 6.3 Ouvrir le dossier

```bash
cd healthcare-plus-frontend
```

## 6.4 Installer les dépendances

```bash
npm install
```

## 6.5 Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=HealthCare+
```

## 6.6 Lancer le projet

```bash
npm run dev
```

## 6.7 Ouvrir le projet

```
http://localhost:3000
```

### Point de vigilance

- Vérifier que l'API backend est bien lancée avant de démarrer le frontend
- Vérifier que `VITE_API_BASE_URL` correspond à l'URL réelle de l'API
- Ne jamais publier de tokens ou d'identifiants dans le code

---

# 7. Endpoints de l'API consommés

> À adapter selon les endpoints réels exposés par l'API Spring Boot.

| Méthode | Endpoint | Description |
|---------|----------|--------------|
| POST | `/api/auth/register` | Créer un compte utilisateur |
| POST | `/api/auth/login` | Se connecter et obtenir un token JWT |
| POST | `/api/auth/refresh` | Rafraîchir le token JWT expiré |
| GET | `/api/users/me` | Récupérer les informations de l'utilisateur connecté |
| GET | `/api/patients` | Récupérer la liste paginée des patients |
| GET | `/api/appointments` | Récupérer la liste paginée des rendez-vous |
| GET | `/api/files/{id}` | Télécharger un fichier/document médical |

---

# 8. Captures d'écran

## Capture 1

### Titre
```
Page de connexion
```

### Image
```md
![Page de connexion](chemin-vers-image.png)
```

### Explication
Cette capture montre le formulaire de connexion qui envoie les identifiants à l'endpoint `/api/auth/login` de l'API.

## Capture 2

### Titre
```
Tableau de bord selon le rôle
```

### Image
```md
![Tableau de bord](chemin-vers-image.png)
```

### Explication
Cette capture montre le tableau de bord affiché après authentification, dont le contenu varie selon le rôle de l'utilisateur.

---

# 9. Contribution personnelle

Ma contribution principale a porté sur la maquette Figma et son intégration en composants React.

J'ai également travaillé sur la gestion de l'authentification (connexion, inscription, stockage du token) et la protection des routes selon les rôles.

J'ai été responsable de la connexion entre le frontend et les endpoints d'authentification de l'API Spring Boot, ainsi que de la gestion centralisée des erreurs HTTP.

---

# 10. Difficultés rencontrées

## Difficulté 1

### Texte final

J'ai rencontré le problème suivant : la gestion du rafraîchissement automatique du token JWT sans déconnecter l'utilisateur en cours de session.

Pour comprendre l'origine du problème, j'ai étudié le fonctionnement des intercepteurs Axios et testé plusieurs approches de stockage du token (localStorage, cookies sécurisés).

J'ai résolu le problème en mettant en place un intercepteur qui détecte les réponses 401, appelle automatiquement l'endpoint `/api/auth/refresh`, puis rejoue la requête initiale.

Cette difficulté m'a permis d'apprendre le fonctionnement détaillé de l'authentification stateless avec JWT côté client.

## Difficulté 2

### Texte final

J'ai rencontré le problème suivant : l'affichage de pages non autorisées avant que la vérification du rôle utilisateur ne soit terminée.

Pour comprendre l'origine du problème, j'ai analysé le cycle de vie des composants React et le moment où l'état d'authentification était réellement disponible.

J'ai résolu le problème en ajoutant un composant de route protégée qui attend la résolution de l'état d'authentification avant d'afficher le contenu.

Cette difficulté m'a permis d'apprendre à gérer correctement les états asynchrones liés à l'authentification dans React.

---

# 11. Améliorations possibles

Dans une prochaine version, je pourrais :

- ajouter des tests automatisés (unitaires et end-to-end) ;
- améliorer la gestion des erreurs avec des notifications utilisateur plus détaillées ;
- rendre l'interface entièrement responsive sur mobile ;
- déployer l'application sur une plateforme cloud (Vercel, Netlify ou AWS).

### Conclusion

Ces améliorations permettraient de renforcer la fiabilité, l'expérience utilisateur et l'accessibilité de l'application pour un usage en production.