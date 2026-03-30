"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const TICK = 35; // ms per character flip
const STAGGER = 30; // ms delay between each character settling

interface SplitFlapTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span";
  /** Accent color class applied to the last line (when text has \n) */
  accentClass?: string;
}

export default function SplitFlapText({
  children,
  className = "",
  as: Tag = "h2",
  accentClass,
}: SplitFlapTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(children);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const target = children;
    const len = target.length;
    const settled = new Array<boolean>(len).fill(false);
    const current = target.split("").map((ch) =>
      ch === " " || ch === "\n" ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
    );

    // Start cycling all unsettled characters
    const cycleId = setInterval(() => {
      for (let i = 0; i < len; i++) {
        if (!settled[i] && target[i] !== " " && target[i] !== "\n") {
          current[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(current.join(""));
    }, TICK);

    // Settle characters one by one from left to right
    const timers: ReturnType<typeof setTimeout>[] = [];
    let charIdx = 0;
    for (let i = 0; i < len; i++) {
      if (target[i] === " " || target[i] === "\n") {
        settled[i] = true;
        continue;
      }
      timers.push(
        setTimeout(() => {
          settled[i] = true;
          current[i] = target[i];
          setDisplay(current.join(""));

          // When all settled, stop cycling
          if (settled.every(Boolean)) {
            clearInterval(cycleId);
          }
        }, 200 + charIdx * STAGGER)
      );
      charIdx++;
    }

    return () => {
      clearInterval(cycleId);
      timers.forEach(clearTimeout);
    };
  }, [inView, children]);

  // Render each character individually for the scramble effect
  const chars = display.split("");
  const targetChars = children.split("");

  return (
    // @ts-expect-error — dynamic tag
    <Tag ref={ref} className={className}>
      {chars.map((ch, i) => {
        if (ch === "\n") {
          // Check if this is the start of an accent line
          const rest = chars.slice(i + 1).join("");
          if (accentClass && display.indexOf("\n") === i) {
            return (
              <span key={i}>
                <br />
                <span className={accentClass}>
                  {chars.slice(i + 1).map((c2, j) => {
                    const gi = i + 1 + j;
                    const isSettled = c2 === targetChars[gi];
                    return (
                      <span
                        key={gi}
                        style={{
                          display: "inline-block",
                          opacity: isSettled ? 1 : 0.5,
                          transition: "opacity 0.1s",
                        }}
                      >
                        {c2}
                      </span>
                    );
                  })}
                </span>
              </span>
            );
          }
          return <br key={i} />;
        }

        // Skip chars after \n if accent already rendered them
        if (accentClass && display.indexOf("\n") !== -1) {
          const nlIdx = display.indexOf("\n");
          if (i > nlIdx) return null;
        }

        const isSettled = ch === targetChars[i];
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: isSettled ? 1 : 0.5,
              transition: "opacity 0.1s",
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        );
      })}
    </Tag>
  );
}
