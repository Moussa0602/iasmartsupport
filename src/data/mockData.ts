export type Priority = "Critique" | "Haute" | "Normale";

export interface Ticket {
  id: string;
  priority: Priority;
  title: string;
  customer: string;
  company?: string;
  ago: string;
  category?: string;
  rtl?: boolean;
}

export const tickets: Ticket[] = [
  {
    id: "TKT-2026-1847",
    priority: "Critique",
    title: "Coupure de synchronisation avec Djibouti Telecom — agence de Tadjourah, depuis 8h ce matin",
    customer: "Khadija Houssein",
    company: "Doraleh Logistics",
    ago: "Il y a 12 min",
    category: "Réseau",
  },
  {
    id: "TKT-2026-1846",
    priority: "Haute",
    title: "Export facture en FDJ : montant tronqué au-delà de 100 000",
    customer: "Saïd Daoud",
    company: "Atlas Trading SARL",
    ago: "Il y a 47 min",
  },
  {
    id: "TKT-2026-1845",
    priority: "Haute",
    title: "Module stock bloqué sur articles en attente de dédouanement à Doraleh",
    customer: "Houmed Abdo",
    company: "BTP Horizon Djibouti",
    ago: "Il y a 2 h",
  },
  {
    id: "TKT-2026-1844",
    priority: "Normale",
    title: "Calendrier planning ne marque pas le 27 juin comme férié — équipe affectée à tort",
    customer: "Asma Mohamed",
    company: "Hôtel Acacias Djibouti",
    ago: "Il y a 3 h",
  },
  {
    id: "TKT-2026-1843",
    priority: "Normale",
    title: "Notifications WhatsApp Business : erreur d'envoi vers numéros +253",
    customer: "Aïcha Omar",
    company: "Digital Way DJ",
    ago: "Il y a 4 h",
  },
  {
    id: "TKT-2026-1842",
    priority: "Normale",
    title: "طلب دعم خلال شهر رمضان — تعديل ساعات المناوبة المسائية",
    customer: "Ibrahim Farah",
    company: "Pharmacie Centrale du Plateau",
    ago: "Il y a 5 h",
    rtl: true,
  },
];

export interface SimilarCase {
  id: string;
  title: string;
  ago: string;
  score: number;
}

export const similarCases: SimilarCase[] = [
  { id: "TKT-2026-1602", title: "Synchro Djibouti Telecom après maintenance fibre — agence Obock", ago: "Il y a 12 jours", score: 94 },
  { id: "TKT-2026-1488", title: "Liaison instable depuis Ali Sabieh — bascule 4G de secours", ago: "Il y a 1 mois", score: 87 },
  { id: "TKT-2025-9821", title: "Erreur OFFLINE_LOCK_412 après coupure prolongée", ago: "Il y a 3 mois", score: 81 },
];

export interface Article {
  id: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  ai?: boolean;
  featured?: boolean;
  freshLabel?: string;
}

