import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

type TemplateCategory = "wedding" | "engagement" | "birthday" | "event";
type TemplateStatus = "live" | "brief";

export type TemplateCatalogItem = {
  id: string;
  name: string;
  label: string;
  description: string;
  accent: string;
  category: TemplateCategory;
  themeGroup: string;
  status: TemplateStatus;
  eventType: string;
  image?: string;
  background?: string;
};

const wedding = (id: string, name: string, label: string, description: string, image: string, accent: string, themeGroup: string): TemplateCatalogItem => ({ id, name, label, description, image, accent, category: "wedding", themeGroup, status: "live", eventType: "Wedding invitation" });
const brief = (id: string, name: string, label: string, description: string, accent: string, category: Exclude<TemplateCategory, "wedding">, themeGroup: string, eventType: string, background: string): TemplateCatalogItem => ({ id, name, label, description, accent, category, themeGroup, status: "brief", eventType, background });

export const templateCatalog: TemplateCatalogItem[] = [
  wedding("template-017", "Copenhagen Quiet", "New Release · Danish Modern", "Pale stone, walnut, and editorial grids for a quietly modern celebration.", "/template-demos/template-017/copenhagen-hero.webp", "#8c765d", "Modern & Editorial"),
  wedding("template-001", "Elegant Gold", "Classic · Refined", "Warm ivory and golden details for a celebration that feels timeless.", "/decor/elegant-gold/background/ivory-texture.optimized.webp", "#b58b36", "Classic & Cultural"),
  wedding("template-002", "Sekar Sogan", "Javanese · Warm", "Soft batik, florals, and graceful details rooted in tradition.", "/decor/sekar-sogan/background/sekar-sogan-background-v1.webp", "#9a633d", "Classic & Cultural"),
  wedding("template-003", "Puspa Priangan", "Botanical · Lush", "A vibrant botanical atmosphere with an intimate, romantic feel.", "/decor/puspa-priangan/background/puspa-priangan-wallpaper.webp", "#527052", "Classic & Cultural"),
  wedding("template-004", "Chinese Imperial", "Bold · Regal", "Red, gold, and dramatic ornament for a story with presence.", "/decor/chinese-imperial/background/chinese-imperial-opening-v2.webp", "#c18c3b", "Classic & Cultural"),
  wedding("template-005", "The Edit", "Editorial · Modern", "Monochrome photography and magazine-inspired composition for a black-tie celebration.", "/template-demos/template-005/gallery-1.webp", "#d6c1a3", "Modern & Editorial"),
  wedding("template-006", "Amalfi Afterglow", "Riviera · Joyful", "Cobalt tiles, lemon groves, and golden-hour romance for a destination celebration.", "/template-demos/template-006/amalfi-hero.webp", "#f5cc43", "Destination & Escape"),
  wedding("template-007", "Lisbon Letters", "Azulejo · Graphic", "Cobalt ceramic tiles and graphic Portuguese architecture for a modern European love story.", "/template-demos/template-007/lisbon-hero.webp", "#80b5e3", "Destination & Escape"),
  wedding("template-008", "Château de Lune", "French · Old Money", "Moonlit château romance in eggshell, dusty blue, and formal garden elegance.", "/template-demos/template-008/chateau-hero.webp", "#a9b8c8", "Classic & Cultural"),
  wedding("template-009", "Midnight Cinema", "Cinema · Premiere", "A film-poster invitation with red velvet romance and after-dark celebration.", "/template-demos/template-009/cinema-hero.webp", "#d1a55d", "After Dark"),
  wedding("template-010", "Atelier No. 27", "Couture · Editorial", "A fashion atelier invitation with sketchbook textures and a private-dinner finish.", "/template-demos/template-010/atelier-hero.webp", "#ad806a", "Modern & Editorial"),
  wedding("template-011", "Underwater Vows", "Ocean · Resort", "Aqua light, pearl details, and a serene shore-side celebration.", "/template-demos/template-011/underwater-hero.webp", "#7ce1e7", "Destination & Escape"),
  wedding("template-012", "The Grand Tour", "Travel · Destination", "A European travel journal with vintage luggage and a boarding-pass RSVP.", "/template-demos/template-012/grand-tour-hero.webp", "#a33d35", "Destination & Escape"),
  wedding("template-013", "Celestial Observatory", "Astronomy · Night", "A deep navy and silver star-map invitation for an unforgettable night.", "/template-demos/template-013/celestial-hero.webp", "#c6d8fc", "After Dark"),
  wedding("template-014", "Side A, Side B", "Music · Vinyl", "An indie vinyl invitation with album art and a concert-night finish.", "/template-demos/template-014/side-a-hero.webp", "#f4d8a4", "After Dark"),
  wedding("template-015", "Kintsugi Promise", "Ceramic · Intimate", "Clay, ivory, and gold seams for a quiet promise made more beautiful together.", "/template-demos/template-015/kintsugi-hero.webp", "#c99b45", "Modern & Editorial"),
  wedding("template-016", "Riad After Dark", "Marrakech · Nocturne", "Emerald zellige, terracotta, brass lanterns, and a candlelit courtyard.", "/template-demos/template-016/riad-hero.webp", "#c99c52", "After Dark"),
];

