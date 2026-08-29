import type { TemplateProps } from "../types";
import MotionSection from "@/components/motion/MotionSection";

function getEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const id = parsed.hostname.includes("youtu.be") ? parsed.pathname.slice(1) : parsed.searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch { return null; }
}

export default function LiveStream({ invitation }: TemplateProps) {
  const url = invitation.live_stream_url?.trim();
  const title = invitation.live_stream_title?.trim() || "Live celebration";
  if (!url) return null;
  const embed = getEmbedUrl(url);
  return (
    <MotionSection>
      <section className="relative z-10 bg-[#171717] px-5 py-24 text-[#f7f4ee] sm:px-8 md:py-32"><div className="mx-auto max-w-4xl"><p className="text-center text-[10px] font-bold uppercase tracking-[0.42em] text-[#d6c1a3]">For those joining from afar</p><h2 className="mt-4 text-center font-serif text-5xl sm:text-6xl">{title}</h2><div className="mt-12 overflow-hidden border border-white/20 bg-black shadow-2xl">{embed ? <div className="aspect-video"><iframe src={embed} title={title} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div> : <div className="flex aspect-video items-center justify-center p-8 text-center"><a href={url} target="_blank" rel="noopener noreferrer" className="border border-[#d6c1a3] px-6 py-3 text-xs font-bold tracking-[0.16em] text-[#f7f4ee] transition hover:bg-[#f7f4ee] hover:text-[#171717]">WATCH THE LIVESTREAM ↗</a></div>}</div></div></section>
    </MotionSection>
  );
}
