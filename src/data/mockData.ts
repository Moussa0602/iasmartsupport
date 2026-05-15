export type Priority = "Critique" | "Haute" | "Normale";

export interface Ticket {
  id: string;
  priority: Priority;
  title: string;
  customer: string;
  ago: string;
  category?: string;
}

export const tickets: Ticket[] = [
  {
    id: "TKT-2026-1847",
    priority: "Critique",
    title: "Conflit de stock multi-canal — synchro impossible",
    customer: "Marie Dubois",
    ago: "Il y a 8 min",
    category: "Bug",
  },
  {
    id: "TKT-2026-1846",
    priority: "Haute",
    title: "Impossible d'éditer une facture déjà validée",
    customer: "Karim Belhaj",
    ago: "Il y a 35 min",
  },
  {
    id: "TKT-2026-1845",
    priority: "Normale",
    title: "Formation : import CSV des clients",
    customer: "Sophie Lenoir",
    ago: "Il y a 2 h",
  },
  {
    id: "TKT-2026-1843",
    priority: "Haute",
    title: "Caisse bloquée au démarrage — écran noir",
    customer: "Thomas Roy",
    ago: "Il y a 4 h",
  },
];

export interface SimilarCase {
  id: string;
  title: string;
  ago: string;
  score: number;
}

export const similarCases: SimilarCase[] = [
  { id: "TKT-2026-1602", title: "Conflit synchro après mise à jour caisse", ago: "Il y a 12 jours", score: 94 },
  { id: "TKT-2026-1488", title: "Synchro nocturne échouée — stocks divergents", ago: "Il y a 1 mois", score: 87 },
  { id: "TKT-2025-9821", title: "Erreur SYNC_CONFLICT_412 lors d'import manuel", ago: "Il y a 3 mois", score: 81 },
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
    category: "Stock & Synchronisation",
    title: "Résoudre un conflit de synchronisation de stock multi-canal",
    description: "Vous voyez l'erreur SYNC_CONFLICT_412 ? Voici comment résoudre un conflit en moins de 3 minutes.",
    duration: "5 min",
    views: "2 104 vues",
    ai: true,
    featured: true,
    freshLabel: "Nouveau · Généré il y a 5 min",
  },
  { id: "2", category: "Démarrage", title: "Premiers pas avec votre ERP en 10 minutes", description: "Configurez votre société, importez vos premiers clients et émettez votre première facture.", duration: "8 min", views: "4 821 vues" },
  { id: "3", category: "Paramétrage", title: "Paramétrer les remises de fidélité par palier", description: "Créez un programme de fidélité avec remises automatiques selon le panier moyen ou le cumul annuel.", duration: "6 min", views: "1 789 vues" },
  { id: "4", category: "Comptabilité", title: "Émettre un avoir sur une facture validée", description: "Une facture validée ne se modifie pas. Voici la procédure légale d'avoir + nouvelle facture.", duration: "4 min", views: "3 402 vues" },
  { id: "5", category: "Caisse", title: "Caisse Sunmi : écran noir au démarrage", description: "Procédure de récupération en cas d'écran noir après coupure secteur ou mise à jour.", duration: "3 min", views: "956 vues", ai: true },
  { id: "6", category: "API & Intégrations", title: "Connecter votre boutique Shopify à l'ERP", description: "Synchronisation bidirectionnelle catalogue, stock et commandes en moins de 15 minutes.", duration: "10 min", views: "1 523 vues" },
  { id: "7", category: "Démarrage", title: "Importer 1 000+ fiches clients depuis Excel", description: "Modèle CSV, colonnes obligatoires, gestion des doublons et des erreurs d'import.", duration: "7 min", views: "2 876 vues" },
  { id: "8", category: "Comptabilité", title: "Configurer la TVA multi-taux et les exonérations", description: "Gérez plusieurs taux de TVA, exonérations export et autoliquidation BTP.", duration: "9 min", views: "1 342 vues" },
  { id: "9", category: "API & Intégrations", title: "Webhooks : recevoir les événements de commande en temps réel", description: "Configurez des webhooks signés pour synchroniser vos systèmes externes.", duration: "12 min", views: "687 vues" },
];

export interface ChatMessage {
  from: "user" | "assistant";
  text: string;
}

export const chatScript: ChatMessage[] = [
  { from: "user", text: "Bonjour, les produits vendus en magasin hier soir apparaissent toujours en stock sur mon site web. J'ai déjà 3 commandes que je ne peux pas honorer." },
  { from: "assistant", text: "Bonjour Marie, je vais vous aider à résoudre ce problème de synchronisation. J'ai 2 questions rapides : à quelle heure ont eu lieu les ventes magasin d'hier soir, et quand a été la dernière synchronisation réussie visible dans votre tableau de bord ?" },
  { from: "user", text: "Les ventes magasin étaient entre 18h et 19h30. La dernière synchro réussie affichée est à 17h45 hier." },
  { from: "assistant", text: "Diagnostic confirmé : votre synchronisation nocturne a échoué — probablement à cause de la fenêtre de maintenance entre 23h et 1h. Voulez-vous que je vous guide pour forcer une synchronisation manuelle depuis Stock > Synchronisation ?" },
  { from: "user", text: "J'ai essayé de forcer la synchro manuelle, mais j'ai une erreur \"Conflit de stock détecté sur 12 références\". Je ne sais pas quoi faire." },
  { from: "assistant", text: "Cette erreur nécessite une intervention technicien — c'est un cas où plusieurs canaux de vente ont vendu simultanément le même produit. Je crée pour vous un ticket avec tout notre échange en pièce jointe. Un technicien vous répondra sous 4 heures." },
];

export const suggestedReply = `Bonjour Marie,

J'ai analysé votre échange avec notre assistant. L'erreur « Conflit de stock détecté sur 12 références » est un cas connu lorsque plusieurs canaux vendent simultanément le même produit pendant une fenêtre de synchronisation manquée.

Voici la marche à suivre :

1. Allez dans Stock > Conflits de synchronisation. Vous verrez les 12 références listées.
2. Pour chaque ligne, choisissez « Stock magasin prioritaire » (vos ventes physiques sont la source de vérité).
3. Validez en bas de page — la synchronisation reprend automatiquement en 2-3 minutes.

Pour les 3 commandes web non honorables, je vous suggère de contacter les clients depuis Commandes > Annuler avec remboursement automatique.

Enfin, activez « Synchronisation de rattrapage » dans Paramètres > Synchronisation pour éviter ce cas après une fenêtre de maintenance.

Je reste disponible si vous avez besoin d'un guidage écran par écran.`;