const engagement = "Engagement";
const birthday = "Birthday celebration";
const community = "Community / RT-RW event";
const gathering = "Family gathering";
const other = "Other";
const tribute = "Celebration of life";

const occasionTemplateCatalog: TemplateCatalogItem[] = [
  { ...brief("template-018", "Petal & Promise", "Garden · Soft Romance", "Ivory paper, peony pink, and a sunlit garden for a gentle yes.", "#d87b7d", "engagement", "Garden Romance", engagement, "linear-gradient(135deg,#fff9f2,#f8cfca 52%,#d77e7f)"), status: "live", image: "/template-demos/engagement-petal-promise/hero.png" },
  brief("engagement-golden-hour", "Golden Hour Letters", "Sunset · Editorial", "Amber light, handwritten notes, and a warm story-led announcement.", "#b56e32", "engagement", "Garden Romance", engagement, "linear-gradient(135deg,#fff1d4,#e5a15d 55%,#9b4e39)"),
  brief("engagement-moonlit", "Moonlit Botanical", "Night Garden · Intimate", "Inky blue, silver leaves, and quiet details for an evening reveal.", "#cbd9e9", "engagement", "Garden Romance", engagement, "linear-gradient(135deg,#101d35,#30496d 52%,#c8d7dc)"),
  brief("engagement-tea-ceremony", "Tea Ceremony", "Heritage · Refined", "Porcelain, vermilion, and gold accents for a meaningful family celebration.", "#d9a441", "engagement", "Heritage & Family", engagement, "linear-gradient(135deg,#5e1220,#b83a35 52%,#dcae4a)"),
  brief("engagement-saffron-silk", "Saffron Silk", "Heritage · Celebration", "Saffron, rose, and patterned silk for a bright and generous gathering.", "#ffd07c", "engagement", "Heritage & Family", engagement, "linear-gradient(135deg,#8f3032,#d3724b 50%,#f5c26b)"),
  brief("engagement-modern-heirloom", "Modern Heirloom", "Minimal · Family", "Stone, pearl, and restrained serif type for a timeless introduction.", "#93856f", "engagement", "Heritage & Family", engagement, "linear-gradient(135deg,#f3eee4,#cfc5b7 54%,#817564)"),
  brief("engagement-proposal-journal", "The Proposal Journal", "Journal · Personal", "Little photographs, folded notes, and a keepsake-style announcement.", "#75806c", "engagement", "Contemporary Keepsakes", engagement, "linear-gradient(135deg,#e8e0cd,#abb6a1 52%,#64725c)"),
  brief("engagement-pearl-champagne", "Pearl & Champagne", "Champagne · Evening", "Pearl sheen and brushed brass for an elegant intimate dinner.", "#c79d50", "engagement", "Contemporary Keepsakes", engagement, "linear-gradient(135deg,#fcf8ef,#e5c986 53%,#9d7437)"),
  brief("engagement-azure-courtyard", "Azure Courtyard", "Mediterranean · Joyful", "Ceramic blue, citrus, and a courtyard mood for an effortless yes.", "#1e6393", "engagement", "Contemporary Keepsakes", engagement, "linear-gradient(135deg,#e8f1ef,#75b5d0 52%,#215c8e)"),
  brief("engagement-studio-no-1", "Studio No. 1", "Monochrome · Modern", "Gallery white, charcoal type, and a striking modern-couple introduction.", "#ffffff", "engagement", "Contemporary Keepsakes", engagement, "linear-gradient(135deg,#f0ede6,#89909a 48%,#182235)"),

  { ...brief("template-019", "Tiny Star", "Kids · Dreamy", "Soft cloud blue, little stars, and joyful details for a first celebration.", "#fff4c6", "birthday", "Kids & Family", birthday, "linear-gradient(135deg,#dcecf6,#9ec8e8 54%,#5176aa)"), status: "live", image: "/template-demos/birthday-tiny-star/hero.png" },
  brief("birthday-blooming-one", "Blooming One", "Kids · Garden", "Buttercream, playful florals, and a sweet garden-party invitation.", "#f7d37e", "birthday", "Kids & Family", birthday, "linear-gradient(135deg,#fff8dc,#f5c4b2 54%,#cf7b75)"),
  brief("birthday-little-explorer", "Little Explorer", "Kids · Adventure", "Forest green, hand-drawn maps, and a birthday expedition worth joining.", "#e8c069", "birthday", "Kids & Family", birthday, "linear-gradient(135deg,#d9e2b3,#668b70 55%,#294d44)"),
  brief("birthday-tea-party", "Tea Party", "Afternoon · Whimsical", "Porcelain, strawberry pink, and a charming invitation for a lovely afternoon.", "#c86878", "birthday", "Kids & Family", birthday, "linear-gradient(135deg,#fff6ee,#e6b7bc 55%,#ba6076)"),
  brief("birthday-midnight-21", "Midnight 21", "Milestone · After Dark", "Black lacquer, chrome, and a confident birthday night with presence.", "#eac276", "birthday", "Milestone & Evening", birthday, "linear-gradient(135deg,#10131d,#333a4b 54%,#b58d53)"),
  brief("birthday-golden-year", "Golden Year", "Milestone · Elegant", "Warm champagne and rich ivory for a birthday that honours a full life.", "#b78d43", "birthday", "Milestone & Evening", birthday, "linear-gradient(135deg,#fff8e8,#d9b466 52%,#957046)"),
  brief("birthday-disco-atelier", "Disco Atelier", "Party · Electric", "Electric violet, chrome, and a playful late-night party statement.", "#f2bcff", "birthday", "Milestone & Evening", birthday, "linear-gradient(135deg,#27135c,#8450be 48%,#f0a4df)"),
  brief("birthday-confetti-club", "Confetti Club", "Party · Pop", "Citrus colour, bold typography, and a celebratory invitation made to move.", "#fff2a5", "birthday", "Social & Modern", birthday, "linear-gradient(135deg,#f76058,#f3a945 51%,#ffd776)"),
  brief("birthday-garden-picnic", "Garden Picnic", "Daylight · Relaxed", "Picnic gingham, spring green, and an easy outdoor gathering.", "#fff4c7", "birthday", "Social & Modern", birthday, "linear-gradient(135deg,#f8f0ca,#a6bf78 53%,#54754f)"),
  brief("birthday-dinner-list", "The Dinner List", "Dinner · Editorial", "Oyster white, plum, and a refined invitation for a table of favourites.", "#e7cedd", "birthday", "Social & Modern", birthday, "linear-gradient(135deg,#f2eee8,#a77a96 52%,#543244)"),

  brief("event-table-meeting", "The Table Meeting", "Community · Clear", "Warm neutrals and clear information hierarchy for RT/RW and family meetings.", "#d9a65e", "event", "Community & Formal", community, "linear-gradient(135deg,#f7f0e4,#c8aa7d 52%,#66534b)"),
  brief("event-open-house", "Open House", "Gathering · Welcome", "A bright, generous direction for open homes, reunions, and shared tables.", "#fff4ce", "event", "Community & Formal", gathering, "linear-gradient(135deg,#fcebc2,#e9a768 52%,#b85d45)"),
  brief("event-community-lanterns", "Community Lanterns", "Community · Warm", "Indigo, lantern light, and a warm invitation for neighbourhood evenings.", "#f6c66b", "event", "Community & Formal", community, "linear-gradient(135deg,#101d3d,#314873 52%,#d79646)"),
  brief("event-celebration-of-life", "Celebration of Life", "Tribute · Gentle", "Quiet botanical tones and measured typography for a dignified remembrance.", "#e2dcc4", "event", "Community & Formal", tribute, "linear-gradient(135deg,#e8e5d8,#aeb8a7 52%,#5e6c64)"),
  { ...brief("template-020", "Studio Session", "Creative · Modern", "A crisp, creative announcement for workshops, launches, and studio gatherings.", "#f4c85e", "event", "Creative & Business", other, "linear-gradient(135deg,#19243a,#425878 52%,#e6ad52)"), status: "live", image: "/template-demos/event-studio-session/hero.png" },
  brief("event-product-salon", "Product Salon", "Brand · Premium", "Soft stone, muted rose, and a polished RSVP invitation for product experiences.", "#e3b5a2", "event", "Creative & Business", other, "linear-gradient(135deg,#f3e9df,#d2a594 52%,#81606a)"),
  brief("event-anniversary-soiree", "Anniversary Soirée", "Formal · Evening", "Ink, gold, and beautiful restraint for an organisation’s landmark night.", "#e7bf6b", "event", "Creative & Business", other, "linear-gradient(135deg,#0b1429,#293962 50%,#c89a47)"),
  brief("event-giving-table", "The Giving Table", "Purpose · Dinner", "Formal warmth and transparent information for a meaningful fundraising evening.", "#f0c883", "event", "Creative & Business", other, "linear-gradient(135deg,#342b2a,#806454 50%,#e0ba72)"),
  brief("event-graduation-day", "Graduation Day", "Academic · Joyful", "Deep blue, parchment, and a proud shared moment for graduates and families.", "#d4b35c", "event", "Seasonal & Gatherings", other, "linear-gradient(135deg,#102653,#3a6090 50%,#d5b46a)"),
  brief("event-eid-gathering", "Eid Gathering", "Seasonal · Graceful", "Emerald, moonlight, and warm hospitality for a graceful open-house celebration.", "#e5bd65", "event", "Seasonal & Gatherings", gathering, "linear-gradient(135deg,#063d38,#197262 50%,#d4a84e)"),
];

