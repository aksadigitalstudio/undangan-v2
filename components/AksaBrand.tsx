import Image from "next/image";

type AksaBrandProps = {
  className?: string;
  darkSurface?: boolean;
  monogramOnly?: boolean;
};

export default function AksaBrand({
  className = "",
  darkSurface = false,
  monogramOnly = false,
}: AksaBrandProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className={`relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl ${darkSurface ? "bg-[#fcfaf7] p-1.5" : ""}`}>
        <Image
          src="/brand/aksa-monogram.png"
          alt="AKSA"
          fill
          sizes="40px"
          className="object-contain"
          priority
        />
      </span>
      {!monogramOnly && (
        darkSurface ? (
          <span className="leading-none text-white">
            <span className="block font-serif text-lg font-semibold tracking-tight">AKSA</span>
            <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.2em] text-white/55">Digital Studio</span>
          </span>
        ) : (
          <Image
            src="/brand/aksa-wordmark.png"
            alt="AKSA Digital Studio"
            width={142}
            height={51}
            sizes="142px"
            className="h-auto w-[118px] sm:w-[132px]"
            priority
          />
        )
      )}
    </span>
  );
}
