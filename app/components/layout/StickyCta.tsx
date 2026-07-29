"use client";

import { MessageSquare, Sparkles } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";

export default function StickyCta({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-5 md:right-5">
      <MagneticButton
        as="button"
        onClick={onOpenQuiz}
        className="btn-gold shadow-[0_12px_32px_rgba(201,162,39,0.35)]"
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Begin</span>
      </MagneticButton>
      <a
        href="https://wa.me/919983169555"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 hover:scale-105"
        style={{ background: "var(--grad-emerald)" }}
        aria-label="WhatsApp"
      >
        <MessageSquare className="h-5 w-5" />
      </a>
    </div>
  );
}
