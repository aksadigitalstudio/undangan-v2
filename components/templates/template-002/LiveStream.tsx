import type { TemplateProps } from "../types";
import MotionSection from "@/components/motion/MotionSection";

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.replace("/", "");

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;
    }

    if (parsedUrl.hostname.includes("youtube.com")) {
      const videoId =
        parsedUrl.searchParams.get("v") ||
        parsedUrl.pathname.split("/").filter(Boolean).pop();

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;
    }

    return null;
  } catch {
    return null;
  }
}

export default function LiveStream({
  invitation,
}: TemplateProps) {
  const title =
    invitation.live_stream_title?.trim() ||
    "Siaran Langsung";

  const url = invitation.live_stream_url?.trim();

  if (!url) {
    return null;
  }

  const youtubeEmbedUrl = getYouTubeEmbedUrl(url);

  return (
    <MotionSection>
      <section className="relative z-10 overflow-hidden px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-12 max-w-3xl rounded-[28px] border border-[#D5B477]/25 bg-[#21170F]/75 px-6 py-9 text-center shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-sm md:px-10">
            <p className="text-[10px] uppercase tracking-[0.55em] text-[#E2B968]">
              Bersama Kami dari Jauh
            </p>

            <div className="mx-auto my-5 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-[#D5A54D]/70" />
              <span className="text-[#E2B968]">✦</span>
              <div className="h-px w-12 bg-[#D5A54D]/70" />
            </div>

            <h2 className="font-serif text-4xl text-[#FFF6E5] md:text-5xl">
              {title}
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#F3DEC0]/85">
              Saksikan momen bahagia kami secara langsung
              dari mana pun Anda berada.
            </p>
          </div>

          <div className="rounded-[32px] border border-[#D5B477]/60 bg-[#FFF8EA]/95 p-3 shadow-[0_18px_42px_rgba(78,48,24,0.20)] md:p-4">
            <div className="overflow-hidden rounded-[24px] bg-[#21170F]">
              {youtubeEmbedUrl ? (
                <div className="aspect-video">
                  <iframe
                    src={youtubeEmbedUrl}
                    title={title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="flex aspect-video flex-col items-center justify-center p-8 text-center">
                  <p className="font-serif text-2xl text-[#FFF6E5]">
                    Saksikan Perayaan Kami
                  </p>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-[#F3DEC0]/80">
                    Buka tautan berikut untuk bergabung dalam
                    siaran langsung pernikahan kami.
                  </p>

                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 rounded-full border border-[#D5B477]/60 bg-[#C08A3E] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFF8EA] shadow-lg transition hover:scale-105 hover:bg-[#A97432]"
                  >
                    Buka Siaran Langsung
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-[#C69A52]/60" />
            <span className="text-[#9A6A42]">❋</span>
            <div className="h-px w-16 bg-[#C69A52]/60" />
          </div>
        </div>
      </section>
    </MotionSection>
  );
}