import Image from "next/image";
import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionGroup from "@/components/motion/MotionGroup";
import MotionItem from "@/components/motion/MotionItem";
import MotionSection from "@/components/motion/MotionSection";

const bananaOrnamentPath =
  "/decor/puspa-priangan/foreground/puspa-priangan-banana-floral-v1.png";

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
      role: "Panganten Pria",
      name: data.groom_name ?? "Nama Mempelai Pria",
      photo: data.groom_cutout ?? data.groom_photo,
      father: data.groom_father,
      mother: data.groom_mother,
      photoPosition: "right-[-16%]",
    },
    {
      role: "Panganten Wanita",
      name: data.bride_name ?? "Nama Mempelai Wanita",
      photo: data.bride_cutout ?? data.bride_photo,
      father: data.bride_father,
      mother: data.bride_mother,
      photoPosition: "left-[-16%]",
    },
  ];

  return (
    <MotionSection>
      <section className="relative z-10 overflow-hidden py-24 md:py-32">
        <style>{`
          @keyframes sunda-banana-sway {
            0%, 100% {
              transform: translate3d(0, 0, 0) rotate(-1.5deg);
            }

            50% {
              transform: translate3d(10px, -8px, 0) rotate(2deg);
            }
          }

          .sunda-banana-sway {
            animation: sunda-banana-sway 6s ease-in-out infinite;
            transform-origin: bottom center;
          }

          @media (prefers-reduced-motion: reduce) {
            .sunda-banana-sway {
              animation: none;
            }
          }
        `}</style>

        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-20 text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#A37C32]">
              Dua Insan
            </p>

            <div className="mx-auto mb-6 h-px w-16 bg-[#C8A65B]" />

            <h2 className="font-serif text-4xl text-[#173D2E] md:text-5xl">
              Sang Mempelai
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#506758]">
              Dengan penuh rasa syukur, kami memperkenalkan kedua
              mempelai yang berbahagia.
            </p>
          </div>

          <MotionGroup>
            <div className="space-y-28">
              {couples.map((person) => (
                <MotionItem key={person.role}>
                  <article className="relative min-h-[700px] md:min-h-[820px]">
                    {person.photo && (
                      <div
                        className={`absolute bottom-40 top-0 z-10 w-[94%] ${person.photoPosition}`}
                      >
                        <Image
                          src={person.photo}
                          alt={person.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 768px"
                          className="object-contain object-bottom drop-shadow-[0_18px_20px_rgba(30,61,46,0.16)] [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_94%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_94%)]"
                        />
                      </div>
                    )}

                    <div
                      className={`pointer-events-none absolute bottom-0 z-20 w-[115%] ${
                        person.role === "Panganten Pria"
                          ? "left-[-12%] scale-x-[-1]"
                          : "right-[-12%]"
                      }`}
                      aria-hidden="true"
                    >
                      <Image
                        src={bananaOrnamentPath}
                        alt=""
                        width={1254}
                        height={1254}
                        className="sunda-banana-sway h-auto w-full"
                      />
                    </div>

<div className="absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-[#FFFDF5] via-[#FFFDF5]/95 to-transparent px-8 pb-8 pt-24 text-center">
                      <h3 className="font-serif text-2xl font-semibold italic leading-relaxed text-[#173D2E] drop-shadow-[0_1px_0_rgba(255,255,255,0.9)] md:text-3xl">
                        {person.name}
                      </h3>

                      {(person.father || person.mother) && (
                        <p className="mt-3 font-serif text-base italic leading-7 text-[#214D3C] md:text-lg">
                          {person.role === "Panganten Pria"
                            ? "Putra"
                            : "Putri"}{" "}
                          dari{" "}
                          {person.father && `Bapak ${person.father}`}
                          {person.father &&
                            person.mother &&
                            " & "}
                          {person.mother && `Ibu ${person.mother}`}
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
