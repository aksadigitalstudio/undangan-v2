import Image from "next/image";
import type { TemplateProps } from "../types";

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

export default function ImperialBlessing({
  invitation,
}: TemplateProps) {
  const groomInitial = getInitial(invitation.groom_name ?? "");
  const brideInitial = getInitial(invitation.bride_name ?? "");

  return (
<section className="relative z-10 -mt-px overflow-hidden bg-[#F8ECD1]">
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-[#F8ECD1] via-[#F8ECD1]/70 to-transparent md:h-44"
  />

  <div className="relative aspect-[9/16] min-h-[710px] w-full md:min-h-[900px]">
        <Image
          src="/decor/chinese-imperial/foreground/chinese-imperial-blessing-v1.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />

<div className="absolute inset-x-8 top-[26%] z-10 text-center md:inset-x-14">
          <p className="font-serif text-2xl italic text-[#A30F1B] drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] md:text-3xl">
            Colossians 3:14
          </p>

          <p className="mt-3 font-serif text-lg italic leading-relaxed text-[#A30F1B] drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] md:text-xl">
            “Love binds us all together
            <br />
            in perfect unity.”
          </p>
        </div>

<div className="absolute inset-x-0 top-[73%] text-center md:top-[76%] md:-translate-y-1/2">
  <p className="font-serif text-5xl italic leading-none text-[#B20F1C] drop-shadow-[0_2px_2px_rgba(255,247,226,0.95)] sm:text-6xl">
    {groomInitial}
    <span className="mx-1 text-[#C89B3C]">&</span>
    {brideInitial}
  </p>
</div>
      </div>
    </section>
  );
}
