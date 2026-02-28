"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const slides = [
  {
    id: 1,
    badge: "Welcome",
    title: "Meet Your AI Learning Companions",
    description:
      "A new way to learn — powered by AI companions that adapt to your style, pace, and interests. Whether you're studying science, history, or coding, there's a companion for you.",
    icon: "🎓",
    visual: (
      <div className="relative flex items-center justify-center w-full h-52">
        <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-[#2947db]/30 via-[#7c3aed]/30 to-[#06b6d4]/30 animate-pulse" />
        <div className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-[#7c3aed]/40 to-[#10b981]/40 animate-pulse delay-150" />
        <span className="text-7xl z-10">🤖</span>
      </div>
    ),
  },
  {
    id: 2,
    badge: "Step 1",
    title: "Browse or Create a Companion",
    description:
      "Explore popular companions built by the community, or create your own from scratch. Pick a subject, set the tone, and choose a voice that fits your learning needs.",
    icon: "🧩",
    visual: (
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs mx-auto">
        {[
          { icon: "🔬", label: "Science", color: "from-cyan-500/20 to-blue-500/20" },
          { icon: "📐", label: "Maths", color: "from-purple-500/20 to-pink-500/20" },
          { icon: "💻", label: "Coding", color: "from-green-500/20 to-emerald-500/20" },
          { icon: "📚", label: "History", color: "from-amber-500/20 to-orange-500/20" },
          { icon: "🌍", label: "Language", color: "from-blue-500/20 to-indigo-500/20" },
          { icon: "📊", label: "Economics", color: "from-rose-500/20 to-red-500/20" },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gradient-to-br ${item.color} border border-white/10 dark:border-white/5`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs font-medium text-foreground/80">{item.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 3,
    badge: "Step 2",
    title: "Have a Real Conversation",
    description:
      "Talk to your companion using your voice — just like a real tutor. Ask questions, discuss topics, and get instant feedback tailored to your level.",
    icon: "🎙️",
    visual: (
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="flex items-end gap-3 w-full max-w-xs">
          <div className="flex-1 bg-accent/10 border border-accent/20 rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-foreground/80">
            Can you explain quantum entanglement simply?
          </div>
        </div>
        <div className="flex items-end gap-3 w-full max-w-xs flex-row-reverse">
          <div className="flex-1 bg-gradient-to-r from-[#2947db]/15 via-[#7c3aed]/15 to-[#06b6d4]/15 border border-[#7c3aed]/20 rounded-2xl rounded-br-sm px-4 py-3 text-sm text-foreground/80">
            Think of it like two magic coins — no matter how far apart, when one flips heads, the other instantly flips
            tails! 🪙✨
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">Voice active</span>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    badge: "Step 3",
    title: "Track Your Learning Journey",
    description:
      "Every session is saved so you can revisit lessons, see your progress, and pick up right where you left off. Your personal learning timeline awaits.",
    icon: "📈",
    visual: (
      <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
        {[
          { subject: "Physics", sessions: 12, color: "bg-[#06b6d4]" },
          { subject: "Mathematics", sessions: 8, color: "bg-[#7c3aed]" },
          { subject: "History", sessions: 5, color: "bg-[#10b981]" },
        ].map((item) => (
          <div key={item.subject} className="flex items-center gap-3">
            <span className="text-sm font-medium w-24 text-foreground/80">{item.subject}</span>
            <div className="flex-1 h-3 bg-secondary/50 rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                style={{ width: `${(item.sessions / 12) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-8">{item.sessions}h</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 5,
    badge: "Ready?",
    title: "Start Learning Today",
    description:
      "Join a smarter way of learning. Create your free account and start exploring AI companions that make studying fun, personal, and effective.",
    icon: "🚀",
    visual: (
      <div className="relative flex items-center justify-center w-full h-44">
        <div className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-[#2947db]/20 via-[#7c3aed]/20 to-[#10b981]/20 animate-pulse" />
        <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-[#06b6d4]/25 to-[#7c3aed]/25 animate-pulse delay-200" />
        <span className="text-6xl z-10">🚀</span>
      </div>
    ),
  },
];

export default function WelcomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);

  const completeOnboarding = useCallback(() => {
    document.cookie = "onboarded=true; path=/; max-age=31536000"; // 1 year
    router.push("/sign-in");
  }, [router]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentSlide) return;
      setDirection(index > currentSlide ? "next" : "prev");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, 300);
    },
    [currentSlide, isAnimating],
  );

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Touch/swipe support
  const touchStartX = React.useRef<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(delta) > 50) {
        if (delta < 0) nextSlide();
        else prevSlide();
      }
      touchStartX.current = null;
    },
    [nextSlide, prevSlide],
  );

  const isLastSlide = currentSlide === slides.length - 1;
  const slide = slides[currentSlide];

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#2947db]/10 to-[#7c3aed]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#06b6d4]/10 to-[#10b981]/10 blur-3xl" />
      </div>

      {/* Top Bar */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 flex items-center gap-4">
        <ThemeToggle />
        <button
          onClick={completeOnboarding}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
        >
          Skip →
        </button>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-lg">
        <div
          className={`bg-card/80 dark:bg-card/60 backdrop-blur-xl border border-border/50 rounded-3xl p-8 sm:p-10 shadow-2xl dark:shadow-none transition-all duration-300 ${
            isAnimating
              ? direction === "next"
                ? "opacity-0 translate-x-8"
                : "opacity-0 -translate-x-8"
              : "opacity-100 translate-x-0"
          }`}
        >
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="bg-gradient-to-r from-[#2947db] via-[#7c3aed] to-[#06b6d4] text-white rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">
              {slide.badge}
            </span>
          </div>

          {/* Visual */}
          <div className="mb-8">{slide.visual}</div>

          {/* Title */}
          <h1 className="!text-2xl sm:!text-3xl font-bold text-center mb-4 bg-gradient-to-r from-[#2947db] via-[#7c3aed] to-[#10b981] bg-clip-text text-transparent leading-tight">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-muted-foreground text-center text-sm sm:text-base leading-relaxed mb-8">
            {slide.description}
          </p>

          {/* Progress Dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "w-8 h-2.5 bg-gradient-to-r from-[#2947db] to-[#7c3aed]"
                    : "w-2.5 h-2.5 bg-secondary hover:bg-muted-foreground/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            {currentSlide > 0 && (
              <button
                onClick={prevSlide}
                className="flex-1 py-3 px-6 rounded-xl border border-border hover:bg-secondary/50 text-foreground font-semibold transition-all duration-200 text-sm"
              >
                Back
              </button>
            )}

            {isLastSlide ? (
              <button
                onClick={completeOnboarding}
                className={`${currentSlide > 0 ? "flex-1" : "w-full"} py-3 px-6 rounded-xl bg-gradient-to-r from-[#2947db] via-[#7c3aed] to-[#06b6d4] text-white font-semibold hover:shadow-lg hover:shadow-[#2947db]/30 transition-all duration-200 hover:scale-[1.02] text-sm flex items-center justify-center gap-2`}
              >
                Get Started
                <span>→</span>
              </button>
            ) : (
              <button
                onClick={nextSlide}
                className={`${
                  currentSlide > 0 ? "flex-1" : "w-full"
                } py-3 px-6 rounded-xl bg-gradient-to-r from-[#2947db] via-[#7c3aed] to-[#06b6d4] text-white font-semibold hover:shadow-lg hover:shadow-[#2947db]/30 transition-all duration-200 hover:scale-[1.02] text-sm`}
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Slide Counter */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          {currentSlide + 1} of {slides.length}
        </p>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className="absolute bottom-6 text-xs text-muted-foreground/50 hidden sm:flex items-center gap-4">
        <span>Use arrow keys to navigate</span>
      </div>

      {/* Keyboard handler */}
      <KeyboardHandler onNext={nextSlide} onPrev={prevSlide} />
    </div>
  );
}

function KeyboardHandler({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        onNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev]);

  return null;
}
