import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Message.css";

export type MessageType = "info" | "success" | "warning" | "error" | "loading";
export type MessagePlacement = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type MessageOptions = {
  type?: MessageType;
  content: React.ReactNode;
  duration?: number;   // ms (por defecto 2500; 0 o negativo => no autocierrar)
  closable?: boolean;
};

export type OpenMessage = MessageOptions & { id: string };

export type UseMessageApi = {
  open: (opts: MessageOptions) => { close: () => void; id: string };
  info: (content: React.ReactNode, opts?: Omit<MessageOptions, "type" | "content">) => { close: () => void; id: string };
  success: (content: React.ReactNode, opts?: Omit<MessageOptions, "type" | "content">) => { close: () => void; id: string };
  warning: (content: React.ReactNode, opts?: Omit<MessageOptions, "type" | "content">) => { close: () => void; id: string };
  error: (content: React.ReactNode, opts?: Omit<MessageOptions, "type" | "content">) => { close: () => void; id: string };
  loading: (content: React.ReactNode, opts?: Omit<MessageOptions, "type" | "content">) => { close: () => void; id: string };
};

const MessageCtx = createContext<{
  add: (opts: MessageOptions) => { close: () => void; id: string };
  remove: (id: string) => void;
  placement: MessagePlacement;
  maxCount: number;
} | null>(null);

type ProviderProps = {
  children: React.ReactNode;
  placement?: MessagePlacement;
  maxCount?: number;
};

export function MessageProvider({
  children,
  placement = "top-right",
  maxCount = 5,
}: ProviderProps) {
  const [items, setItems] = useState<OpenMessage[]>([]);
  const timersRef = useRef<Map<string, number>>(new Map());

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((m) => m.id !== id));
    const t = timersRef.current.get(id);
    if (t) {
      window.clearTimeout(t);
      timersRef.current.delete(id);
    }
  }, []);

  const add = useCallback((opts: MessageOptions) => {
    const id = Math.random().toString(36).slice(2);
    const msg: OpenMessage = { id, type: opts.type ?? "info", content: opts.content, duration: opts.duration ?? 2500, closable: opts.closable ?? false };
    setItems((prev) => {
      const next = [...prev, msg];
      // trimming if exceed maxCount
      if (next.length > maxCount) next.shift();
      return next;
    });

    if ((msg.duration ?? 0) > 0) {
      const t = window.setTimeout(() => remove(id), msg.duration);
      timersRef.current.set(id, t);
    }

    return {
      id,
      close: () => remove(id),
    };
  }, [maxCount, remove]);

  const portal = useMemo(() => {
    const root = typeof document !== "undefined" ? document.body : null;
    if (!root) return null;

    return createPortal(
      <div className={`duino-message duino-message--${placement}`} role="status" aria-live="polite">
        {items.map((m) => (
          <div key={m.id} className={`duino-message__item duino-message__item--${m.type}`}>
            <span className="duino-message__icon" aria-hidden="true">
              {m.type === "success" ? "✓" :
               m.type === "error" ? "✕" :
               m.type === "warning" ? "!" :
               m.type === "loading" ? "⟳" : "i"}
            </span>
            <div className="duino-message__content">
              {m.content}
            </div>
            {(m.closable || (m.duration ?? 0) <= 0) && (
              <button
                type="button"
                className="duino-message__close"
                onClick={() => remove(m.id)}
                aria-label="Close notification"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>,
      root
    );
  }, [items, placement, remove]);

  const ctxValue = useMemo(() => ({ add, remove, placement, maxCount }), [add, remove, placement, maxCount]);

  return (
    <MessageCtx.Provider value={ctxValue}>
      {children}
      {portal}
    </MessageCtx.Provider>
  );
}

export function useMessage(): UseMessageApi {
  const ctx = useContext(MessageCtx);
  if (!ctx) {
    throw new Error("useMessage must be used within <MessageProvider>");
  }
  const open = ctx.add;
  return {
    open,
    info: (content, opts) => open({ type: "info", content, ...opts }),
    success: (content, opts) => open({ type: "success", content, ...opts }),
    warning: (content, opts) => open({ type: "warning", content, ...opts }),
    error: (content, opts) => open({ type: "error", content, ...opts }),
    loading: (content, opts) => open({ type: "loading", content, ...opts, duration: opts?.duration ?? 0 }), // por defecto persistente
  };
}
