import Image from "next/image";
import type { TemplateProps } from "../types";

const floralPath =
  "/decor/puspa-priangan/foreground/puspa-priangan-floral.png";

export default function Footer({ invitation }: TemplateProps) {
  const groomName = invitation.groom_name?.split(" ")[0] ?? "";
  const brideName = invitation.bride_name?.split(" ")[0] ?? "";

  return (
    <footer className="relative z-10 overflow-hidden border-t border-[#C9D7BE] bg-[linear-gradient(180deg,#FCF8ED_0%,#EEF4E7_52%,#C7D9BD_100%)] px-6 py-7 text-center md:py-8">
      <Image
        src={floralPath}
        alt=""
        width={300}
        height={300}
        className="pointer-events-none absolute -bottom-24 -left-16 w-40 opacity-75 md:w-52"
      />

      <Image
        src={floralPath}
        alt=""
        width={300}
        height={300}
        className="pointer-events-none absolute -bottom-24 -right-16 w-40 scale-x-[-1] opacity-75 md:w-52"
      />

      <div className="relative z-10 mx-auto max-w-md">
        <p className="mb-2 text-[9px] uppercase tracking-[0.45em] text-[#78916F]">
          Hatur Nuhun
        </p>

        <h2 className="font-serif text-2xl text-[#214D3C] md:text-3xl">
          {groomName}
          <span className="mx-2 text-[#B38A3C]">&</span>
          {brideName}
        </h2>

        <p className="mx-auto mt-3 max-w-sm font-serif text-xs italic leading-5 text-[#52705A]">
          Hatur nuhun parantos masihan doa sareng kabagjaan
          dina dinten anu istimewa ieu.
        </p>

        <div className="mx-auto my-3 h-px w-10 bg-[#B89B5E]/70" />

        <p className="text-[8px] uppercase tracking-[0.18em] text-[#52705A]">
          Crafted by AKSA Digital Studio
        </p>
      </div>
    </footer>
  );
}