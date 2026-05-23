import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Headphones, BookOpen, ArrowRight } from "lucide-react";
import { Header } from "@/components/smart/Header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SmartSupport AI — Démo interactive" },
      { name: "description", content: "Choisissez une vue : portail client, dashboard technicien ou base de connaissances." },
    ],
  }),
  component: Home,
});

const cards = [
  {
    to: "/client",
    icon: Users,
    title: "Vue Client",
    desc: "Le portail self-service avec assistant conversationnel et création de ticket assistée.",
  },
  {
    to: "/technicien",
    icon: Headphones,
    title: "Vue Technicien",
    desc: "Le dashboard support avec résumés IA, cas similaires et réponses suggérées.",
  },
  {
    to: "/base",
    icon: BookOpen,
    title: "Base de connaissances",
    desc: "Les articles publiés, dont ceux générés automatiquement depuis les tickets résolus.",
  },
] as const;

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto flex max-w-[1280px] flex-col items-center px-6 pt-24 pb-16">
        <h1
          className="font-serif text-center text-foreground"
          style={{ fontSize: "72px", lineHeight: 1.05 }}
        >
          SmartSupport <span style={{ color: "var(--coral)" }}>AI</span>
        </h1>
        <p className="mt-5 max-w-2xl text-center text-text-muted" style={{ fontSize: "18px" }}>
          Plateforme de support client intelligent — pensée pour les PME djiboutiennes,
          parastataux et ONG de la Corne de l'Afrique.
        </p>

        <div className="mt-16 grid w-full max-w-[1100px] gap-6 md:grid-cols-3">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.to}
                to={c.to}
                className="group flex flex-col rounded-md border border-border bg-card p-7 shadow-warm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-warm-md"
                style={{ boxShadow: "var(--shadow-warm)" }}
              >
                <Icon size={28} strokeWidth={1.5} style={{ color: "var(--ink)" }} />
                <h2 className="mt-6 font-serif text-2xl text-foreground">{c.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{c.desc}</p>
                <span
                  className="mt-6 inline-flex items-center gap-1 text-sm font-medium transition-transform group-hover:translate-x-0.5"
                  style={{ color: "var(--ink)" }}
                >
                  Ouvrir <ArrowRight size={14} strokeWidth={1.5} />
                </span>
              </Link>
            );
          })}
        </div>

        <p className="mt-16 text-center text-xs text-text-muted">
          SmartSupport AI — Conçu à Djibouti · Immeuble El Rachid, Place du 27 juin, Djibouti-Ville · Fuseau EAT (UTC+3)
        </p>
      </main>
    </div>
  );
}
