import Image from "next/image";
import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionGroup from "@/components/motion/MotionGroup";
import MotionItem from "@/components/motion/MotionItem";
import MotionSection from "@/components/motion/MotionSection";

const ornamentPath =
  "/decor/sekar-sogan/foreground/sekar-sogan-ornament.png";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function Couple({ invitation }: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  if (!sections.couple) {
    return null;
  }

  const groomName = data.groom_name ?? "Nama Mempelai Pria";
  const brideName = data.bride_name ?? "Nama Mempelai Wanita";

  const couples = [
    {
      role: "Mempelai Pria",
      name: groomName,
      photo: data.groom_photo,
      father: data.groom_father,
      mother: data.groom_mother,
    },
    {
      role: "Mempelai Wanita",
      name: brideName,
      photo: data.bride_photo,
      father: data.bride_father,
      mother: data.bride_mother,
    },
  ];

  return (
    <MotionSection>
      <section className="relative z-10 overflow-hidden px-6 py-24">
        <div className="relative mx-auto max-w-5xl">
<div className="mx-auto mb-14 max-w-3xl rounded-[28px] border border-[#D5B477]/25 bg-[#21170F]/70 px-6 py-8 text-center shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm">
  <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#E2B968]">
    Mempelai
  </p>

  <div className="mx-auto mb-6 h-px w-16 bg-[#D5A54D]" />

  <h2 className="font-serif text-4xl text-[#FFF6E5] md:text-5xl">
    Sang Mempelai
  </h2>

  <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#F3DEC0]/85">
    Dengan penuh rasa syukur, kami memperkenalkan kedua mempelai.
  </p>
</div>

          <MotionGroup>
            <div className="grid gap-8 md:grid-cols-2">
              {couples.map((person) => (
                <MotionItem key={person.role}>
                  <article className="relative overflow-hidden rounded-[32px] border border-[#D5B477]/60 bg-[#FFF8EA]/95 p-8 text-center shadow-[0_16px_35px_rgba(78,48,24,0.16)]">
                    <Image
                      src={ornamentPath}
                      alt=""
                      width={500}
                      height={750}
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full opacity-[0.14]"
                    />

                    <div className="relative">
                      <div className="relative mx-auto mb-7 h-44 w-44 overflow-hidden rounded-full border-4 border-[#C69A52] bg-[#EBD8B5] p-1 shadow-lg">
                        <div className="relative h-full w-full overflow-hidden rounded-full bg-[#79513A]">
{person.photo ? (
  <Image
    src={person.photo}
    alt={person.name}
    fill
    sizes="176px"
className="object-cover object-top"
  />
) : (
  <div className="flex h-full w-full items-center justify-center font-serif text-4xl text-[#FFF8EA]">
    {getInitials(person.name)}
  </div>
)}
                        </div>
                      </div>

                      <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-[#9A6A42]">
                        {person.role}
                      </p>

                      <h3 className="font-serif text-3xl text-[#4A2D1D]">
                        {person.name}
                      </h3>

                      <div className="mx-auto my-6 h-px w-12 bg-[#C69A52]" />

                      {(person.father || person.mother) && (
                        <div className="space-y-1 text-sm leading-6 text-[#755545]">
                          <p>Putra / Putri dari</p>

                          {person.father && (
                            <p className="font-medium text-[#4A2D1D]">
                              {person.father}
                            </p>
                          )}

                          {person.mother && (
                            <p className="font-medium text-[#4A2D1D]">
                              {person.mother}
                            </p>
                          )}
                        </div>
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
