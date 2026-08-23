interface FooterProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
}

export default function TemplateFooter({
  groomName,
  brideName,
  weddingDate,
}: FooterProps) {
  return (
    <footer className="relative z-10 bg-[#131C30] px-6 py-6 text-center md:py-7">
      <div className="mx-auto max-w-md">
        <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-white/60 md:text-xs">
          Thank You
        </p>

        <h2 className="font-serif text-2xl leading-tight text-white md:text-3xl">
          {groomName.split(" ")[0]}
          <span className="mx-2">&</span>
          {brideName.split(" ")[0]}
        </h2>

        <p className="mt-2 text-sm text-white/75 md:text-base">
          {weddingDate}
        </p>

        <div className="mx-auto my-4 h-px w-12 bg-white/20" />

<div className="inline-flex rounded-full border border-white/20 bg-white/[0.10] px-5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.22)] backdrop-blur-md">
  <p className="text-[9px] tracking-[0.16em] text-white/90">
    Crafted by AKSA Digital Studio
  </p>
</div>
      </div>
    </footer>
  );
}