export const allTemplateCatalog = [...templateCatalog, ...occasionTemplateCatalog];

const categories: Array<{ id: TemplateCategory; eyebrow: string; title: string; description: string }> = [
  { id: "wedding", eyebrow: "Live wedding demos", title: "Wedding invitations", description: "17 live designs, each ready to explore from cover to RSVP." },
  { id: "engagement", eyebrow: "1 live demo · 9 directions", title: "Engagement invitations", description: "A considered first announcement, from heritage rituals to intimate modern stories." },
  { id: "birthday", eyebrow: "1 live demo · 9 directions", title: "Birthday invitations", description: "Designs for tiny firsts, full rooms, landmark years, and every beautiful in-between." },
  { id: "event", eyebrow: "1 live demo · 9 directions", title: "Event invitations", description: "Purpose-led invitations for communities, brands, gatherings, tributes, and shared moments." },
];

function templateHref(template: TemplateCatalogItem) {
  if (template.status === "live") return `/templates/${template.id}`;
  return `/order?eventType=${encodeURIComponent(template.eventType)}&template=${encodeURIComponent(template.id)}`;
}

export default function TemplateGallery() {
  return <section id="templates" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c94d43]">Find your feeling</p><h2 className="mt-4 font-serif text-5xl leading-none tracking-[-0.03em] text-[#182235] sm:text-6xl">Every occasion,<br /><span className="text-[#9aa2ad]">beautifully considered.</span></h2></div><nav aria-label="Template categories" className="flex flex-wrap gap-2 text-xs font-bold"><a href="#wedding" className="rounded-full border border-[#182235]/10 px-3 py-2 hover:border-[#c94d43] hover:text-[#c94d43]">Wedding</a><a href="#engagement" className="rounded-full border border-[#182235]/10 px-3 py-2 hover:border-[#c94d43] hover:text-[#c94d43]">Engagement</a><a href="#birthday" className="rounded-full border border-[#182235]/10 px-3 py-2 hover:border-[#c94d43] hover:text-[#c94d43]">Birthday</a><a href="#event" className="rounded-full border border-[#182235]/10 px-3 py-2 hover:border-[#c94d43] hover:text-[#c94d43]">Event</a></nav></div><div className="mt-16 space-y-24">{categories.map((category) => { const items = allTemplateCatalog.filter((template) => template.category === category.id); const groups = [...new Set(items.map((template) => template.themeGroup))]; return <section key={category.id} id={category.id} className="scroll-mt-8"><div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#c94d43]">{category.eyebrow}</p><h3 className="mt-3 font-serif text-4xl tracking-[-0.03em] text-[#182235] sm:text-5xl">{category.title}</h3><p className="mt-3 text-sm leading-6 text-[#687184] sm:text-base">{category.description}</p></div><div className="mt-10 space-y-12">{groups.map((group) => <div key={group}><div className="mb-4 flex items-center gap-3"><span className="h-px w-8 bg-[#c94d43]" /><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#59657a]">{group}</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.filter((template) => template.themeGroup === group).map((template) => <Link href={templateHref(template)} key={template.id} className="group block"><div className="relative min-h-[23rem] overflow-hidden rounded-[1.5rem] bg-[#182235] shadow-lg shadow-[#182235]/10"><div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={template.image ? { backgroundImage: `linear-gradient(180deg, rgba(14,22,36,0.02) 20%, rgba(14,22,36,0.85) 100%), url('${template.image}')` } : { background: template.background }} /><div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_16%,rgba(255,255,255,.2),transparent_24%)]" /><div className="absolute inset-x-0 bottom-0 p-5 text-white"><p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: template.accent }}>{template.label}</p><h4 className="mt-2 font-serif text-2xl">{template.name}</h4><p className="mt-2 text-xs leading-5 text-white/70">{template.description}</p><p className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">{template.status === "live" ? "View live demo" : <><Sparkles size={12} /> Request this theme</>} <ArrowUpRight size={13} /></p></div><span className="absolute right-4 top-4 rounded-full bg-white/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/90 backdrop-blur">{template.status === "live" ? "Live" : "Brief"}</span></div></Link>)}</div></div>)}</div></section>; })}</div></section>;
}
