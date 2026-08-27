import Image from "next/image";
import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionGroup from "@/components/motion/MotionGroup";
import MotionItem from "@/components/motion/MotionItem";
import MotionSection from "@/components/motion/MotionSection";

const scenePath =
  "/decor/chinese-imperial/background/chinese-imperial-cover-v1.webp";

export default function Couple({ invitation }: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  if (!sections.couple) {
    return null;
  }

  const couples = [
    {
      id: "bride",
      name: data.bride_name ?? "Bride",
      photo: data.bride_cutout || data.bride_photo,
      father: data.bride_father,
      mother: data.bride_mother,
      childLabel: "Daughter",
      photoPosition: "right-[-18%] md:right-[-4%]",
      flipScene: false,
      motionClass: "imperial-bride-motion",
    },
    {
      id: "groom",
      name: data.groom_name ?? "Groom",
      photo: data.groom_cutout || data.groom_photo,
      father: data.groom_father,
      mother: data.groom_mother,
      childLabel: "Son",
      photoPosition: "left-[-18%] md:left-[-4%]",
      flipScene: true,
      motionClass: "imperial-groom-motion",
    },
  ];

  return (
    <MotionSection>
      <section className="relative z-10 overflow-hidden bg-[#FFF5DC] py-16 md:py-24">
        <style>{`
          @keyframes imperial-bride-motion {
            0%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
            }

            50% {
              transform: translate3d(-5px, -8px, 0) scale(1.045);
            }
          }

          @keyframes imperial-groom-motion {
            0%, 100% {
              transform: translate3d(0, 0, 0) scale(1.045);
            }

            50% {
              transform: translate3d(5px, -8px, 0) scale(1);
            }
          }

          .imperial-bride-motion,
          .imperial-groom-motion {
            transform-origin: center bottom;
            will-change: transform;
          }

          .imperial-bride-motion {
            animation: imperial-bride-motion 7s ease-in-out infinite;
          }

          .imperial-groom-motion {
            animation: imperial-groom-motion 8s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .imperial-bride-motion,
            .imperial-groom-motion {
              animation: none;
            }
          }
        `}</style>

        <div className="mx-auto max-w-[620px]">
          <div className="px-6 pb-14 text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#A30F1B]">
              TWO HEARTS, ONE LOVE
            </p>

            <div className="mx-auto mb-6 h-px w-16 bg-[#C89B3C]" />

            <h2 className="font-serif text-4xl italic text-[#A30F1B] md:text-5xl">
              Bride & Groom
            </h2>

            <p className="mx-auto mt-5 max-w-md font-serif text-sm italic leading-7 text-[#7A2C27]">
              With great joy, we introduce the bride and groom.
            </p>
          </div>

          <MotionGroup>
            <div>
              {couples.map((person) => (
                <MotionItem key={person.id}>
                  <article className="relative isolate min-h-[720px] overflow-hidden bg-[#FFF5DC] md:min-h-[820px]">
                    <Image
                      src={scenePath}
                      alt=""
                      fill
                      sizes="(max-width: 620px) 100vw, 620px"
                      className={`absolute inset-0 z-0 object-cover object-center opacity-35 ${
                        person.flipScene ? "-scale-x-100" : ""
                      }`}
                    />

                    <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#FFF5DC]/45 via-[#FFF5DC]/10 to-[#FFF5DC]" />

                    {person.photo && (
                      <div
                        className={`absolute bottom-[118px] top-[42px] z-10 w-[92%] ${person.photoPosition}`}
                      >
                        <div
                          className={`relative h-full w-full ${person.motionClass}`}
                        >
                          <Image
                            src={person.photo}
                            alt={person.name}
                            fill
                            unoptimized
                            sizes="(max-width: 620px) 100vw, 620px"
                            className="object-contain object-bottom drop-shadow-[0_16px_22px_rgba(80,10,10,0.20)]"
                          />
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 z-20 h-[34%] bg-gradient-to-t from-[#FFF5DC] via-[#FFF5DC]/92 to-transparent" />

                    <div className="absolute inset-x-0 bottom-8 z-30 px-8 text-center">
                      <h3 className="font-serif text-3xl italic leading-tight text-[#B20F1C] md:text-4xl">
                        {person.name}
                      </h3>

                      <div className="mx-auto my-4 h-px w-14 bg-[#C89B3C]" />

                      {(person.father || person.mother) && (
                        <p className="font-serif text-base italic leading-7 text-[#8A2A24] md:text-lg">
                          {person.childLabel} of{" "}
                          {person.father && `Mr. ${person.father}`}
                          {person.father && person.mother && " & "}
                          {person.mother && `Mrs. ${person.mother}`}
                        </p>
                      )}
                    </div>
                  </article>
                </MotionItem>
              ))}
            </div>
          </MotionGroup>
        </div>
      </section>
    </MotionSection>
  );
}