export const articles: Article[] = [
  {
    id: "1",
    category: "Réseau & Connectivité",
    title: "Résoudre une coupure de synchronisation Djibouti Telecom",
    description: "Liaison fibre instable vers une agence régionale ? Voici la procédure de bascule 4G et de resynchronisation en moins de 5 minutes.",
    duration: "5 min",
    views: "412 vues",
    ai: true,
    featured: true,
    freshLabel: "Nouveau · Généré il y a 8 min",
  },
  { id: "2", category: "Démarrage", title: "Premiers pas avec votre ERP en 10 minutes", description: "Configurez votre société djiboutienne (NIF, RCS), importez vos premiers clients et émettez votre première facture en FDJ.", duration: "8 min", views: "1 247 vues" },
  { id: "3", category: "Paramétrage", title: "Configurer le calendrier dimanche → jeudi et les jours fériés", description: "Adaptez votre planning à la semaine de travail djiboutienne, intégrez le 27 juin et les fêtes lunaires.", duration: "6 min", views: "892 vues", ai: true },
  { id: "4", category: "Comptabilité", title: "Émettre un avoir sur une facture validée en FDJ", description: "Une facture validée ne se modifie pas. Voici la procédure légale d'avoir + nouvelle facture, conforme à la fiscalité djiboutienne.", duration: "4 min", views: "634 vues" },
  { id: "5", category: "Caisse", title: "Caisse Sunmi : écran noir au démarrage", description: "Procédure de récupération en cas d'écran noir après coupure secteur EDD ou mise à jour.", duration: "3 min", views: "287 vues", ai: true },
  { id: "6", category: "API & Intégrations", title: "Intégration EDD : automatiser les relevés mensuels d'électricité", description: "Récupérez automatiquement vos relevés Électricité de Djibouti dans votre comptabilité analytique.", duration: "10 min", views: "198 vues" },
  { id: "7", category: "Démarrage", title: "Importer 1 000+ fiches clients depuis Excel", description: "Modèle CSV, colonnes obligatoires (NIF, téléphone +253), gestion des doublons et des erreurs d'import.", duration: "7 min", views: "541 vues" },
  { id: "8", category: "Comptabilité", title: "TVA djiboutienne et exonérations zone franche", description: "Paramétrez les taux applicables, gérez les exonérations zone franche et les opérations d'import-export.", duration: "9 min", views: "478 vues" },
  { id: "9", category: "API & Intégrations", title: "Configurer le paiement BCIMR par virement SWIFT", description: "Connectez votre flux bancaire BCIMR pour le rapprochement automatique des virements clients.", duration: "12 min", views: "213 vues" },
];

export interface ChatMessage {
  from: "user" | "assistant";
  text: string;
}

export const chatScript: ChatMessage[] = [
  { from: "user", text: "Bonjour, depuis ce matin 8h notre agence de Tadjourah n'arrive plus à se synchroniser avec le serveur central. Toutes les opérations sont bloquées." },
  { from: "assistant", text: "Bonjour Khadija, je vais vous aider. C'est probablement lié à la liaison Djibouti Telecom — 2 questions rapides : l'agence Tadjourah voit-elle un message d'erreur précis, et les autres agences (Djibouti-Ville, Ali Sabieh) sont-elles également affectées ?" },
  { from: "user", text: "Tadjourah affiche \"Connexion serveur perdue\". Les autres agences fonctionnent normalement." },
  { from: "assistant", text: "Diagnostic confirmé : la liaison fibre Djibouti Telecom vers Tadjourah est instable depuis 6h ce matin (incident déjà signalé par 2 autres clients de la zone). Voulez-vous que je vous guide pour activer le mode hors-ligne local en attendant le retour du lien ?" },
  { from: "user", text: "J'ai essayé d'activer le mode hors-ligne, mais j'ai une erreur \"OFFLINE_LOCK_412\". Je ne sais pas quoi faire." },
  { from: "assistant", text: "Cette erreur nécessite une intervention technicien — la base locale est verrouillée par une transaction en cours côté serveur. Je crée pour vous un ticket avec tout notre échange. Un technicien vous répondra sous 4 heures (plan Pro · SLA 4h, fuseau EAT)." },
];

export const suggestedReply = `Bonjour Khadija,

J'ai analysé votre échange avec notre assistant. L'erreur « OFFLINE_LOCK_412 » sur l'agence de Tadjourah est un cas connu lors d'une coupure prolongée de la liaison Djibouti Telecom alors qu'une transaction serveur est encore en cours.

Voici la marche à suivre :

1. Allez dans Administration > Agences > Tadjourah et cliquez sur « Forcer le déverrouillage local ».
2. Activez ensuite « Mode hors-ligne » — la saisie reprend immédiatement, les opérations sont stockées localement.
3. Dès le retour du lien fibre, lancez « Synchronisation de rattrapage » depuis Stock > Synchronisation.

Pour éviter ce blocage à l'avenir, je vous recommande d'activer la bascule automatique vers le routeur 4G de secours (Djibouti Telecom Mobile) : Paramètres > Réseau > Bascule 4G.

Je reste disponible si vous avez besoin d'un guidage écran par écran.

Hassan Robleh
Senior support · SmartSupport AI
+253 21 35 27 18 · EAT (UTC+3)`;
