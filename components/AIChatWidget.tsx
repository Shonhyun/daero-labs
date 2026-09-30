"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, RotateCcw, User, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { LogoMark } from "./Logo";

interface Message {
  role: "user" | "assistant";
  content: string;
  isDemo?: boolean;
}

const SUGGESTIONS = [
  "What services do you offer?",
  "Tell me about the Undergrounds app",
  "Magkano magpagawa ng mobile app?",
  "Who are the builders of Daero Labs?",
];

const DAILY_LIMIT = 5;
const STORAGE_KEY = "daero_ai_prompt_limit";

interface PromptUsage {
  count: number;
  resetAt: number;
}

function getPromptUsage(): PromptUsage {
  if (typeof window === "undefined") {
    return { count: 0, resetAt: Date.now() + 24 * 60 * 60 * 1000 };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial: PromptUsage = { count: 0, resetAt: Date.now() + 24 * 60 * 60 * 1000 };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const data: PromptUsage = JSON.parse(raw);
    if (Date.now() >= data.resetAt) {
      const resetData: PromptUsage = { count: 0, resetAt: Date.now() + 24 * 60 * 60 * 1000 };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resetData));
      return resetData;
    }
    return data;
  } catch {
    return { count: 0, resetAt: Date.now() + 24 * 60 * 60 * 1000 };
  }
}

