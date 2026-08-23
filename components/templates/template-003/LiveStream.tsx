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
    "Live Streaming";

  const url = invitation.live_stream_url?.trim();

  if (!url) {
    return null;
  }

  const youtubeEmbedUrl = getYouTubeEmbedUrl(url);

  return (
    <MotionSection>
      <section className="relative z-10 overflow-hidden bg-[#DCEBD9] px-6 py-20 md:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-b-[50%] bg-[#FCF8ED]" />

        <div className="relative mx-auto max-w-4xl pt-12">
          <div className="mb-10 text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#6C8668]">
              Bersama Kami dari Jauh
            </p>

            <h2 className="font-serif text-4xl italic text-[#214D3C] md:text-5xl">
              {title}
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/70 bg-black shadow-[0_18px_45px_rgba(46,75,54,0.22)]">
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
              <div className="flex aspect-video items-center justify-center bg-[#214D3C] p-8 text-center">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#214D3C]"
                >
                  Buka Siaran Langsung
                </a>
              </div>
            )}
          </div>

          <p className="mx-auto mt-6 max-w-md text-center font-serif text-sm italic leading-7 text-[#527052]">
            Saksikan momen bahagia kami secara langsung melalui
            siaran ini.
          </p>
        </div>
      </section>
    </MotionSection>
  );
}