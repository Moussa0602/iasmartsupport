import { useEffect, useRef, useState, useCallback } from "react";
import { MessageCircle, X, Send, CheckCircle2, Play } from "lucide-react";
import { toast } from "sonner";

type Msg =
  | { id: number; from: "assistant"; text: string }
  | { id: number; from: "user"; text: string };

const SCRIPT: Msg[] = [
  {
    id: 1,
    from: "assistant",
    text: "Bonjour ! Je suis l'assistant SmartSupport. Décrivez-moi votre problème en quelques mots, je vais essayer de vous aider à le résoudre immédiatement.",
  },
  {
    id: 2,
    from: "user",
    text: "Bonjour, les produits vendus en magasin hier soir apparaissent toujours en stock sur mon site web. J'ai déjà 3 commandes que je ne peux pas honorer.",
  },
  {
    id: 3,
    from: "assistant",
    text: "Je comprends, c'est un problème de synchronisation entre votre caisse magasin et votre boutique en ligne. Pour vous proposer la bonne piste, 2 questions rapides :\n\n• À quelle heure ont eu lieu les ventes magasin d'hier soir ?\n• À quelle heure est la dernière synchronisation réussie visible dans votre tableau de bord ?",
  },
  {
    id: 4,
    from: "user",
    text: "Les ventes étaient entre 18h et 19h30. La dernière synchro réussie affichée est à 17h45 hier.",
  },
  {
    id: 5,
    from: "assistant",
    text: "Diagnostic clair : votre synchronisation nocturne a échoué pendant la fenêtre de maintenance (23h-1h). Voici une résolution en 3 étapes :\n\n1. Forcer une synchronisation manuelle depuis Stock > Synchronisation\n2. Vérifier les 3 commandes web et contacter les clients concernés\n3. Activer l'option « Synchronisation de rattrapage » pour éviter le problème\n\nVoulez-vous que je vous guide sur l'étape 1 ?",
  },
  {
    id: 6,
    from: "user",
    text: "J'ai essayé de forcer la synchro manuelle, mais j'ai une erreur \"Conflit de stock détecté sur 12 références\". Je ne sais pas quoi faire.",
  },
  {
    id: 7,
    from: "assistant",
    text: "Cette erreur (code SYNC_CONFLICT_412) nécessite l'intervention d'un technicien — c'est un cas où plusieurs canaux ont vendu simultanément le même produit. Je vais créer pour vous un ticket avec tout le contexte de notre échange. Un technicien vous répondra sous 4 heures (plan Pro · SLA 4h).",
  },
];

