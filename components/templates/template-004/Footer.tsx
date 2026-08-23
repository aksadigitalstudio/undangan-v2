import type { TemplateProps } from "../types";

export default function Footer({ invitation }: TemplateProps) {
  const groomName =
    invitation.groom_name?.split(" ")[0] ?? "";

  const brideName =
    invitation.bride_name?.split(" ")[0] ?? "";

  return (
    <footer className="relative z-10 overflow-hidden bg-[#450309] px-6 py-5 text-center md:py-6">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#740A13_0%,#3E0207_100%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F7C85D] to-transparent" />

      <div className="relative mx-auto max-w-md">
        <p className="text-[8px] uppercase tracking-[0.55em] text-[#FFE4A1]">
          百年好合
        </p>

        <div className="mx-auto my-3 flex items-center justify-center gap-2">
          <div className="h-px w-7 bg-[#F7C85D]/70" />
          <span className="text-xs text-[#F7C85D]">✦</span>
          <div className="h-px w-7 bg-[#F7C85D]/70" />
        </div>

        <h2 className="font-serif text-xl text-[#FFF5D7] md:text-2xl">
          {groomName}
          <span className="mx-2 text-[#F7C85D]">&</span>
          {brideName}
        </h2>

        <p className="mt-1 text-xs tracking-[0.1em] text-[#FFEAC0]/85">
          {invitation.wedding_date ?? ""}
        </p>

        <div className="mt-4 inline-flex rounded-full border border-[#F7C85D]/35 bg-[#8C1019]/60 px-4 py-1.5 backdrop-blur-sm">
          <p className="text-[8px] tracking-[0.14em] text-[#FFF0C9]">
            Crafted by AKSA Digital Studio
          </p>
        </div>
      </div>
    </footer>
  );
}