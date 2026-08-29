import type { TemplateProps } from "../types";

export default function Footer({ invitation }: TemplateProps) {
  const groomName = invitation.groom_name?.split(" ")[0] ?? "";
  const brideName = invitation.bride_name?.split(" ")[0] ?? "";
  return (
    <footer className="relative z-10 bg-[#171717] px-5 py-16 text-center text-[#f7f4ee] sm:px-8"><p className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#d6c1a3]">Thank you</p><h2 className="mt-5 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">{groomName} <span className="font-light text-[#d6c1a3]">&amp;</span> {brideName}</h2><div className="mx-auto my-6 h-px w-12 bg-white/25" /><p className="mx-auto max-w-md text-sm leading-6 text-white/60">Thank you for being part of the beginning of our forever.</p><p className="mt-10 text-[8px] uppercase tracking-[0.25em] text-white/40">Crafted by AKSA Digital Studio</p></footer>
  );
}
