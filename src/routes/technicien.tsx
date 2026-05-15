import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Copy, X } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/smart/Header";
import { tickets, similarCases, suggestedReply, type Priority } from "@/data/mockData";

export const Route = createFileRoute("/technicien")({
  head: () => ({
    meta: [
      { title: "Dashboard technicien — SmartSupport AI" },
      { name: "description", content: "Tickets, résumés IA, cas similaires et réponses suggérées." },
    ],
  }),
  component: TechPage,
});

const priorityStyle: Record<Priority, { bg: string; color: string }> = {
  Critique: { bg: "var(--coral)", color: "white" },
  Haute: { bg: "#FEF3C7", color: "var(--amber-warn)" },
  Normale: { bg: "#F1F1EE", color: "var(--text-muted)" },
};

const filters = ["Tous", "Urgents", "Mes tickets", "Non assignés"];

function Kpi({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div
      className="rounded-md border border-border bg-card p-4"
      style={{ boxShadow: "var(--shadow-warm)" }}
    >
      <div className="font-serif text-3xl" style={{ color: accent ?? "var(--foreground)" }}>
        {value}
      </div>
      <div className="mt-1 text-sm text-text-muted">{label}</div>
    </div>
  );
}

function TechPage() {
  const [selected, setSelected] = useState(tickets[0].id);
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const ticket = tickets.find((t) => t.id === selected) ?? tickets[0];

  const publishArticle = () => {
    setShowModal(false);
    toast.success("Article publié dans la base de connaissances", {
      description: "Ticket marqué comme résolu",
    });
    setTimeout(() => navigate({ to: "/base" }), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="font-serif text-foreground" style={{ fontSize: "36px" }}>
              Dashboard support
            </h1>
            <p className="mt-1 text-text-muted">Lou Martinez · Niveau 2 · 4 tickets actifs</p>
          </div>
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: "var(--ink)" }}
          >
            LM
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi label="Ouverts" value="4" />
          <Kpi label="Critiques" value="1" accent="var(--coral)" />
          <Kpi label="SLA < 1h" value="2" accent="var(--amber-warn)" />
          <Kpi label="Résolus aujourd'hui" value="17" accent="var(--sage)" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[40%_1fr]">
          {/* LEFT: tickets list */}
          <section>
            <h2 className="font-serif text-xl text-foreground">Tickets ouverts</h2>
            <div className="mt-3 flex flex-wrap gap-1 border-b border-border pb-3 text-sm">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`rounded-md px-3 py-1.5 transition-colors ${
                    activeFilter === f ? "bg-muted text-foreground" : "text-text-muted hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-3">
              {tickets.map((t) => {
                const active = t.id === selected;
                const ps = priorityStyle[t.priority];
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelected(t.id)}
                    className={`w-full rounded-md border p-4 text-left transition-all ${
                      active ? "border-[var(--ink)] bg-card" : "border-border bg-card hover:border-text-muted"
                    }`}
                    style={{ boxShadow: active ? "var(--shadow-warm-md)" : "var(--shadow-warm)" }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
                        #{t.id}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                        style={{ backgroundColor: ps.bg, color: ps.color }}
                      >
                        {t.priority}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-foreground">{t.title}</p>
                    <p className="mt-1 text-xs text-text-muted">
                      {t.customer} · {t.ago}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* RIGHT: detail */}
          <section className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
                <span>#{ticket.id}</span>
                <span>·</span>
                <span style={{ color: "var(--coral)" }}>{ticket.priority}</span>
                <span>·</span>
                <span>{ticket.category ?? "Bug"}</span>
              </div>
              <h2 className="mt-2 font-serif text-foreground" style={{ fontSize: "26px" }}>
                {ticket.title}
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                Marie Dubois — Boutique Mode &amp; Co · ERP Retail v4.2 · Ouvert il y a 8 min
              </p>
            </div>

            {/* AI Summary */}
            <div className="rounded-lg p-5" style={{ backgroundColor: "var(--beige)" }}>
              <span
                className="inline-block rounded px-2 py-0.5 text-[11px] font-semibold text-white"
                style={{ backgroundColor: "var(--ink)" }}
              >
                IA
              </span>
              <h3 className="mt-2 font-serif text-xl text-foreground">Résumé IA</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                Marie ne peut pas synchroniser les stocks entre son magasin physique et son site e-commerce.
                La synchro nocturne a échoué (fenêtre maintenance 23h-1h). Une tentative manuelle déclenche une erreur
                «&nbsp;Conflit de stock détecté sur 12 références&nbsp;». 3 commandes web sont actuellement non honorables.
              </p>
              <ul className="mt-4 space-y-1 text-xs text-foreground/80" style={{ fontFamily: "var(--font-mono)" }}>
                <li>• Dernière synchro réussie : hier 17h45</li>
                <li>• Ventes magasin concernées : 18h00 → 19h30</li>
                <li>• Erreur reproductible — code SYNC_CONFLICT_412</li>
                <li>• Plan tarifaire : Pro (SLA 4h)</li>
              </ul>
            </div>

            {/* Suggested reply */}
            <div className="rounded-md border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-warm)" }}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl text-foreground">Réponse suggérée</h3>
                  <span
                    className="rounded-full border border-border px-2 py-0.5 text-[10px] text-text-muted"
                  >
                    généré par IA
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(suggestedReply);
                    toast.success("Réponse copiée");
                  }}
                  className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted"
                >
                  <Copy size={12} strokeWidth={1.5} /> Copier
                </button>
              </div>
              <pre
                className="mt-4 whitespace-pre-wrap rounded-md p-4 text-sm leading-relaxed text-foreground"
                style={{ backgroundColor: "var(--background)", fontFamily: "var(--font-sans)" }}
              >
                {suggestedReply}
              </pre>
              <p className="mt-3 text-xs italic text-text-muted">
                Vous pouvez éditer la réponse avant envoi.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => toast.success("Réponse envoyée à Marie Dubois")}
                  className="rounded-md px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--ink)" }}
                >
                  Envoyer la réponse
                </button>
                <button
                  className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
                  style={{ color: "var(--ink)" }}
                >
                  Régénérer
                </button>
              </div>
            </div>

            {/* Similar cases */}
            <div className="rounded-md border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-warm)" }}>
              <h3 className="font-serif text-xl text-foreground">Cas similaires résolus</h3>
              <div className="mt-4 space-y-3">
                {similarCases.map((c) => (
                  <button
                    key={c.id}
                    className="flex w-full items-center justify-between gap-3 rounded-md border border-border p-3 text-left transition-colors hover:bg-muted"
                  >
                    <div>
                      <div className="text-xs text-text-muted" style={{ fontFamily: "var(--font-mono)" }}>
                        #{c.id}
                      </div>
                      <div className="mt-0.5 text-sm font-medium text-foreground">{c.title}</div>
                      <div className="mt-0.5 text-xs text-text-muted">{c.ago}</div>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-2.5 py-1 text-xs font-medium"
                      style={{ backgroundColor: "#E6EFE9", color: "var(--sage)" }}
                    >
                      {c.score}% similarité
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ button */}
            <button
              onClick={() => setShowModal(true)}
              className="flex w-full items-center justify-center gap-2 rounded-md py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--sage)" }}
            >
              <Sparkles size={18} strokeWidth={1.5} />
              Transformer ce ticket en article FAQ
            </button>
          </section>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/50 animate-fade-in"
            onClick={() => setShowModal(false)}
          />
          <div
            className="animate-fade-in relative w-full max-w-[500px] rounded-xl bg-card p-8"
            style={{ boxShadow: "var(--shadow-warm-lg)" }}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 rounded-md p-1.5 text-text-muted hover:bg-muted"
              aria-label="Fermer"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
            <h3 className="font-serif text-2xl text-foreground">Générer un article FAQ</h3>
            <div className="mt-5 rounded-md border border-border bg-background p-4 text-sm">
              <div>
                <span className="text-text-muted">Titre proposé : </span>
                <span className="font-medium text-foreground">
                  Résoudre un conflit de synchronisation de stock multi-canal
                </span>
              </div>
              <div className="mt-2">
                <span className="text-text-muted">Catégorie : </span>
                <span className="font-medium text-foreground">Stock &amp; Synchronisation</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1">
                <span className="text-text-muted">Tags : </span>
                {["SYNC_CONFLICT_412", "omnicanal", "synchronisation"].map((t) => (
                  <span
                    key={t}
                    className="rounded border border-border bg-muted px-1.5 py-0.5 text-[11px]"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-4 text-xs text-text-muted">
              Cet article enrichira automatiquement la base de connaissances et sera proposé aux clients confrontés au même problème.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
              >
                Annuler
              </button>
              <button
                onClick={publishArticle}
                className="rounded-md px-4 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: "var(--sage)" }}
              >
                Publier l'article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
