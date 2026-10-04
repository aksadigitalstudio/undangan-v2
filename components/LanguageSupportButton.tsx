"use client";

import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const whatsappNumber = "628133224919";

const languages = [
  { code: "en", label: "English", native: "English", default: true },
  { code: "id", label: "Bahasa Indonesia", native: "Indonesia" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "zh", label: "Chinese", native: "中文" },
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "nl", label: "Dutch", native: "Nederlands" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "es", label: "Spanish", native: "Español" },
];

function requestUrl(language: string) {
  const message = `Hello AKSA, I would like to discuss language customisation for my invitation in ${language}.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function LanguageSupportButton() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-1.5 rounded-full border border-[#18243a]/12 bg-white/75 px-3 py-2 text-xs font-bold text-[#334159] transition hover:border-[#ef655a]/40 hover:text-[#d95349]"
      >
        <Globe2 size={15} /> English <ChevronDown size={14} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+.6rem)] z-50 w-72 overflow-hidden rounded-2xl border border-[#18243a]/12 bg-[#fffdf9] p-2 shadow-[0_18px_48px_rgba(24,36,58,.18)]" role="menu">
          <div className="border-b border-[#18243a]/10 px-3 pb-3 pt-2">
            <p className="text-xs font-bold text-[#18243a]">Language support</p>
            <p className="mt-1 text-xs leading-5 text-[#687184]">Templates are presented in English. Request language customisation directly with AKSA Admin.</p>
          </div>
          <div className="max-h-72 overflow-y-auto py-1.5">
            {languages.map((language) => language.default ? (
              <div key={language.code} className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-[#18243a]">
                <span>{language.native}</span><span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#4c8463]"><Check size={13} /> Default</span>
              </div>
            ) : (
              <a key={language.code} href={requestUrl(language.label)} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-[#334159] transition hover:bg-[#fff0eb] hover:text-[#d95349]" role="menuitem">
                <span>{language.native}</span><span className="text-xs font-medium text-[#8a94a5]">Request</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
