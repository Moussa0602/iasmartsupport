import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Sparkles, ArrowUpRight, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/smart/Header";
import { articles } from "@/data/mockData";

export const Route = createFileRoute("/base")({
  head: () => ({
    meta: [
      { title: "Base de connaissances — SmartSupport AI" },
      { name: "description", content: "Articles publiés par notre équipe et générés par l'IA à partir des tickets résolus." },
    ],
  }),
  component: BasePage,
});

const filters = [
  "Tous",
  "Démarrage",
  "Paramétrage",
  "Stock & Synchronisation",
  "Comptabilité",
  "Caisse",
  "API & Intégrations",
];

function Kpi({ label, value, sub, trend }: { label: string; value: string; sub?: string; trend?: boolean }) {
  return (
    <div
      className="rounded-md border border-border bg-card p-5"
      style={{ boxShadow: "var(--shadow-warm)" }}
    >
      <div className="text-sm text-text-muted">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-serif text-3xl text-foreground">{value}</span>
        {trend && (
          <span className="flex items-center gap-0.5 text-xs font-medium" style={{ color: "var(--sage)" }}>
            <TrendingUp size={12} strokeWidth={1.5} /> 24%
          </span>
        )}
      </div>
      {sub && <div className="mt-1 text-xs text-text-muted">{sub}</div>}
    </div>
  );
}

function BasePage() {
  const [filter, setFilter] = useState("Tous");
  const visible = articles.filter((a) => filter === "Tous" || a.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-[1280px] px-6 py-12">
        <h1 className="font-serif text-foreground" style={{ fontSize: "48px", lineHeight: 1.1 }}>
          Base de connaissances
        </h1>
        <p className="mt-3 text-text-muted" style={{ fontSize: "17px" }}>
          Articles publiés par notre équipe et générés par l'IA à partir des tickets résolus.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi label="Articles publiés" value="247" sub="dont 142 IA-générés" />
          <Kpi label="Créés ce mois" value="38" trend />
          <Kpi label="Résolution self-service" value="67%" sub="taux" />
          <Kpi label="Tickets évités" value="1 842" sub="ce mois-ci" />
        </div>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center">
          <div
            className="flex flex-1 items-center gap-3 rounded-md border border-border bg-card px-4 py-3"
            style={{ boxShadow: "var(--shadow-warm)" }}
          >
            <Search size={18} strokeWidth={1.5} className="text-text-muted" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-muted"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5 text-sm">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1.5 transition-colors ${
                filter === f
                  ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                  : "border-border bg-card text-text-muted hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((a) => (
            <button
              key={a.id}
              onClick={() => toast("Page article en cours de développement")}
              className="group flex flex-col rounded-md border border-border bg-card p-6 text-left transition-all duration-150 hover:-translate-y-0.5 hover:shadow-warm-md"
              style={{ boxShadow: "var(--shadow-warm)" }}
            >
              {a.featured && a.freshLabel && (
                <span
                  className="mb-3 inline-flex items-center gap-1 self-start rounded-full px-2.5 py-1 text-[11px] font-medium"
                  style={{ backgroundColor: "#E6EFE9", color: "var(--sage)" }}
                >
                  <Sparkles size={11} strokeWidth={1.8} /> {a.freshLabel}
                </span>
              )}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-text-muted">{a.category}</span>
                {a.ai && (
                  <span
                    className="rounded px-1.5 py-0.5 text-[10px] font-semibold text-white"
                    style={{ backgroundColor: "var(--ink)" }}
                  >
                    IA
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-serif text-xl leading-snug text-foreground">{a.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{a.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                <span>
                  {a.duration} · {a.views}
                </span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
