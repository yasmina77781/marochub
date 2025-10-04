# Maroc Digital Hub 🚀

Plateforme web complète pour connecter startups, investisseurs et innovateurs au Maroc.

## 🌟 Fonctionnalités

- **Annuaire de Startups** : Explorez et publiez des startups par secteur
- **Événements** : Créez et participez à des événements tech
- **Forum de Discussion** : Échangez avec la communauté
- **Dashboard Admin** : Statistiques et gestion complète
- **Authentification** : Système de rôles (Admin, Startup, Investisseur, Visiteur)
- **Upload d'images** : Intégration Cloudinary pour les images

## 🛠️ Technologies

- **Frontend**: React 18, Redux Toolkit, React Router
- **Styling**: TailwindCSS
- **Backend**: JSON Server (API REST simulée)
- **State Management**: Redux Toolkit
- **Notifications**: React-Toastify
- **Icons**: Lucide React
- **Images**: Cloudinary
- **Build Tool**: Vite

## 📦 Installation

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd maroc-digital-hub
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration Cloudinary** (Optionnel)

Créez un compte sur [Cloudinary](https://cloudinary.com/) puis modifiez le fichier `src/utils/cloudinary.js`:

```javascript
const CLOUDINARY_UPLOAD_PRESET = 'votre_upload_preset';
const CLOUDINARY_CLOUD_NAME = 'votre_cloud_name';
```

Pour créer un upload preset:
1. Connectez-vous à Cloudinary
2. Allez dans Settings > Upload
3. Créez un nouveau Upload Preset (mode: unsigned)
4. Copiez le nom du preset

4. **Démarrer le serveur JSON**
```bash
npm run server
```
Le serveur JSON sera accessible sur http://localhost:3001

5. **Démarrer l'application (dans un nouveau terminal)**
```bash
npm run dev
```
L'application sera accessible sur http://localhost:3000

## 📁 Structure du Projet

```
maroc-digital-hub/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── Modal.jsx
│   │   ├── StartupCard.jsx
│   │   ├── EventCard.jsx
│   │   └── DiscussionCard.jsx
│   ├── pages/              # Pages de l'application
│   │   ├── HomePage.jsx
│   │   ├── EventsPage.jsx
│   │   ├── MyEventsPage.jsx
│   │   ├── DiscussionsPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── LoginPage.jsx
│   ├── redux/              # Redux state management
│   │   ├── store.js
│   │   ├── api.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── startupsSlice.js
│   │       ├── eventsSlice.js
│   │       └── discussionsSlice.js
│   ├── utils/              # Utilitaires
│   │   └── cloudinary.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── db.json                 # Base de données JSON
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 👥 Comptes de Test

Pour tester l'application, utilisez ces comptes:

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | admin@marocdigitalhub.ma | admin123 |
| Startup | startup@example.com | startup123 |
| Investisseur | investor@example.com | investor123 |
| Visiteur | visitor@example.com | visitor123 |

## 🎯 Fonctionnalités par Rôle

### Visiteur
- ✅ Consulter les startups
- ✅ Voir les événements
- ✅ Lire les discussions
- ❌ Publier du contenu

### Startup
- ✅ Toutes les permissions visiteur
- ✅ Publier une startup
- ✅ Créer des événements
- ✅ Participer aux discussions
- ✅ S'inscrire aux événements

### Investisseur
- ✅ Toutes les permissions visiteur
- ✅ Créer des événements
- ✅ Participer aux discussions
- ✅ S'inscrire aux événements

### Admin
- ✅ Toutes les permissions
- ✅ Supprimer startups/événements/discussions
- ✅ Accès au dashboard
- ✅ Gestion complète de la plateforme

## 🚀 Scripts Disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Démarrer le serveur JSON
npm run server

# Build pour la production
npm run build

# Preview du build de production
npm run preview
```

## 📊 API Endpoints (JSON Server)

- **GET** `/startups` - Liste des startups
- **POST** `/startups` - Créer une startup
- **PUT** `/startups/:id` - Modifier une startup
- **DELETE** `/startups/:id` - Supprimer une startup

- **GET** `/events` - Liste des événements
- **POST** `/events` - Créer un événement
- **PATCH** `/events/:id` - Mettre à jour un événement
- **DELETE** `/events/:id` - Supprimer un événement

- **GET** `/discussions` - Liste des discussions
- **POST** `/discussions` - Créer une discussion
- **DELETE** `/discussions/:id` - Supprimer une discussion

- **GET** `/users` - Liste des utilisateurs
- **POST** `/users` - Créer un utilisateur

## 🎨 Personnalisation

### Couleurs
Modifiez les couleurs dans `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#a855f7', // Votre couleur principale
  }
}
```

### Logo
Remplacez le texte dans `src/components/Navigation.jsx`

## 📝 Notes Importantes

1. **JSON Server**: Les données sont stockées dans `db.json` et sont persistées localement
2. **Cloudinary**: L'upload d'images nécessite une configuration Cloudinary
3. **Redux**: L'état est géré avec Redux Toolkit pour une meilleure scalabilité
4. **React Router**: Navigation entre pages sans rechargement

## 🐛 Débogage

### Problème: Le serveur JSON ne démarre pas
**Solution**: Vérifiez que le port 3001 est libre ou changez le port dans `package.json`

### Problème: Les images ne s'uploadent pas
**Solution**: Vérifiez votre configuration Cloudinary dans `src/utils/cloudinary.js`

### Problème: Redux DevTools ne fonctionne pas
**Solution**: Installez l'extension Redux DevTools dans votre navigateur

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.

## 📄 Licence

MIT License - Libre d'utilisation pour vos projets personnels et commerciaux.

## 👨‍💻 Auteur

Développé avec ❤️ pour l'écosystème numérique marocain

---

**Bon développement ! 🚀**