# 🚀 Project Management App

Une application moderne de gestion de projets construite avec Next.js 15, TypeScript, Supabase et Tailwind CSS. Cette application offre une solution complète pour la gestion d'équipes, de projets, de tâches et de collaboration en temps réel.

## 📋 Liste des Fonctionnalités

### 🔐 Authentification & Sécurité

- ✅ Inscription et connexion des utilisateurs
- ✅ Authentification sécurisée avec Supabase Auth
- ✅ Gestion des sessions utilisateur
- ✅ Protection des routes privées
- ✅ Réinitialisation de mot de passe

### 📊 Dashboard & Navigation

- ✅ Tableau de bord principal avec vue d'ensemble
- ✅ Navigation latérale intuitive
- ✅ Interface responsive et moderne
- ✅ Thème sombre/clair avec next-themes

### 👥 Gestion d'Équipe

- ✅ Gestion des membres d'équipe
- ✅ Attribution de rôles et permissions
- ✅ Profils utilisateur détaillés
- ✅ Collaboration en temps réel

### 📁 Gestion de Projets

- ✅ Création et gestion de projets
- ✅ Vue d'ensemble des projets
- ✅ Statuts et progression des projets
- ✅ Organisation par catégories

### ✅ Gestion des Tâches

- ✅ Création, modification et suppression de tâches
- ✅ Attribution de tâches aux membres
- ✅ Priorités et échéances
- ✅ Statuts personnalisables
- ✅ Commentaires et pièces jointes

### 📅 Calendrier & Planning

- ✅ Vue calendrier intégrée
- ✅ Planification des tâches et événements
- ✅ Rappels et notifications
- ✅ Synchronisation en temps réel

### ⏱️ Suivi du Temps

- ✅ Enregistrement du temps de travail
- ✅ Rapports de productivité
- ✅ Analyse des performances
- ✅ Facturation basée sur le temps

### 📁 Gestion de Fichiers

- ✅ Upload et stockage de fichiers
- ✅ Partage de documents
- ✅ Versioning des fichiers
- ✅ Intégration avec Supabase Storage

### 🔔 Notifications

- ✅ Notifications en temps réel
- ✅ Alertes par email
- ✅ Notifications push
- ✅ Préférences personnalisables

### 📈 Rapports & Analytics

- ✅ Rapports de performance
- ✅ Statistiques d'équipe
- ✅ Graphiques et visualisations
- ✅ Export de données

### 🤖 Automatisation

- ✅ Workflows automatisés
- ✅ Règles personnalisées
- ✅ Intégrations tierces
- ✅ Actions programmées

### ⚙️ Paramètres

- ✅ Configuration de l'application
- ✅ Préférences utilisateur
- ✅ Gestion des permissions
- ✅ Paramètres d'équipe

## 🏗️ Architecture du Projet

### 📁 Structure des Fichiers

```
project-management-app/
├── 📁 app/                          # App Router de Next.js 15
│   ├── 📁 (auth)/                   # Groupe de routes d'authentification
│   │   ├── 📁 login/                # Page de connexion
│   │   └── 📁 register/             # Page d'inscription
│   ├── 📁 dashboard/                # Interface principale
│   │   ├── 📁 automation/           # Gestion des automatisations
│   │   ├── 📁 calendar/             # Vue calendrier
│   │   ├── 📁 files/                # Gestion des fichiers
│   │   ├── 📁 notifications/        # Centre de notifications
│   │   ├── 📁 projects/             # Gestion des projets
│   │   ├── 📁 reports/              # Rapports et analytics
│   │   ├── 📁 settings/             # Paramètres
│   │   ├── 📁 tasks/                # Gestion des tâches
│   │   ├── 📁 team/                 # Gestion d'équipe
│   │   ├── 📁 time-tracking/        # Suivi du temps
│   │   ├── layout.tsx               # Layout du dashboard
│   │   └── page.tsx                 # Page d'accueil du dashboard
│   ├── globals.css                  # Styles globaux
│   ├── layout.tsx                   # Layout racine
│   └── page.tsx                     # Page d'accueil
├── 📁 components/                   # Composants React réutilisables
│   ├── 📁 ui/                       # Composants UI de base (shadcn/ui)
│   ├── app-sidebar.tsx              # Barre latérale principale
│   ├── demo-helper.tsx              # Utilitaires de démonstration
│   └── theme-provider.tsx           # Fournisseur de thème
├── 📁 hooks/                        # Hooks React personnalisés
├── 📁 lib/                          # Utilitaires et configurations
├── 📁 public/                       # Fichiers statiques
├── 📁 scripts/                      # Scripts de développement
├── 📁 styles/                       # Fichiers de style
├── 📁 supabase/                     # Configuration Supabase
│   ├── 📁 .temp/                    # Fichiers temporaires
│   └── config.toml                  # Configuration Supabase CLI
├── middleware.ts                    # Middleware Next.js
├── next.config.mjs                  # Configuration Next.js
├── tailwind.config.ts               # Configuration Tailwind CSS
├── tsconfig.json                    # Configuration TypeScript
├── components.json                  # Configuration shadcn/ui
├── package.json                     # Dépendances et scripts
└── pnpm-lock.yaml                   # Lockfile pnpm
```

