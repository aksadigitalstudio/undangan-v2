import Image from "next/image";
import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionSection from "@/components/motion/MotionSection";

function formatEventDate(date?: string) {
  if (!date) {
    return {
      day: "",
      month: "",
      year: "",
    };
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [year, month, day] = date.split("T")[0].split("-");

  return {
    day: day ?? "",
    month: month ? months[Number(month) - 1] ?? "" : "",
    year: year ?? "",
  };
}

export default function Event({ invitation }: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  if (!sections.event) {
    return null;
  }

  const events = [
    {
      label: "The First Ceremony",
      title: "Holy Matrimony",
      date: data.akad_date,
      time: data.akad_time,
      venue: data.akad_venue,
      address: data.akad_address,
      maps: data.akad_maps,
    },
    {
      label: "The Second Ceremony",
      title: "Wedding Reception",
      date: data.reception_date,
      time: data.reception_time,
      venue: data.reception_venue,
      address: data.reception_address,
      maps: data.reception_maps,
    },
  ].filter(
    (event) =>
      event.date ||
      event.time ||
      event.venue ||
      event.address
  );

  return (
    <MotionSection>
      <section className="relative z-10 overflow-hidden bg-[#F8ECD1] py-20 md:py-28">
        <style>{`
          @keyframes imperial-event-scene {
            0%, 100% {
              transform: scale(1.03) translate3d(0, 0, 0);
            }

            50% {
              transform: scale(1.09) translate3d(0, -10px, 0);
            }
          }

          @keyframes imperial-event-gate {
            0%, 100% {
              transform: translateY(0) scale(1);
              box-shadow:
                inset 0 0 0 2px rgba(126, 15, 23, 0.35),
                0 18px 40px rgba(56, 0, 8, 0.28);
            }

            50% {
              transform: translateY(-5px) scale(1.006);
              box-shadow:
                inset 0 0 0 2px rgba(126, 15, 23, 0.42),
                0 24px 48px rgba(56, 0, 8, 0.34);
            }
          }

          @keyframes imperial-event-petal-left {
            0% {
              transform: translate3d(-25px, 0, 0) rotate(0deg);
              opacity: 0;
            }

            12% {
              opacity: 0.7;
            }

            75% {
              opacity: 0.55;
            }

            100% {
              transform: translate3d(300px, 210px, 0) rotate(300deg);
              opacity: 0;
            }
          }

          @keyframes imperial-event-petal-right {
            0% {
              transform: translate3d(25px, 0, 0) rotate(0deg);
              opacity: 0;
            }

            12% {
              opacity: 0.65;
            }

            75% {
              opacity: 0.5;
            }

            100% {
              transform: translate3d(-300px, 230px, 0) rotate(-300deg);
              opacity: 0;
            }
          }

          .imperial-event-scene {
            animation: imperial-event-scene 16s ease-in-out infinite;
          }

          .imperial-event-gate {
            animation: imperial-event-gate 7s ease-in-out infinite;
          }

          .imperial-event-petal-left {
            animation: imperial-event-petal-left 9s linear infinite;
          }

          .imperial-event-petal-right {
            animation: imperial-event-petal-right 11s linear infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .imperial-event-scene,
            .imperial-event-gate,
            .imperial-event-petal-left,
            .imperial-event-petal-right {
              animation: none;
            }
          }
            @keyframes imperial-event-flower-left {
  0% {
    transform: translate3d(-140px, 20px, 0) rotate(0deg) scale(0.7);
    opacity: 0;
  }

  15% {
    opacity: 0.95;
  }

  55% {
    transform: translate3d(210px, -80px, 0) rotate(180deg) scale(1.25);
    opacity: 0.9;
  }

  100% {
    transform: translate3d(480px, 100px, 0) rotate(380deg) scale(0.75);
    opacity: 0;
  }
}

@keyframes imperial-event-flower-right {
  0% {
    transform: translate3d(140px, -10px, 0) rotate(0deg) scale(0.8);
    opacity: 0;
  }

  15% {
    opacity: 0.9;
  }

  55% {
    transform: translate3d(-200px, 90px, 0) rotate(-190deg) scale(1.3);
    opacity: 0.85;
  }

  100% {
    transform: translate3d(-480px, -50px, 0) rotate(-380deg) scale(0.75);
    opacity: 0;
  }
}

.imperial-event-petal-left {
  animation: imperial-event-flower-left 6s linear infinite !important;
}

.imperial-event-petal-right {
  animation: imperial-event-flower-right 7s linear infinite !important;
}
        `}</style>

        <div className="mx-auto mb-16 max-w-xl px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.55em] text-[#A30F1B]">
            Auspicious Day
          </p>

          <div className="mx-auto my-6 h-px w-20 bg-[#C89B3C]" />

          <h2 className="font-serif text-4xl italic text-[#A30F1B] md:text-5xl">
            Wedding Celebration
          </h2>

          <p className="mx-auto mt-5 max-w-md font-serif text-sm italic leading-7 text-[#7A2C27]">
            We would be honoured by your presence as we celebrate
            this joyful beginning together.
          </p>
        </div>

        <div className="space-y-14">
          {events.map((event, index) => {
            const eventDate = formatEventDate(event.date);

            return (
              <article
                key={event.label}
                className="relative mx-auto min-h-[760px] w-full max-w-[620px] overflow-hidden bg-[#A30F1B] px-5 py-8 md:min-h-[880px] md:px-8"
              >
                <div className="imperial-event-scene absolute inset-0">
                  <Image
                    src="/decor/chinese-imperial/background/chinese-imperial-cover-v1.webp"
                    alt=""
                    fill
                    sizes="(max-width: 620px) 100vw, 620px"
                    className={`pointer-events-none object-cover opacity-[0.22] ${
                      index === 1 ? "-scale-x-100" : ""
                    }`}
                  />
                </div>

                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#7C0812]/40 via-[#A30F1B]/20 to-[#69050C]/75" />

                {/* Kelopak bergerak hanya menjadi aksen di belakang gerbang */}
<div
  className="pointer-events-none absolute left-[6%] top-[27%] z-[5] text-6xl text-[#D7192A]"
  aria-hidden="true"
>
  <span className="imperial-event-petal-left block">✿</span>
</div>

<div
  className="pointer-events-none absolute left-[12%] top-[56%] z-[5] text-5xl text-[#F04452]"
  aria-hidden="true"
>
  <span
    className="imperial-event-petal-left block"
    style={{ animationDelay: "-3s" }}
  >
    ❀
  </span>
</div>

<div
  className="pointer-events-none absolute right-[7%] top-[34%] z-[5] text-6xl text-[#D7192A]"
  aria-hidden="true"
>
  <span className="imperial-event-petal-right block">✿</span>
</div>

<div
  className="pointer-events-none absolute right-[13%] top-[66%] z-[5] text-5xl text-[#F04452]"
  aria-hidden="true"
>
  <span
    className="imperial-event-petal-right block"
    style={{ animationDelay: "-4s" }}
  >
    ❀
  </span>
</div>

                <div
                  className="imperial-event-gate pointer-events-none absolute inset-x-5 bottom-5 top-10 z-[3] rounded-t-[220px] border-[5px] border-[#E6B951] bg-[radial-gradient(ellipse_at_50%_26%,#FFF9D9_0%,#FBE9AD_38%,#E7B55B_100%)] md:inset-x-8 md:rounded-t-[270px]"
                  aria-hidden="true"
                />

                <div
                  className="pointer-events-none absolute inset-x-8 bottom-7 top-14 z-[4] rounded-t-[205px] border border-[#A30F1B]/35 md:inset-x-11 md:rounded-t-[255px]"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex min-h-[700px] flex-col items-center px-7 pt-28 text-center md:min-h-[820px] md:px-14 md:pt-36">
                  <p className="text-[10px] uppercase tracking-[0.48em] text-[#A30F1B]">
                    {event.label}
                  </p>

                  <h3 className="mt-6 font-serif text-4xl italic text-[#B20F1C] md:text-5xl">
                    {event.title}
                  </h3>

                  <div className="my-7 h-px w-14 bg-[#C89B3C]" />

                  {eventDate.day && (
                    <p className="font-serif text-6xl leading-none text-[#A30F1B] md:text-7xl">
                      {eventDate.day}
                    </p>
                  )}

                  {eventDate.month && (
                    <p className="mt-2 font-serif text-xl text-[#7A2C27] md:text-2xl">
                      {eventDate.month}
                    </p>
                  )}

                  {eventDate.year && (
                    <p className="mt-1 font-serif text-lg text-[#7A2C27]">
                      {eventDate.year}
                    </p>
                  )}

                  {event.time && (
                    <>
                      <div className="my-5 h-px w-16 bg-[#A30F1B]" />

                      <p className="font-serif text-base text-[#7A2C27] md:text-lg">
                        {event.time}
                      </p>
                    </>
                  )}

                  <div className="mt-10">
                    <p className="text-2xl text-[#B20F1C]">⌾</p>
                  </div>

                  {event.venue && (
                    <h4 className="mt-4 font-serif text-2xl font-semibold text-[#7A2C27] md:text-3xl">
                      {event.venue}
                    </h4>
                  )}

                  {event.address && (
                    <p className="mt-4 max-w-sm whitespace-pre-wrap font-serif text-sm leading-7 text-[#7A2C27]">
                      {event.address}
                    </p>
                  )}

                  {event.maps && (
                    <a
                      href={event.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex rounded-full bg-[#C41424] px-8 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFF7DE] shadow-[0_10px_22px_rgba(105,0,10,0.28)] transition hover:scale-105 hover:bg-[#A30F1B]"
                    >
                      View Location
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </MotionSection>
  );
}
