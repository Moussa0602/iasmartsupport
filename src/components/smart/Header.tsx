import { Link, useLocation } from "@tanstack/react-router";
import { Users, Headphones, BookOpen } from "lucide-react";

const roles = [
  { to: "/client", label: "Client", icon: Users },
  { to: "/technicien", label: "Technicien", icon: Headphones },
  { to: "/base", label: "Base", icon: BookOpen },
] as const;

export function Header({ subBrand }: { subBrand?: string }) {
  const { pathname } = useLocation();
  const showSwitcher = pathname !== "/";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-2xl tracking-tight text-foreground">
            SmartSupport <span style={{ color: "var(--coral)" }}>AI</span>
          </span>
          {subBrand ? (
            <span className="ml-1 italic text-sm text-text-muted">{subBrand}</span>
          ) : null}
        </Link>

        <div className="flex items-center gap-3">
          {showSwitcher && (
            <nav className="hidden items-center gap-1 rounded-md border border-border bg-card p-1 md:flex">
              {roles.map((r) => {
                const active = pathname.startsWith(r.to);
                const Icon = r.icon;
                return (
                  <Link
                    key={r.to}
                    to={r.to}
                    className={`flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-text-muted hover:text-foreground"
                    }`}
                  >
                    <Icon size={14} strokeWidth={1.5} />
                    {r.label}
                  </Link>
                );
              })}
            </nav>
          )}
          <span
            className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-text-muted"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Démo interactive
          </span>
        </div>
      </div>
    </header>
  );
}
