"use client";

import { Check, LayoutTemplate } from "lucide-react";
import { templateCatalog } from "@/components/TemplateGallery";

interface TemplatePickerProps {
  value: string;
  onChange: (templateId: string) => void;
}

export default function TemplatePicker({
  value,
  onChange,
}: TemplatePickerProps) {
  const themeGroups = Array.from(
    new Set(templateCatalog.map((template) => template.themeGroup)),
  );

  return (
    <section className="border-t border-[#182235]/10 pt-8">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 text-[#c94d43]">
          <LayoutTemplate size={16} />
          <p className="text-xs font-bold uppercase tracking-[0.2em]">
            Koleksi AKSA
          </p>
        </div>
        <h2 className="mt-3 font-serif text-3xl tracking-[-0.02em] text-[#182235]">
          Pilih template undangan
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#687184]">
          Semua desain wedding AKSA tersedia di sini. Pilih satu desain untuk
          mulai, dan Anda masih dapat mengubahnya sebelum undangan dipublikasikan.
        </p>
      </div>

      <div className="mt-7 space-y-8">
        {themeGroups.map((group) => {
          const templates = templateCatalog.filter(
            (template) => template.themeGroup === group,
          );

          return (
            <div key={group}>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-7 bg-[#c94d43]" />
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#52627a]">
                  {group}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {templates.map((template) => {
                  const isSelected = value === template.id;
                  const coverStyle = template.image
                    ? {
                        backgroundImage: `linear-gradient(180deg, rgba(13,24,42,0.04), rgba(13,24,42,0.34)), url('${template.image}')`,
                      }
                    : { background: template.background };

                  return (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => onChange(template.id)}
                      aria-pressed={isSelected}
                      className={`group relative overflow-hidden rounded-2xl border text-left shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c94d43] focus-visible:ring-offset-2 ${
                        isSelected
                          ? "border-[#182235] bg-[#f8fafc] ring-1 ring-[#182235]/20"
                          : "border-[#182235]/10 bg-white hover:-translate-y-0.5 hover:border-[#c94d43]/50 hover:shadow-md"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="block h-28 bg-[#182235] bg-cover bg-center sm:h-32"
                        style={coverStyle}
                      />
                      <span className="block p-4">
                        <span
                          className="block text-[10px] font-bold uppercase tracking-[0.16em]"
                          style={{ color: template.accent }}
                        >
                          {template.label}
                        </span>
                        <span className="mt-1.5 block font-serif text-xl leading-6 text-[#182235]">
                          {template.name}
                        </span>
                        <span className="mt-2 block min-h-10 text-xs leading-5 text-[#687184]">
                          {template.description}
                        </span>
                        <span
                          className={`mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
                            isSelected ? "text-[#c94d43]" : "text-[#687184]"
                          }`}
                        >
                          {isSelected && <Check size={13} strokeWidth={3} />}
                          {isSelected ? "Template dipilih" : "Pilih template"}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
