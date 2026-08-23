import Image from "next/image";
import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionGroup from "@/components/motion/MotionGroup";
import MotionItem from "@/components/motion/MotionItem";
import MotionSection from "@/components/motion/MotionSection";

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function getDateParts(date?: string) {
  if (!date) {
    return null;
  }

  const [year, month, day] = date.split("-");

  if (!year || !month || !day) {
    return null;
  }

  return {
    day,
    month: monthNames[Number(month) - 1] ?? month,
    year,
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
      title: "Akad Nikah",
      date: data.akad_date,
      time: data.akad_time,
      venue: data.akad_venue,
      address: data.akad_address,
      maps: data.akad_maps,
      background:
        "/decor/puspa-priangan/background/puspa-priangan-event-akad.png",
      align: "left",
    },
    {
      title: "Resepsi Pernikahan",
      date: data.reception_date,
      time: data.reception_time,
      venue: data.reception_venue,
      address: data.reception_address,
      maps: data.reception_maps,
      background:
        "/decor/puspa-priangan/background/puspa-priangan-event-resepsi.png",
      align: "right",
    },
  ];

  return (
    <MotionSection>
      <section className="relative z-10 overflow-hidden">
        <MotionGroup>
          <div>
            {events.map((event) => {
              const isLeft = event.align === "left";
              const dateParts = getDateParts(event.date);

              return (
                <MotionItem key={event.title}>
<article className="relative min-h-[720px] overflow-hidden bg-[#FCF8ED] md:min-h-[820px]">
  <Image
    src={event.background}
    alt=""
    fill
    sizes="100vw"
    className="object-cover"
  />

  {/* Gradasi atas: menyatukan Story ke Akad, atau Akad ke Resepsi */}
  <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-[#F2E8D6] via-[#FCF8ED]/80 to-transparent" />

  {/* Gradasi bawah: menghilangkan garis potong sebelum section berikutnya */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent via-[#FCF8ED]/80 to-[#FCF8ED]" />

                    <div
                      className={[
                        "relative z-10 flex min-h-[720px] px-10 py-20 md:min-h-[820px] md:px-[12%]",
                        isLeft
                          ? "items-start justify-start pt-32 text-left md:pt-40"
                          : "items-start justify-end pt-32 text-right md:pt-40",
                      ].join(" ")}
                    >
                      <div className="w-[58%] max-w-sm md:w-[42%]">
                        <p className="mb-5 text-[10px] uppercase tracking-[0.42em] text-[#587154]">
                          Rangkaian Pernikahan
                        </p>

                        <h2 className="font-serif text-4xl italic leading-tight text-[#214D3C] md:text-6xl">
                          {event.title}
                        </h2>

                        {dateParts && (
                          <div
                            className={[
                              "mt-8",
                              isLeft ? "" : "ml-auto",
                            ].join(" ")}
                          >
                            <p className="font-serif text-lg italic text-[#466645] md:text-2xl">
                              {dateParts.month}
                            </p>

                            <p className="font-serif text-7xl leading-none text-[#214D3C] md:text-9xl">
                              {dateParts.day}
                            </p>

                            <p className="font-serif text-lg italic text-[#466645] md:text-2xl">
                              {dateParts.year}
                            </p>

                            <div
                              className={[
                                "my-4 h-[2px] w-20 bg-[#214D3C]",
                                isLeft ? "" : "ml-auto",
                              ].join(" ")}
                            />
                          </div>
                        )}

                        {event.time && (
                          <p className="font-serif text-sm italic text-[#3D6041] md:text-lg">
                            {event.time}
                          </p>
                        )}

                        {event.venue && (
                          <p className="mt-10 font-serif text-xl italic text-[#214D3C] md:text-3xl">
                            {event.venue}
                          </p>
                        )}

                        {event.address && (
                          <p className="mt-3 font-serif text-xs italic leading-6 text-[#3D6041] md:text-base md:leading-7">
                            {event.address}
                          </p>
                        )}

                        {event.maps && (
                          <a
                            href={event.maps}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-7 inline-flex rounded-full bg-[#789573] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#214D3C]"
                          >
                            Lihat Lokasi
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </MotionItem>
              );
            })}
          </div>
        </MotionGroup>
      </section>
    </MotionSection>
  );
}