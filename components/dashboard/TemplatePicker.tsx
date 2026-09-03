"use client";

interface TemplatePickerProps {
  value: string;
  onChange: (templateId: string) => void;
}

const templates = [
  {
    id: "template-001",
    name: "Chinese Wedding",
    description: "Elegant Chinese wedding invitation.",
    available: true,
  },
  {
    id: "template-002",
    name: "Javanese Wedding",
    description: "Traditional Javanese wedding invitation.",
    available: true,
  },
  {
    id: "template-003",
    name: "Sundanese Wedding",
    description: "Traditional Sundanese wedding invitation.",
    available: true,
  },
  {
    id: "template-004",
    name: "Chinese Imperial",
    description:
      "Chinese wedding dengan panorama istana merah yang meriah.",
    available: true,
  },
  {
    id: "template-005",
    name: "The Edit",
    description: "Modern monochrome editorial wedding invitation.",
    available: true,
  },
  {
    id: "template-006",
    name: "Amalfi Afterglow",
    description: "Italian Riviera wedding dengan cobalt tiles, lemon, dan suasana golden hour.",
    available: true,
  },
  {
    id: "template-007",
    name: "Lisbon Letters",
    description: "Azulejo biru-putih dan arsitektur Lisbon untuk tampilan Eropa yang graphic-modern.",
    available: true,
  },
  { id: "template-008", name: "Château de Lune", description: "French château old-money dengan dusty blue, monogram, dan garden formal.", available: true },
  { id: "template-009", name: "Midnight Cinema", description: "Film-poster wedding dengan ticket stub, red velvet, dan suasana premiere malam.", available: true },
  { id: "template-010", name: "Atelier No. 27", description: "Fashion atelier dengan couture sketchbook, kartu editorial, dan suasana private dinner yang mewah.", available: true },
  { id: "template-011", name: "Underwater Vows", description: "Undangan laut dalam dengan navy–aqua, pearl, motion gelembung, dan suasana beach-resort yang elegan.", available: true },
  { id: "template-012", name: "The Grand Tour", description: "Travel journal Eropa dengan paspor, kartu pos, peta kereta, koper vintage, dan RSVP boarding pass.", available: true },
];

export default function TemplatePicker({
  value,
  onChange,
}: TemplatePickerProps) {
  return (
    <section className="mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-black">
          Pilih Template
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Pilih desain utama untuk undangan ini.
        </p>
      </div>

<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((template) => {
          const isSelected = value === template.id;

          if (!template.available) {
            return (
              <div
                key={template.id}
                className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 opacity-60"
              >
                <p className="text-lg font-semibold text-black">
                  {template.name}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {template.description}
                </p>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Segera hadir
                </p>
              </div>
            );
          }

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onChange(template.id)}
              className={`rounded-xl border p-5 text-left transition ${
                isSelected
                  ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <p className="text-lg font-semibold text-black">
                {template.name}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {template.description}
              </p>

              <p
                className={`mt-4 text-xs font-semibold uppercase tracking-wider ${
                  isSelected ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {isSelected ? "Dipilih" : "Pilih template"}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
