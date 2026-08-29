"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { templateCatalog } from "@/components/TemplateGallery";

const AUTO_PLAY_INTERVAL = 5200;

export default function HeroTemplateCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeTemplate = templateCatalog[activeIndex];

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % templateCatalog.length);
    }, AUTO_PLAY_INTERVAL);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  function selectTemplate(index: number) {
    setActiveIndex((index + templateCatalog.length) % templateCatalog.length);
  }

  return (
    <div
      className="mx-auto w-full max-w-md"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative rounded-[3rem] bg-[#f7dfe1] p-3 shadow-[0_30px_70px_rgba(34,30,45,0.16)]">
        <div className="relative overflow-hidden rounded-[2.45rem] border-[9px] border-[#19243a] bg-[#19243a] shadow-2xl">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {templateCatalog.map((template) => (
              <Link
                href={`/templates/${template.id}`}
                key={template.id}
                className="relative flex aspect-[0.78] w-full shrink-0 flex-col justify-end overflow-hidden bg-cover bg-center p-7 text-white"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(12,19,32,0.04), rgba(12,19,32,0.9)), url('${template.image}')`,
                }}
                aria-label={`Open ${template.name} live demo`}
              >
                <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 text-[10px] font-bold tracking-[0.2em] text-white/75">
                  <span>AKSA</span>
                  <span>LIVE DEMO</span>
                </div>
                <div className="relative z-10">
                  <p className="text-xs uppercase tracking-[0.32em]" style={{ color: template.accent }}>
                    {template.label}
                  </p>
                  <h2 className="mt-3 font-serif text-5xl leading-none">{template.name}</h2>
                  <p className="mt-4 max-w-[18rem] text-xs leading-5 text-white/75">{template.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => selectTemplate(activeIndex - 1)}
            className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[#19243a]/55 text-white backdrop-blur transition hover:bg-[#19243a]/80"
            aria-label="Show previous template"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => selectTemplate(activeIndex + 1)}
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[#19243a]/55 text-white backdrop-blur transition hover:bg-[#19243a]/80"
            aria-label="Show next template"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label="Choose a template preview">
          {templateCatalog.map((template, index) => (
            <button
              type="button"
              key={template.id}
              onClick={() => selectTemplate(index)}
              className="group inline-flex items-center gap-2 rounded-full px-2 py-1"
              aria-label={`Show ${template.name}`}
              aria-selected={index === activeIndex}
              role="tab"
            >
              <span
                className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? "w-7 bg-[#19243a]" : "w-2 bg-[#19243a]/25 group-hover:bg-[#19243a]/45"}`}
              />
              <span className="sr-only">{template.name}</span>
            </button>
          ))}
        </div>
      </div>

      <Link
        href={`/templates/${activeTemplate.id}`}
        className="relative z-10 mx-auto -mt-5 flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-[#19243a] shadow-lg shadow-[#19243a]/10 transition hover:-translate-y-0.5"
      >
        <Play size={13} fill="currentColor" /> View {activeTemplate.name}
      </Link>
      <p className="mt-4 text-center text-xs font-medium text-[#657087]">Choose a design or let the gallery play.</p>
    </div>
  );
}
