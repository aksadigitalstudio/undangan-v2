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
  const groomFirstName = groomName.split(" ")[0] || "";
  const brideFirstName = brideName.split(" ")[0] || "";

  return (
    <footer className="relative z-10 border-t border-[#C99A52]/20 bg-[#21170F] px-6 py-5 text-center">
      <div className="mx-auto max-w-md">
        <p className="mb-2 text-[8px] uppercase tracking-[0.5em] text-[#D9B66A]">
          Matur Nuwun
        </p>

        <h2 className="font-serif text-xl text-[#FFF6E5]">
          {groomFirstName}
          <span className="mx-2 text-[#D5A54D]">&</span>
          {brideFirstName}
        </h2>

        <p className="mt-1 text-xs text-[#F4DFC0]/65">
          {weddingDate}
        </p>

        <div className="mt-3 inline-flex rounded-full border border-[#E8C77E]/20 bg-white/[0.07] px-4 py-1.5 backdrop-blur-md">
          <p className="text-[8px] tracking-[0.14em] text-[#FFF6E5]/85">
            Crafted by AKSA Digital Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
