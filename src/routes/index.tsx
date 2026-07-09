import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vayrix — Move smarter" },
      { name: "description", content: "Vayrix premium ride-hailing app." },
    ],
  }),
  component: Splash,
});

const DURATION_MS = 2600;

function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const startTime = useRef(Date.now());
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const p = Math.min(elapsed / DURATION_MS, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        navigate({ to: "/auth" });
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [navigate]);

  const pct = Math.round(progress * 100);

  return (
    <PhoneFrame>
      <div
        className="relative h-full min-h-screen sm:min-h-[860px] flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#0A0E27" }}
      >
        {/* Ambient background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(59,107,255,0.18) 0%, rgba(123,92,255,0.12) 40%, transparent 70%)",
          }}
        />

        <div className="relative flex flex-col items-center gap-8 w-full px-6">
          {/* Floating logo — no visible box, blends into background */}
          <div className="animate-logo-glow-float flex items-center justify-center">
            {/* Ambient radial glow — same tint as bg so no edge visible */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 240,
                height: 240,
                background:
                  "radial-gradient(circle, rgba(123,92,255,0.28) 0%, rgba(59,107,255,0.15) 40%, transparent 70%)",
                filter: "blur(24px)",
              }}
            />
            {/* Logo tile */}
            <div
              className="relative rounded-3xl flex items-center justify-center"
              style={{
                width: 120,
                height: 120,
                background: "linear-gradient(135deg, #3B6BFF 0%, #7B5CFF 100%)",
                boxShadow:
                  "0 0 0 1px rgba(123,92,255,0.3), 0 8px 40px -8px rgba(123,92,255,0.7), 0 2px 12px rgba(59,107,255,0.5)",
              }}
            >
              {/* Inner shine */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%)",
                }}
              />
              <svg viewBox="0 0 32 32" width={66} height={66} fill="none">
                <path
                  d="M6 6 L16 26 L26 6"
                  stroke="white"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="16" cy="9" r="1.8" fill="white" />
              </svg>
            </div>
          </div>

          {/* App name */}
          <div className="text-center animate-float-up [animation-delay:100ms]">
            <h1 className="text-4xl font-bold tracking-tight text-gradient-primary">Vayrix</h1>
            <p className="mt-1.5 text-xs text-[#B8BED6] tracking-widest uppercase">
              Move smarter
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full px-2 animate-float-up [animation-delay:300ms]">
            {/* Labels */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-widest text-[#B8BED6] font-medium">
                Vérification
              </span>
              <span
                className="text-sm font-bold tabular-nums"
                style={{
                  background: "linear-gradient(135deg, #3B6BFF 0%, #7B5CFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {pct}%
              </span>
            </div>

            {/* Track */}
            <div
              className="relative h-3 rounded-full"
              style={{
                background: "rgba(255,255,255,0.07)",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4)",
              }}
            >
              {/* Fill */}
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-150 ease-out"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #3B6BFF 0%, #7B5CFF 100%)",
                  boxShadow:
                    "0 0 10px 2px rgba(123,92,255,0.6), 0 0 3px 1px rgba(59,107,255,0.8)",
                }}
              />

              {/* Moving Vayrix V icon */}
              <div
                className="absolute top-1/2 z-10 transition-all duration-150 ease-out"
                style={{
                  left: `${pct}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className="animate-neon-pulse rounded-full flex items-center justify-center"
                  style={{
                    width: 28,
                    height: 28,
                    background: "linear-gradient(135deg, #3B6BFF 0%, #7B5CFF 100%)",
                    boxShadow: "0 0 12px 3px rgba(123,92,255,0.8)",
                  }}
                >
                  <svg viewBox="0 0 32 32" width={14} height={14} fill="none">
                    <path
                      d="M6 6 L16 26 L26 6"
                      stroke="white"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="16" cy="9" r="1.8" fill="white" />
                  </svg>
                </div>
              </div>

              {/* Client waiting icon at end */}
              <div
                className="absolute top-1/2 right-0 z-10"
                style={{ transform: "translate(50%, -50%)" }}
              >
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 28,
                    height: 28,
                    background: "rgba(123,92,255,0.15)",
                    border: "1.5px solid rgba(123,92,255,0.5)",
                  }}
                >
                  <svg viewBox="0 0 32 32" width={16} height={16} fill="none">
                    <circle cx="16" cy="8" r="4" fill="white" opacity="0.9" />
                    <path
                      d="M8 28 C8 20 24 20 24 28"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.9"
                    />
                    <circle cx="24" cy="10" r="5" fill="none" stroke="#7B5CFF" strokeWidth="1.8" />
                    <path
                      d="M24 7.5 L24 10 L26 11.5"
                      stroke="#7B5CFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
