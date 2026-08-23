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
  const title = invitation.live_stream_title?.trim() || "Live Streaming";
  const url = invitation.live_stream_url?.trim();

  if (!url) {
    return null;
  }

  const youtubeEmbedUrl = getYouTubeEmbedUrl(url);

  return (
    <MotionSection>
      <section className="relative z-10 overflow-hidden bg-[#760A13] px-5 py-24 md:py-32">
        <style>{`
          @keyframes imperial-stream-drift-left {
            0%, 100% {
              transform: translate3d(0, 0, 0) rotate(-8deg);
              opacity: 0.26;
            }

            50% {
              transform: translate3d(34px, -22px, 0) rotate(8deg);
              opacity: 0.52;
            }
          }

          @keyframes imperial-stream-drift-right {
            0%, 100% {
              transform: translate3d(0, 0, 0) rotate(8deg);
              opacity: 0.22;
            }

            50% {
              transform: translate3d(-34px, 22px, 0) rotate(-8deg);
              opacity: 0.48;
            }
          }

          .imperial-stream-drift-left {
            animation: imperial-stream-drift-left 11s ease-in-out infinite;
          }

          .imperial-stream-drift-right {
            animation: imperial-stream-drift-right 13s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .imperial-stream-drift-left,
            .imperial-stream-drift-right {
              animation: none;
            }
          }
        `}</style>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#A41720] via-[#760A13] to-[#420308]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 border-b-4 border-[#F2CA69]/75 bg-[#8C111B] shadow-[0_10px_26px_rgba(42,0,5,0.28)] md:h-36" />
        <div className="pointer-events-none absolute inset-x-[11%] top-8 h-20 rounded-t-[110px] border-x-4 border-t-4 border-[#F2CA69]/75 md:inset-x-[18%] md:top-10 md:h-24" />

        <div
          className="imperial-stream-drift-left pointer-events-none absolute left-[5%] top-[30%] z-[1] text-6xl text-[#F7C85D]"
          aria-hidden="true"
        >
          ✦
        </div>
        <div
          className="imperial-stream-drift-left pointer-events-none absolute left-[11%] top-[72%] z-[1] text-5xl text-[#FFE6A4]"
          aria-hidden="true"
        >
          ❀
        </div>
        <div
          className="imperial-stream-drift-right pointer-events-none absolute right-[5%] top-[42%] z-[1] text-6xl text-[#F7C85D]"
          aria-hidden="true"
        >
          ✦
        </div>
        <div
          className="imperial-stream-drift-right pointer-events-none absolute right-[11%] top-[76%] z-[1] text-5xl text-[#FFE6A4]"
          aria-hidden="true"
        >
          ❀
        </div>

        <div className="relative z-10 mx-auto max-w-4xl pt-10 md:pt-14">
          <div className="mb-12 text-center">
            <p className="text-[10px] uppercase tracking-[0.6em] text-[#FFE4A1]">
              云端共庆
            </p>

            <div className="mx-auto my-6 flex items-center justify-center gap-3 text-[#F7C85D]">
              <span className="h-px w-12 bg-current" />
              <span className="text-sm">囍</span>
              <span className="h-px w-12 bg-current" />
            </div>

            <p className="text-[10px] uppercase tracking-[0.42em] text-[#FFDE95]">
              Join Us Online
            </p>

            <h2 className="mt-4 font-serif text-4xl text-[#FFF5D7] md:text-5xl">
              {title}
            </h2>

            <p className="mx-auto mt-5 max-w-md font-serif text-sm italic leading-7 text-[#FFEAC0]">
              Celebrate this joyful moment with us, wherever you may be.
            </p>
          </div>

          <div className="relative rounded-t-[72px] border-4 border-[#F2CA69] bg-[#FFF1D1] p-3 shadow-[0_24px_54px_rgba(42,0,5,0.48)] md:rounded-t-[100px] md:p-5">
            <div className="pointer-events-none absolute inset-x-7 top-4 h-12 rounded-t-[70px] border-x border-t border-[#A30F1B]/30 md:inset-x-10 md:top-5 md:h-16" />

            <div className="relative overflow-hidden rounded-t-[54px] border-2 border-[#8F1720] bg-[#280207] shadow-inner md:rounded-t-[80px]">
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
                <div className="flex aspect-video flex-col items-center justify-center bg-[radial-gradient(ellipse_at_50%_30%,#9E1822_0%,#650811_56%,#310206_100%)] p-8 text-center">
                  <span className="text-4xl text-[#F7C85D]">囍</span>
                  <p className="mt-5 font-serif text-2xl text-[#FFF4D4]">
                    Celebrate With Us
                  </p>
                  <p className="mt-3 max-w-sm font-serif text-sm italic leading-7 text-[#FFE3A7]">
                    Join our celebration through the live-stream link below.
                  </p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 rounded-full border border-[#F4CF71] bg-[#B71925] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFF7DD] shadow-lg transition hover:bg-[#D22533]"
                  >
                    Open Live Stream
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-4 text-[#F7C85D]/85">
            <span className="h-px flex-1 bg-current/60" />
            <span className="text-sm">✦</span>
            <span className="h-px flex-1 bg-current/60" />
          </div>

          <p className="mx-auto mt-6 max-w-md text-center font-serif text-sm italic leading-7 text-[#FFEAC0]">
            May this shared moment bring us closer, even from afar.
          </p>
        </div>
      </section>
    </MotionSection>
  );
}