const FINAL_ASSISTANT: Msg = {
  id: 99,
  from: "assistant",
  text: "✓ Ticket TKT-2026-1847 créé avec succès. Un technicien va prendre en charge votre demande dans les prochaines minutes. Vous recevrez une notification par email à chaque mise à jour. Vous pouvez fermer cette conversation, tout est sauvegardé.",
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  // Start with first 2 messages preloaded
  const [shownIds, setShownIds] = useState<number[]>([1, 2]);
  const [typing, setTyping] = useState(false);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const [draft, setDraft] = useState("");
  const [showProposal, setShowProposal] = useState(false);
  const [proposalClosing, setProposalClosing] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Tooltip after 3s on page
  useEffect(() => {
    if (tooltipDismissed || open) return;
    const t = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(t);
  }, [tooltipDismissed, open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [shownIds, typing, showProposal, showFinal, ticketCreated]);

  const clearTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  // Show proposal once last script message visible
  useEffect(() => {
    if (shownIds.includes(7) && !ticketCreated && !showProposal) {
      const t = setTimeout(() => setShowProposal(true), 500);
      return () => clearTimeout(t);
    }
  }, [shownIds, ticketCreated, showProposal]);

  const sendNextUser = useCallback(() => {
    // Find next user message not yet shown
    const next = SCRIPT.find(
      (m) => m.from === "user" && !shownIds.includes(m.id),
    );
    if (!next) return;
    setShownIds((s) => [...s, next.id]);
    // Trigger assistant reply
    const replyIdx = SCRIPT.findIndex((m) => m.id === next.id) + 1;
    const reply = SCRIPT[replyIdx];
    if (reply && reply.from === "assistant") {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setShownIds((s) => [...s, reply.id]);
      }, 900);
      timeouts.current.push(t);
    }
  }, [shownIds]);

  const startAuto = () => {
    if (autoPlaying) return;
    setAutoPlaying(true);
    clearTimeouts();
    // Reset to start
    setShownIds([1]);
    setShowProposal(false);
    setTicketCreated(false);
    setShowFinal(false);
    let delay = 600;
    SCRIPT.slice(1).forEach((msg) => {
      if (msg.from === "assistant") {
        timeouts.current.push(setTimeout(() => setTyping(true), delay));
        delay += 1100;
        timeouts.current.push(
          setTimeout(() => {
            setTyping(false);
            setShownIds((s) => (s.includes(msg.id) ? s : [...s, msg.id]));
          }, delay),
        );
        delay += 2000;
      } else {
        timeouts.current.push(
          setTimeout(
            () =>
              setShownIds((s) => (s.includes(msg.id) ? s : [...s, msg.id])),
            delay,
          ),
        );
        delay += 1500;
      }
    });
    timeouts.current.push(setTimeout(() => setAutoPlaying(false), delay));
  };

  const handleCreateTicket = () => {
    setProposalClosing(true);
    setTimeout(() => {
      setShowProposal(false);
      setProposalClosing(false);
      setTyping(true);
      timeouts.current.push(
        setTimeout(() => {
          setTyping(false);
          setShowFinal(true);
          setTicketCreated(true);
          toast.success("Ticket #TKT-2026-1847 créé.", {
            description: "Un technicien vous répondra sous 4 h.",
          });
        }, 800),
      );
    }, 200);
  };

  const openPanel = () => {
    setOpen(true);
    setShowTooltip(false);
    setTooltipDismissed(true);
  };

  const nextUserPreview = SCRIPT.find(
    (m) => m.from === "user" && !shownIds.includes(m.id),
  );

  // Build ordered render list
  const visible = SCRIPT.filter((m) => shownIds.includes(m.id));

  return (
    <>
      {/* Tooltip bubble */}
      {showTooltip && !open && (
        <div
          className="animate-fade-in fixed bottom-[104px] right-6 z-40 max-w-[220px] rounded-xl bg-white px-4 py-2.5 text-sm text-foreground shadow-warm-md"
          style={{
            boxShadow: "0 8px 24px rgba(27, 58, 87, 0.15)",
            border: "1px solid var(--border)",
          }}
        >
          Une question ? Je peux vous aider
          <span
            className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-white"
            style={{ borderRight: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
          />
        </div>
      )}

      {/* Floating button */}
      <button
        type="button"
        onClick={openPanel}
        aria-label="Ouvrir l'assistant"
        className="animate-btn-pulse fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full text-white transition-transform duration-200 hover:scale-[1.08]"
        style={{
          backgroundColor: "var(--ink)",
          boxShadow: "0 8px 24px rgba(27, 58, 87, 0.25)",
        }}
      >
        <MessageCircle size={28} strokeWidth={2} />
        <span
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold text-white"
          style={{ backgroundColor: "var(--coral)", border: "2px solid var(--background)" }}
        >
          1
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 animate-fade-in"
            style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
            onClick={() => setOpen(false)}
          />
          <aside
            className="animate-slide-in-right absolute right-0 top-0 flex h-full w-full flex-col sm:max-w-[420px]"
            style={{
              backgroundColor: "#FAFAF7",
              borderLeft: "1px solid #E8E5E0",
              boxShadow: "-12px 0 32px rgba(20, 15, 10, 0.12)",
            }}
          >
            {/* Header */}
            <div
              className="sticky top-0 z-10 flex h-[72px] items-center gap-3 border-b px-5"
              style={{ borderColor: "#E8E5E0", backgroundColor: "#FAFAF7" }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-white text-xs font-semibold"
                style={{ background: "linear-gradient(135deg, #1B3A57 0%, #E85D4C 100%)" }}
              >
                SA
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-semibold text-foreground leading-tight">
                  Assistant SmartSupport
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[12px]" style={{ color: "#6B7280" }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#5C8A6E" }} />
                  En ligne · répond en moins d'une minute
                </div>
              </div>
              <button
                onClick={startAuto}
                disabled={autoPlaying}
                className="hidden items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50 sm:flex"
                style={{ borderColor: "#E8E5E0" }}
                title="Lancer la démo automatique"
              >
                <Play size={12} strokeWidth={2} />
                {autoPlaying ? "En cours…" : "Démo auto"}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1.5 transition-colors hover:bg-muted"
                style={{ color: "#6B7280" }}
                aria-label="Fermer"
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>

            {/* Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
              <div className="flex flex-col gap-4">
                {visible.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}

                {typing && <TypingBubble />}

                {showProposal && !ticketCreated && (
                  <div
                    className={proposalClosing ? "animate-fade-out" : "animate-fade-in"}
                    style={{
                      backgroundColor: "#F4F1EB",
                      border: "1px solid #E8E0D5",
                      borderRadius: "12px",
                      padding: "16px",
                    }}
                  >
                    <div
                      className="text-[10px] font-semibold uppercase tracking-wider"
                      style={{ color: "#E85D4C" }}
                    >
                      Proposition
                    </div>
                    <div className="mt-2 text-[14px] font-semibold text-foreground">
                      Créer un ticket pré-rempli ?
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed" style={{ color: "#6B7280" }}>
                      Le technicien recevra votre échange complet, votre plan tarifaire et le code d'erreur. Aucune information à ressaisir.
                    </p>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={handleCreateTicket}
                        className="flex-1 rounded-md px-3 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
                        style={{ backgroundColor: "#E85D4C" }}
                      >
                        Créer le ticket
                      </button>
                      <button
                        className="flex-1 rounded-md border bg-transparent px-3 py-2 text-[13px] font-medium transition-colors hover:bg-muted"
                        style={{ borderColor: "#E8E5E0", color: "#6B7280" }}
                      >
                        Réessayer plus tard
                      </button>
                    </div>
                  </div>
                )}

                {showFinal && (
                  <>
                    <MessageBubble msg={FINAL_ASSISTANT} />
                    <div
                      className="animate-fade-in flex items-center gap-3 rounded-xl bg-white p-3"
                      style={{ border: "1px solid #C4DBC9" }}
                    >
                      <CheckCircle2 size={20} strokeWidth={1.75} style={{ color: "#5C8A6E" }} />
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[13px] font-semibold text-foreground"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Ticket #TKT-2026-1847
                        </div>
                        <div className="text-[12px]" style={{ color: "#6B7280" }}>
                          Statut : Ouvert · Priorité : Critique
                        </div>
                      </div>
                      <button
                        className="text-[12px] font-medium underline"
                        style={{ color: "#1B3A57" }}
                      >
                        Voir mes tickets →
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Manual send next user message hint */}
            {nextUserPreview && !autoPlaying && !ticketCreated && (
              <div className="px-5 pb-2">
                <button
                  onClick={sendNextUser}
                  className="w-full truncate rounded-md border bg-white px-3 py-2 text-left text-[12px] transition-colors hover:bg-muted"
                  style={{ borderColor: "#E8E5E0", color: "#6B7280" }}
                  title="Cliquer pour envoyer le prochain message"
                >
                  <span className="font-medium" style={{ color: "#1B3A57" }}>↳ Envoyer :</span>{" "}
                  {nextUserPreview.text}
                </button>
              </div>
            )}

            {/* Composer */}
            <div
              className="sticky bottom-0 border-t p-4"
              style={{ borderColor: "#E8E5E0", backgroundColor: "#FAFAF7" }}
            >
              <div className="flex items-end gap-2">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={1}
                  placeholder="Écrivez votre message…"
                  className="flex-1 resize-none rounded-xl border bg-white px-3.5 py-2.5 text-[14px] outline-none transition-colors focus:border-[var(--ink)]"
                  style={{ borderColor: "#E8E5E0", maxHeight: 120 }}
                />
                <button
                  disabled={!draft.trim()}
                  onClick={() => setDraft("")}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-opacity disabled:opacity-40"
                  style={{ backgroundColor: "#E85D4C" }}
                  aria-label="Envoyer"
                >
                  <Send size={16} strokeWidth={2} />
                </button>
              </div>
              <p className="mt-2 text-[11px] italic" style={{ color: "#6B7280" }}>
                L'assistant est propulsé par Claude AI. Vos échanges restent confidentiels.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

function MessageBubble({ msg }: { msg: Msg }) {
  const isUser = msg.from === "user";
  return (
    <div className={`animate-fade-in flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      <div
        className="mb-1 text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: "#9CA3AF" }}
      >
        {isUser ? "Vous" : "Assistant"}
      </div>
      <div
        className="max-w-[85%] whitespace-pre-line px-4 py-3 text-[14px] leading-relaxed"
        style={{
          backgroundColor: isUser ? "#1B3A57" : "#FFFFFF",
          color: isUser ? "#FFFFFF" : "#1A1A1A",
          border: isUser ? "none" : "1px solid #E8E5E0",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          boxShadow: isUser ? "none" : "0 1px 2px rgba(20, 15, 10, 0.04)",
        }}
      >
        {msg.text}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="animate-fade-in flex flex-col items-start">
      <div
        className="mb-1 text-[10px] font-semibold uppercase tracking-wider"
        style={{ color: "#9CA3AF" }}
      >
        Assistant
      </div>
      <div
        className="flex items-center gap-1.5 bg-white px-4 py-3"
        style={{
          border: "1px solid #E8E5E0",
          borderRadius: "16px 16px 16px 4px",
        }}
      >
        <span className="typing-dot h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#9CA3AF" }} />
        <span
          className="typing-dot h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: "#9CA3AF", animationDelay: "0.15s" }}
        />
        <span
          className="typing-dot h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: "#9CA3AF", animationDelay: "0.3s" }}
        />
      </div>
    </div>
  );
}