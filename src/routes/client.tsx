import { createFileRoute } from "@tanstack/react-router";
import { Search, Settings, Bug, GraduationCap, HelpCircle } from "lucide-react";
import { Header } from "@/components/smart/Header";
import { Chatbot } from "@/components/smart/Chatbot";

export const Route = createFileRoute("/client")({
  head: () => ({
    meta: [
      { title: "Portail client — SmartSupport AI" },
      { name: "description", content: "Décrivez votre problème ou parcourez nos catégories d'aide." },
    ],
  }),
  component: ClientPage,
});

const categories = [
  { icon: Settings, title: "Paramétrage", desc: "Configuration, préférences, droits utilisateurs." },
  { icon: Bug, title: "Bug technique", desc: "Erreurs, plantages, comportements inattendus." },
  { icon: GraduationCap, title: "Formation", desc: "Tutoriels, prise en main, bonnes pratiques." },
  { icon: HelpCircle, title: "Autre", desc: "Une question qui ne rentre dans aucune catégorie." },
];

function ClientPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-[1100px] px-6 py-16">
        <div className="text-center">
          <h1 className="font-serif text-foreground" style={{ fontSize: "48px", lineHeight: 1.1 }}>
            Comment pouvons-nous vous aider ?
          </h1>
          <p className="mt-3 text-text-muted" style={{ fontSize: "18px" }}>
            Décrivez votre problème ou parcourez nos catégories.
          </p>

          <div className="mx-auto mt-8 flex max-w-[600px] items-center gap-3 rounded-md border border-border bg-card px-4 py-3 shadow-warm" style={{ boxShadow: "var(--shadow-warm)" }}>
            <Search size={18} strokeWidth={1.5} className="text-text-muted" />
            <input
              type="text"
              placeholder="Décrivez votre problème en quelques mots..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-muted"
            />
            <span
              className="rounded border border-border px-2 py-0.5 text-xs text-text-muted"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              ⌘K
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.title}
                type="button"
                className="flex flex-col items-start rounded-md border border-border bg-card p-6 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-warm-md"
                style={{ boxShadow: "var(--shadow-warm)" }}
              >
                <Icon size={22} strokeWidth={1.5} style={{ color: "var(--ink)" }} />
                <h3 className="mt-4 font-serif text-lg text-foreground">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{c.desc}</p>
              </button>
            );
          })}
        </div>

        <section className="mt-16">
          <h2 className="font-serif text-foreground" style={{ fontSize: "28px" }}>
            Mes tickets en cours
          </h2>
          <div
            className="mt-5 rounded-md border border-border bg-card p-5"
            style={{ boxShadow: "var(--shadow-warm)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
                #TKT-2026-1839
              </span>
              <span className="text-xs text-text-muted">Ouvert le 18/05/2026</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <p className="text-base font-medium text-foreground">
                Configurer le calendrier dim → jeu pour l'équipe de Tadjourah
              </p>
              <span
                className="shrink-0 rounded-full px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: "var(--beige)", color: "var(--amber-warn)" }}
              >
                En cours
              </span>
            </div>
          </div>
        </section>

        <p className="mt-10 text-center text-xs text-text-muted">
          Support assuré en français, anglais et arabe · Fuseau EAT (UTC+3) · dimanche → jeudi
        </p>
      </main>
      <Chatbot />
    </div>
  );
}
