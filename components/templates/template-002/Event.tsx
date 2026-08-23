import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";

import MotionSection from "@/components/motion/MotionSection";

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
      label: "Rangkaian Pertama",
      title: "Akad Nikah",
      date: data.akad_date,
      time: data.akad_time,
      venue: data.akad_venue,
      address: data.akad_address,
      maps: data.akad_maps,
    },
    {
      label: "Rangkaian Kedua",
      title: "Resepsi Pernikahan",
      date: data.reception_date,
      time: data.reception_time,
      venue: data.reception_venue,
      address: data.reception_address,
      maps: data.reception_maps,
    },
  ];

  return (
    <MotionSection>
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-5xl">
<div className="mx-auto mb-14 max-w-3xl rounded-[28px] border border-[#D5B477]/25 bg-[#21170F]/70 px-6 py-8 text-center shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm">
  <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#E2B968]">
    Waktu dan Tempat
  </p>

  <div className="mx-auto mb-6 h-px w-16 bg-[#D5A54D]" />

  <h2 className="font-serif text-4xl text-[#FFF6E5] md:text-5xl">
    Rangkaian Acara
  </h2>

  <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#F3DEC0]/85">
    Merupakan kehormatan bagi kami apabila Bapak, Ibu,
    Saudara, dan Sahabat berkenan hadir.
  </p>
</div>

<>
            <div className="grid gap-8 md:grid-cols-2">
              {events.map((event) => (
<div key={event.title}>
                  <article className="h-full rounded-[32px] border border-[#D5B477]/60 bg-[#FFF8EA]/95 p-8 text-center shadow-[0_16px_35px_rgba(78,48,24,0.14)]">
                    <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-[#9A6A42]">
                      {event.label}
                    </p>

                    <h3 className="font-serif text-3xl text-[#4A2D1D]">
                      {event.title}
                    </h3>

                    <div className="mx-auto my-6 h-px w-12 bg-[#C69A52]" />

                    {event.date && (
                      <p className="font-serif text-2xl text-[#6E4127]">
                        {event.date}
                      </p>
                    )}

                    {event.time && (
                      <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#755545]">
                        {event.time}
                      </p>
                    )}

                    {(event.date || event.time) && (
                      <div className="mx-auto my-7 h-px w-12 bg-[#C69A52]/60" />
                    )}

                    {event.venue && (
                      <p className="font-serif text-2xl text-[#4A2D1D]">
                        {event.venue}
                      </p>
                    )}

                    {event.address && (
                      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[#755545]">
                        {event.address}
                      </p>
                    )}

                    {event.maps && (
                      <a
                        href={event.maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex rounded-full bg-[#6E4127] px-7 py-3 text-xs uppercase tracking-[0.18em] text-[#FFF8EA] transition hover:bg-[#4A2D1D]"
                      >
                        Lihat Lokasi
                      </a>
                    )}
                  </article>
</div>
              ))}
            </div>
</>
        </div>
      </section>
    </MotionSection>
  );
}