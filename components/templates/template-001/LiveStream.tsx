import type { TemplateProps } from "../types";
import MotionSection from "@/components/motion/MotionSection";
import { themes } from "@/lib/themes";

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

  const currentTheme =
    themes[invitation.theme as keyof typeof themes] ??
    themes["elegant-gold"];

  if (!url) {
    return null;
  }

  const youtubeEmbedUrl = getYouTubeEmbedUrl(url);

  return (
    <MotionSection>
      <section
        className="relative z-10 overflow-hidden px-6 py-24 md:py-32"
        style={{ background: currentTheme.background }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${currentTheme.divider}55 0%, transparent 42%)`,
          }}
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.55em]"
              style={{ color: currentTheme.accent }}
            >
              Celebrate With Us
            </p>

            <div
              className="mx-auto my-5 h-px w-20"
              style={{ background: currentTheme.accent }}
            />

            <h2
              className="font-serif text-4xl md:text-5xl"
              style={{ color: currentTheme.text }}
            >
              {title}
            </h2>

            <p
              className="mx-auto mt-5 max-w-md font-serif text-sm italic leading-7"
              style={{ color: currentTheme.text, opacity: 0.72 }}
            >
              Join us from wherever you are and share this
              beautiful moment together.
            </p>
          </div>

          <div
            className="overflow-hidden rounded-[32px] border p-2 shadow-[0_24px_55px_rgba(27,36,55,0.18)] md:p-3"
            style={{
              background: currentTheme.card,
              borderColor: currentTheme.divider,
            }}
          >
            {youtubeEmbedUrl ? (
              <div className="aspect-video overflow-hidden rounded-[24px] bg-black">
                <iframe
                  src={youtubeEmbedUrl}
                  title={title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div
                className="flex aspect-video flex-col items-center justify-center rounded-[24px] p-8 text-center"
                style={{ background: currentTheme.text }}
              >
                <p className="font-serif text-2xl text-white">
                  Watch Our Celebration
                </p>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition hover:scale-105"
                  style={{
                    background: currentTheme.accent,
                    color: currentTheme.card,
                  }}
                >
                  Open Live Stream
                </a>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div
              className="h-px w-12"
              style={{ background: currentTheme.divider }}
            />

            <span
              className="text-lg"
              style={{ color: currentTheme.accent }}
            >
              ✦
            </span>

            <div
              className="h-px w-12"
              style={{ background: currentTheme.divider }}
            />
          </div>
        </div>
      </section>
    </MotionSection>
  );
}