### 🛠️ Stack Technologique

#### Frontend

- **Next.js 15** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI modernes
- **Radix UI** - Primitives UI accessibles
- **Lucide React** - Icônes modernes
- **next-themes** - Gestion des thèmes

#### Backend & Base de Données

- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Base de données relationnelle
- **Supabase Auth** - Authentification
- **Supabase Storage** - Stockage de fichiers
- **Supabase Realtime** - Synchronisation temps réel

#### Outils de Développement

- **pnpm** - Gestionnaire de paquets
- **ESLint** - Linting du code
- **PostCSS** - Traitement CSS
- **Autoprefixer** - Préfixes CSS automatiques

#### Bibliothèques Utilitaires

- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation de schémas
- **date-fns** - Manipulation de dates
- **Recharts** - Graphiques et visualisations
- **cmdk** - Interface de commandes
- **Sonner** - Notifications toast

### 🏛️ Modèle d'Architecture

#### Architecture en Couches

```
┌─────────────────────────────────────┐
│           Présentation              │
│    (Pages, Composants, UI)          │
├─────────────────────────────────────┤
│            Logique Métier           │
│      (Hooks, Utilitaires)           │
├─────────────────────────────────────┤
│         Couche de Données           │
│    (Supabase Client, API)           │
├─────────────────────────────────────┤
│         Base de Données             │
│      (PostgreSQL/Supabase)          │
└─────────────────────────────────────┘
```

#### Patterns Utilisés

- **App Router** - Routing basé sur le système de fichiers
- **Server Components** - Rendu côté serveur par défaut
- **Client Components** - Interactivité côté client
- **Middleware** - Protection des routes et authentification
- **Composition Pattern** - Composants réutilisables
- **Custom Hooks** - Logique métier réutilisable

## 📋 Prérequis

### Logiciels Requis

- **Node.js** >= 18.17.0
- **pnpm** >= 8.0.0 (recommandé) ou npm/yarn
- **Git** pour le contrôle de version

### Comptes & Services

- **Compte Supabase** (gratuit)
- **Projet Supabase** configuré
- **Variables d'environnement** configurées

### Connaissances Recommandées

- JavaScript/TypeScript
- React et Next.js
- Bases de données SQL
- Git et GitHub

## 🚀 Installation

### 1. Cloner le Projet

```bash
git clone <url-du-repository>
cd project-management-app
```

### 2. Installer les Dépendances

```bash
# Avec pnpm (recommandé)
pnpm install

# Ou avec npm
npm install

# Ou avec yarn
yarn install
```

### 3. Configuration de l'Environnement

#### Créer le fichier `.env.local`

```bash
cp .env.example .env.local
```

#### Variables d'environnement requises

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database Configuration
POSTGRES_URL=your_postgres_url
POSTGRES_USER=your_postgres_user
POSTGRES_HOST=your_postgres_host
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DATABASE=your_postgres_database

# JWT Secret
SUPABASE_JWT_SECRET=your_jwt_secret
```

### 4. Configuration de Supabase

#### Installer Supabase CLI

```bash
npm install -g @supabase/cli
```

#### Initialiser Supabase (si nécessaire)

```bash
supabase init
```

#### Démarrer Supabase localement (optionnel)

```bash
supabase start
```

### 5. Lancer l'Application

#### Mode Développement

```bash
pnpm dev
# ou
npm run dev
# ou
yarn dev
```

#### Mode Production

```bash
# Build
pnpm build
npm run build

# Start
pnpm start
npm run start
```

### 6. Accéder à l'Application

- **Application** : http://localhost:3000
- **Supabase Studio** (local) : http://localhost:54323

## 🔧 Scripts Disponibles

```bash
# Développement
pnpm dev              # Démarre le serveur de développement

# Production
pnpm build            # Build l'application pour la production
pnpm start            # Démarre l'application en mode production

# Qualité du Code
pnpm lint             # Vérifie le code avec ESLint

# Supabase (si CLI installé)
supabase start        # Démarre Supabase localement
supabase stop         # Arrête Supabase local
supabase status       # Statut des services Supabase
supabase db reset     # Reset la base de données locale
```

## 🌐 Déploiement

### Vercel (Recommandé)

1. Connecter le repository à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Autres Plateformes

- **Netlify**
- **Railway**
- **Heroku**
- **AWS Amplify**

## 🤝 Contribution

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commit** les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Ouvrir** une Pull Request

## 📝 Licence

Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

- **Documentation** : [Next.js](https://nextjs.org/docs) | [Supabase](https://supabase.com/docs)
- **Issues** : Ouvrir une issue sur GitHub
- **Discussions** : Utiliser les discussions GitHub

## 🔄 Changelog

### Version 0.1.0

- ✅ Configuration initiale du projet
- ✅ Authentification avec Supabase
- ✅ Interface utilisateur de base
- ✅ Navigation et routing

---

**Développé avec ❤️ par Jason Corp**