function recordPromptUsage(): PromptUsage {
  const current = getPromptUsage();
  const updated: PromptUsage = {
    count: current.count + 1,
    resetAt: current.resetAt,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
  return updated;
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm **Daero AI**, your virtual studio assistant. Ask me anything about Daero Labs, our engineering services, tech stack, or your project ideas!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remainingPrompts, setRemainingPrompts] = useState<number>(DAILY_LIMIT);
  const [resetAt, setResetAt] = useState<number>(0);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync remaining prompts whenever widget opens
  useEffect(() => {
    const usage = getPromptUsage();
    setRemainingPrompts(Math.max(0, DAILY_LIMIT - usage.count));
    setResetAt(usage.resetAt);
  }, [isOpen]);

  // Auto scroll to bottom of messages container
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  // Direct mouse wheel handler to guarantee smooth inner scrolling independent of Lenis/page scroll
  useEffect(() => {
    if (!isOpen) return;

    const container = messagesContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent parent Lenis from capturing
      e.stopPropagation();

      if (container.scrollHeight > container.clientHeight) {
        container.scrollTop += e.deltaY;
        e.preventDefault();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    // Check rate limit before sending
    const currentUsage = getPromptUsage();
    if (currentUsage.count >= DAILY_LIMIT) {
      setRemainingPrompts(0);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Naabot mo na ang daily limit na **5 prompts** para sa araw na ito. Magre-reset ito bukas (makalipas ang 24 oras)!\n\nKung may agarang inquiry o project proposal, makipag-ugnayan sa amin sa aming [/contact](/contact) page o mag-email sa **daerolabs@gmail.com**.",
        },
      ]);
      return;
    }

    const userMessage: Message = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (response.status === 429 || data.isRateLimited) {
        setRemainingPrompts(0);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              data.error ||
              "Naabot mo na ang daily limit na **5 prompts** para sa araw na ito. Magre-reset ito bukas! Maaari kang mag-email sa **daerolabs@gmail.com**.",
          },
        ]);
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      // Record successful prompt
      const updated = recordPromptUsage();
      setRemainingPrompts(Math.max(0, DAILY_LIMIT - updated.count));
      setResetAt(updated.resetAt);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          isDemo: data.isDemo,
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Pasensya na, nagkaroon ng error sa koneksyon (${err.message || "Unknown error"}). Pakisubukan muli o mag-email sa amin sa **daerolabs@gmail.com**.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Conversation cleared. How can I help you map out your next software project with Daero Labs?",
      },
    ]);
  };

  // Simple Markdown-like renderer for bold and lists
  const renderFormattedText = (content: string) => {
    return content.split("\n").map((line, idx) => {
      // Code block detection
      if (line.startsWith("```")) {
        return null;
      }

      // Bullets
      if (line.startsWith("- ") || line.startsWith("* ")) {
        const itemContent = line.slice(2);
        return (
          <li key={idx} className="ml-4 list-disc list-outside mb-1 text-inherit">
            <span dangerouslySetInnerHTML={{ __html: formatInline(itemContent) }} />
          </li>
        );
      }

      // Regular line
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="mb-1.5 last:mb-0 leading-relaxed">
          <span dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        </p>
      );
    });
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code class='bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded text-xs'>$1</code>");
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[max(1.5rem,calc(env(safe-area-inset-bottom)+1rem))] right-6 md:right-8 z-50 flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-accent text-accent-fg shadow-xl hover:shadow-2xl border border-black/10 dark:border-white/15 cursor-pointer transition-all duration-300 group"
        aria-label="Toggle Daero AI Assistant"
      >
        <MessageSquare className="w-5 h-5 text-accent-fg" />
        <span className="text-sm font-semibold tracking-wide">
          {isOpen ? "Close AI" : "Ask Daero AI"}
        </span>
      </motion.button>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+5rem))] right-4 sm:right-6 md:right-8 z-50 w-[calc(100vw-2rem)] sm:w-[380px] md:w-[420px] h-[560px] max-h-[75vh] flex flex-col rounded-3xl bg-white-smoke/95 dark:bg-panel/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden overscroll-contain lenis-prevent"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 dark:border-white/10 bg-white/50 dark:bg-black/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rich-black to-onyx dark:from-white dark:to-silver text-white dark:text-rich-black flex items-center justify-center shadow-md p-2">
                  <LogoMark className="w-full h-full" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-rich-black dark:text-white-smoke">
                    Daero AI Assistant
                  </h3>
                  <p className="text-[11px] text-dim-gray dark:text-silver">
                    Virtual Studio Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Clear chat"
                  className="p-1.5 rounded-lg text-dim-gray hover:text-rich-black dark:text-silver dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 rounded-lg text-dim-gray hover:text-rich-black dark:text-silver dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={messagesContainerRef}
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto p-4 space-y-4 text-sm overscroll-contain chat-scroll lenis-prevent"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-dim-gray/10 dark:bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-rich-black dark:text-white-smoke p-1.5">
                      <LogoMark className="w-full h-full text-rich-black dark:text-white-smoke" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-accent-fg rounded-br-xs font-medium"
                        : "bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 text-rich-black dark:text-white-smoke rounded-tl-xs shadow-sm"
                    }`}
                  >
                    {renderFormattedText(msg.content)}

                    {msg.isDemo && (
                      <div className="mt-3 pt-2 border-t border-black/10 dark:border-white/10 text-xs text-dim-gray dark:text-silver">
                        💡 <em>Tip: I-configure ang AI API key sa <code className="bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">.env.local</code>.</em>
                      </div>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-accent text-accent-fg flex items-center justify-center shrink-0 mt-0.5">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-lg bg-dim-gray/10 dark:bg-white/10 flex items-center justify-center shrink-0 text-rich-black dark:text-white-smoke p-1.5">
                    <LogoMark className="w-full h-full text-rich-black dark:text-white-smoke" />
                  </div>
                  <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-accent/60 animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            {messages.length <= 2 && !isLoading && remainingPrompts > 0 && (
              <div className="px-4 pb-2 pt-1 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSend(sug)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-dim-gray/10 hover:bg-dim-gray/20 dark:bg-white/5 dark:hover:bg-white/10 text-dim-gray dark:text-silver hover:text-rich-black dark:hover:text-white transition-colors text-left"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            {/* Daily Limit Warning Banner */}
            {remainingPrompts <= 0 && (
              <div className="mx-3 mb-2 px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-dim-gray dark:text-silver text-xs flex items-center justify-between">
                <span>Daily limit reached (0/5 left). Resets tomorrow.</span>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="font-semibold text-accent underline ml-2 hover:opacity-80 shrink-0"
                >
                  Contact Us →
                </Link>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 border-t border-black/5 dark:border-white/10 bg-white/40 dark:bg-black/20">
              <div className="flex items-center gap-2 bg-white dark:bg-onyx/40 border border-black/10 dark:border-white/10 rounded-2xl px-3 py-1.5 shadow-inner">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    remainingPrompts <= 0
                      ? "Daily limit reached (0/5 left today)..."
                      : "Ask Daero AI anything..."
                  }
                  disabled={isLoading || remainingPrompts <= 0}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-rich-black dark:text-white-smoke placeholder:text-dim-gray dark:placeholder:text-silver/60 py-1.5 text-base sm:text-sm disabled:opacity-40"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading || remainingPrompts <= 0}
                  aria-label="Send message"
                  className="w-8 h-8 rounded-xl bg-accent text-accent-fg disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                >
                  <Send size={15} />
                </button>
              </div>

              <div className="flex justify-between items-center px-1 pt-2 text-[10px] text-dim-gray dark:text-silver/60">
                <span>Direct inquiry: <Link href="/contact" onClick={() => setIsOpen(false)} className="text-accent underline">/contact</Link></span>
                <span className={remainingPrompts <= 1 ? "text-amber-500 font-semibold" : ""}>
                  {remainingPrompts}/{DAILY_LIMIT} prompts left today
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
