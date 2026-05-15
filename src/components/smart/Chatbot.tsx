import { useEffect, useRef, useState } from "react";
import { MessageCircle, Sparkles, X, SendHorizontal } from "lucide-react";
import { toast } from "sonner";
import { chatScript } from "@/data/mockData";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [created, setCreated] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!open) {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
      setVisibleCount(0);
      setTyping(false);
      setCreated(false);
      return;
    }
    let delay = 400;
    chatScript.forEach((msg, i) => {
      if (msg.from === "assistant") {
        timeouts.current.push(
          setTimeout(() => setTyping(true), delay),
        );
        delay += 1000;
        timeouts.current.push(
          setTimeout(() => {
            setTyping(false);
            setVisibleCount(i + 1);
          }, delay),
        );
        delay += 600;
      } else {
        timeouts.current.push(
          setTimeout(() => setVisibleCount(i + 1), delay),
        );
        delay += 800;
      }
    });
    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [visibleCount, typing]);

  const allShown = visibleCount >= chatScript.length;

  const handleCreate = () => {
    setCreated(true);
    toast.success("Ticket #TKT-2026-1847 créé.", {
      description: "Un technicien vous répondra sous 4 h.",
    });
    setTimeout(() => setOpen(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Discuter avec l'assistant"
        title="Discuter avec l'assistant"
        onClick={() => setOpen(true)}
        className="animate-coral-pulse fixed bottom-8 right-8 z-40 flex h-16 w-16 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
        style={{ backgroundColor: "var(--coral)" }}
      >
        <MessageCircle size={26} strokeWidth={2} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30 animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <aside className="animate-slide-in-right absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col border-l border-border bg-card shadow-warm-lg">
            <div className="flex h-[60px] items-center gap-3 border-b border-border px-4">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: "var(--ink)" }}
              >
                <Sparkles size={18} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">Assistant SmartSupport</div>
                <div className="flex items-center gap-1.5 text-xs text-text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--sage)]" />
                  en ligne
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1.5 text-text-muted hover:bg-muted hover:text-foreground"
                aria-label="Fermer"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
              {chatScript.slice(0, visibleCount).map((msg, i) => (
                <div
                  key={i}
                  className={`animate-fade-in flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      msg.from === "user"
                        ? "max-w-[280px] px-4 py-3 text-sm text-white"
                        : "max-w-[320px] border border-border bg-card px-4 py-3 text-sm text-foreground"
                    }
                    style={{
                      backgroundColor: msg.from === "user" ? "var(--ink)" : "white",
                      borderRadius:
                        msg.from === "user"
                          ? "16px 16px 4px 16px"
                          : "16px 16px 16px 4px",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="animate-fade-in flex justify-start">
                  <div
                    className="flex items-center gap-1 border border-border bg-card px-4 py-3"
                    style={{ borderRadius: "16px 16px 16px 4px" }}
                  >
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-text-muted" />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-text-muted" style={{ animationDelay: "0.2s" }} />
                    <span className="typing-dot h-1.5 w-1.5 rounded-full bg-text-muted" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              )}
              {allShown && !created && (
                <div
                  className="animate-fade-in mt-3 rounded-lg p-4"
                  style={{ backgroundColor: "var(--beige)" }}
                >
                  <p className="text-sm text-foreground">
                    Voulez-vous ouvrir un ticket ? Le contexte de notre conversation sera joint automatiquement.
                  </p>
                  <button
                    onClick={handleCreate}
                    className="mt-3 w-full rounded-md px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "var(--coral)" }}
                  >
                    Créer le ticket TKT-2026-1847
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-border bg-card p-3">
              <input
                type="text"
                placeholder="Tapez votre message..."
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[var(--ink)]"
              />
              <button
                className="flex h-9 w-9 items-center justify-center rounded-md text-white"
                style={{ backgroundColor: "var(--ink)" }}
                aria-label="Envoyer"
              >
                <SendHorizontal size={16} strokeWidth={1.5} />
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
