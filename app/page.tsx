"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  CheckCircle,
  Users,
  Calendar,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Star,
  Play,
  Menu,
  X,
  FolderOpen,
  Clock,
  Bell,
  FileText,
  Settings,
  Target,
  TrendingUp,
  MessageSquare,
  Download,
  Upload,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronRight,
  BookOpen,
  Video,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState("projects");

  const features = [
    {
      id: "projects",
      title: "Gestion de Projets",
      icon: FolderOpen,
      color: "emerald",
      description: "Créez, organisez et suivez vos projets de A à Z",
      details: [
        "Création de projets avec templates personnalisables",
        "Vue d'ensemble avec statuts et progression",
        "Organisation par catégories et priorités",
        "Gestion des échéances et jalons",
        "Collaboration en temps réel",
      ],
    },
    {
      id: "tasks",
      title: "Gestion des Tâches",
      icon: CheckCircle,
      color: "blue",
      description: "Organisez et suivez toutes vos tâches efficacement",
      details: [
        "Création et attribution de tâches",
        "Statuts personnalisables (À faire, En cours, Terminé)",
        "Priorités et échéances",
        "Sous-tâches et dépendances",
        "Commentaires et pièces jointes",
      ],
    },
    {
      id: "team",
      title: "Gestion d'Équipe",
      icon: Users,
      color: "purple",
      description: "Gérez vos équipes et collaborez efficacement",
      details: [
        "Invitation et gestion des membres",
        "Rôles et permissions granulaires",
        "Profils utilisateur détaillés",
        "Suivi des performances individuelles",
        "Communication intégrée",
      ],
    },
    {
      id: "calendar",
      title: "Calendrier & Planning",
      icon: Calendar,
      color: "orange",
      description: "Planifiez et visualisez vos projets dans le temps",
      details: [
        "Vue calendrier interactive",
        "Diagrammes de Gantt avancés",
        "Planification des ressources",
        "Gestion des conflits d'horaires",
        "Synchronisation avec calendriers externes",
      ],
    },
    {
      id: "reports",
      title: "Rapports & Analytics",
      icon: BarChart3,
      color: "red",
      description: "Analysez les performances avec des rapports détaillés",
      details: [
        "Tableaux de bord personnalisables",
        "Métriques de performance en temps réel",
        "Rapports d'avancement automatiques",
        "Analyse de la productivité",
        "Export de données (PDF, Excel)",
      ],
    },
    {
      id: "automation",
      title: "Automatisation",
      icon: Zap,
      color: "yellow",
      description: "Automatisez vos workflows pour gagner du temps",
      details: [
        "Règles d'automatisation personnalisées",
        "Notifications intelligentes",
        "Actions automatiques sur les tâches",
        "Intégrations avec outils externes",
        "Workflows conditionnels",
      ],
    },
  ];

  const usageGuides = [
    {
      title: "Créer votre premier projet",
      steps: [
        "Cliquez sur 'Nouveau Projet' dans le dashboard",
        "Choisissez un template ou créez un projet vierge",
        "Définissez les objectifs et échéances",
        "Invitez les membres de votre équipe",
        "Commencez à créer vos premières tâches",
      ],
      icon: Plus,
      color: "emerald",
    },
    {
      title: "Organiser vos tâches",
      steps: [
        "Accédez à la section 'Tâches' de votre projet",
        "Créez des tâches avec descriptions détaillées",
        "Assignez les tâches aux membres appropriés",
        "Définissez les priorités et échéances",
        "Utilisez les statuts pour suivre l'avancement",
      ],
      icon: Target,
      color: "blue",
    },
    {
      title: "Suivre l'avancement",
      steps: [
        "Consultez le dashboard pour une vue d'ensemble",
        "Utilisez les diagrammes de Gantt pour la planification",
        "Vérifiez les rapports de performance",
        "Analysez les métriques de productivité",
        "Ajustez la planification si nécessaire",
      ],
      icon: TrendingUp,
      color: "purple",
    },
    {
      title: "Collaborer efficacement",
      steps: [
        "Utilisez les commentaires sur les tâches",
        "Partagez des fichiers et documents",
        "Configurez les notifications importantes",
        "Organisez des réunions via le calendrier",
        "Utilisez les mentions pour alerter les collègues",
      ],
      icon: MessageSquare,
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex flex-row gap-4 items-center mb-2">
                  <Image
                    src={"/logo.png"}
                    alt={"logo de ProjectFlow"}
                    width={100000}
                    height={100000}
                    className="h-[50px] w-auto"
                  />
                  <h3 className="text-2xl font-bold text-emerald-400">
                    ProjectFlow
                  </h3>
                </div>
              </div>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">
                Fonctionnalités
              </a>
              <a href="#guide" className="text-gray-600 hover:text-gray-900">
                Guide d'utilisation
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">
                Tarifs
              </a>
              <a href="#support" className="text-gray-600 hover:text-gray-900">
                Support
              </a>
            </nav>

            {/* Boutons d'action */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Se connecter</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Commencer
                </Button>
              </Link>
            </div>

            {/* Menu mobile */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Menu mobile ouvert */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a
                href="#features"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                Fonctionnalités
              </a>
              <a
                href="#guide"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                Guide d'utilisation
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                Tarifs
              </a>
              <a
                href="#support"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                Support
              </a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3 space-x-3">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full">
                      Se connecter
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Commencer
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="mb-4 bg-emerald-100 text-emerald-800">
              Nouveau : Diagrammes de Gantt et PERT disponibles
              {/* 🚀 Nouvelle version : Interface redesignée et fonctionnalités IA */}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              La gestion de projet{" "}
              <span className="text-emerald-600">réinventée</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Une plateforme complète et intuitive pour gérer vos projets,
              équipes et tâches. Collaborez efficacement, suivez l'avancement en
              temps réel et livrez vos projets à temps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              ✅ Essai gratuit de 14 jours • ✅ Aucune carte de crédit requise •
              ✅ Configuration en 5 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Section de confiance */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 mb-8">Fait confiance par plus de 10,000+ équipes dans le monde</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
              <div className="flex justify-center">
                <div className="w-32 h-16 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-sm font-semibold">STARTUP INC</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-32 h-16 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-sm font-semibold">TECH CORP</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-32 h-16 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-sm font-semibold">DESIGN CO</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-32 h-16 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-sm font-semibold">GLOBAL LTD</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-32 h-16 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-sm font-semibold">INNOVATE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Fonctionnalités Détaillées */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Toutes les fonctionnalités dont vous avez besoin
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une suite complète d'outils pour gérer vos projets de manière
              professionnelle et efficace.
            </p>
          </div>

          <Tabs
            value={activeFeature}
            onValueChange={setActiveFeature}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="text-xs md:text-sm"
                >
                  <feature.icon className="h-4 w-4 mr-1" />
                  {feature.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {features.map((feature) => (
              <TabsContent key={feature.id} value={feature.id}>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div
                      className={`w-16 h-16 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-6`}
                    >
                      <feature.icon
                        className={`h-8 w-8 text-${feature.color}-600`}
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-100 rounded-xl p-8 h-96 flex items-center justify-center">
                    <div className="text-center">
                      <feature.icon
                        className={`h-24 w-24 text-${feature.color}-400 mx-auto mb-4`}
                      />
                      <p className="text-gray-500">Aperçu de {feature.title}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Interface interactive disponible dans l'application
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Guide d'utilisation */}
      <section id="guide" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Guide d'utilisation rapide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Apprenez à utiliser les fonctionnalités principales en quelques
              étapes simples.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {usageGuides.map((guide, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 bg-${guide.color}-100 rounded-lg flex items-center justify-center mb-4`}
                  >
                    <guide.icon className={`h-6 w-6 text-${guide.color}-600`} />
                  </div>
                  <CardTitle className="text-xl">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {guide.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 bg-${guide.color}-100 text-${guide.color}-600 rounded-full text-sm font-semibold mr-3 mt-0.5 flex-shrink-0`}
                        >
                          {stepIndex + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Section d'aide supplémentaire */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Besoin d'aide supplémentaire ?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Documentation</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Guides détaillés et documentation complète
                  </p>
                  <Button variant="outline" size="sm">
                    Consulter
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Video className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Tutoriels vidéo</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Apprenez visuellement avec nos tutoriels
                  </p>
                  <Button variant="outline" size="sm">
                    Regarder
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <HelpCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Support 24/7</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Notre équipe est là pour vous aider
                  </p>
                  <Button variant="outline" size="sm">
                    Contacter
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnalités avancées */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités avancées
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils puissants pour les équipes qui veulent aller plus loin.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Suivi du temps</CardTitle>
                <CardDescription>
                  Enregistrez le temps passé sur chaque tâche et générez des
                  rapports de productivité.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle>Notifications intelligentes</CardTitle>
                <CardDescription>
                  Recevez des alertes personnalisées pour ne jamais manquer une
                  échéance importante.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle>Gestion de fichiers</CardTitle>
                <CardDescription>
                  Stockez, partagez et versionnez vos documents directement dans
                  vos projets.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Settings className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle>Personnalisation</CardTitle>
                <CardDescription>
                  Adaptez l'interface et les workflows selon les besoins de
                  votre équipe.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      {/* <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ce que disent nos utilisateurs</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6">
                  "ProjectFlow a transformé notre façon de travailler. L'interface est intuitive et les fonctionnalités sont exactement ce dont nous avions besoin."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">Sarah Martin</p>
                    <p className="text-gray-600 text-sm">Chef de projet, TechStart</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6">
                  "Enfin un outil qui centralise tout ! Fini les emails perdus et les fichiers éparpillés. Notre productivité a augmenté de 40%."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">Marc Dubois</p>
                    <p className="text-gray-600 text-sm">Directeur, Design Studio</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6">
                  "L'automatisation des tâches répétitives nous fait gagner un temps précieux. Je recommande vivement !"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <p className="font-semibold">Julie Leroy</p>
                    <p className="text-gray-600 text-sm">Responsable IT, GlobalCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Tarifs */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choisissez le plan parfait pour votre équipe
            </h2>
            <p className="text-xl text-gray-600">
              Des tarifs transparents qui s'adaptent à la taille de votre
              organisation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plan Starter */}
            <Card className="border-2 border-gray-200 hover:border-emerald-300 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  Gratuit
                </div>
                <CardDescription>Parfait pour débuter</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    Jusqu'à 3 utilisateurs
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />5
                    projets
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    Gestion des tâches de base
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    Support par email
                  </li>
                </ul>
                <Link href="/register">
                  <Button className="w-full bg-transparent" variant="outline">
                    Commencer gratuitement
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Plan Professional */}
            <Card className="border-2 border-emerald-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-emerald-600">Plus populaire</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  3 000 fcfa
                  <span className="text-lg font-normal text-gray-600">
                    /mois
                  </span>
                </div>
                <CardDescription>
                  Idéal pour les équipes en croissance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    Jusqu'à 15 utilisateurs
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    Projets illimités
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    Diagrammes de Gantt
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    Rapports avancés
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    Support prioritaire
                  </li>
                </ul>
                <Link href="/register">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Essayer 14 jours gratuits
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Plan Enterprise */}
            <Card className="border-2 border-gray-200 hover:border-emerald-300 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-4xl font-bold text-gray-900 mt-4">
                  Sur mesure
                </div>
                <CardDescription>
                  Pour les grandes organisations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    Utilisateurs illimités
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    Toutes les fonctionnalités
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    API et intégrations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    Support dédié 24/7
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                    Formation personnalisée
                  </li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline">
                  Nous contacter
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">
                  Puis-je changer de plan à tout moment ?
                </h3>
                <p className="text-gray-600">
                  Oui, vous pouvez upgrader ou downgrader votre plan à tout
                  moment. Les changements prennent effet immédiatement.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">
                  Mes données sont-elles sécurisées ?
                </h3>
                <p className="text-gray-600">
                  Absolument. Nous utilisons un chiffrement de niveau bancaire
                  et nos serveurs sont hébergés dans des centres de données
                  certifiés.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">
                  Y a-t-il une limite au nombre de projets ?
                </h3>
                <p className="text-gray-600">
                  Le plan Starter est limité à 5 projets. Les plans Professional
                  et Enterprise offrent des projets illimités.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">
                  Proposez-vous une formation ?
                </h3>
                <p className="text-gray-600">
                  Oui, nous proposons des sessions de formation personnalisées
                  pour les équipes Enterprise, ainsi que des ressources
                  d'apprentissage pour tous.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à révolutionner votre gestion de projet ?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Rejoignez plus de 10,000 équipes qui utilisent ProjectFlow pour
            livrer leurs projets plus rapidement et efficacement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-100"
              >
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="text-emerald-100 mt-4 text-sm">
            ✅ Configuration en 5 minutes • ✅ Support en français • ✅
            Satisfaction garantie
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="support" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex flex-row gap-4 items-center mb-2">
                <Image
                  src={"/logo.png"}
                  alt={"logo de ProjectFlow"}
                  width={100000}
                  height={100000}
                  className="h-[50px] w-auto"
                />
                <h3 className="text-2xl font-bold text-emerald-400">
                  ProjectFlow
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                La plateforme de gestion de projet qui simplifie la
                collaboration et accélère la livraison.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white">
                    Fonctionnalités
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white">
                    Tarifs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sécurité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Intégrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#guide" className="hover:text-white">
                    Guide d'utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Tutoriels
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Webinaires
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Statut système
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Communauté
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; 2025 ProjectFlow. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
