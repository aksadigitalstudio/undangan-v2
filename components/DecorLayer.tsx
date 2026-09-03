import Image from "next/image";
import { decor } from "@/lib/decor";

type DecorLayerProps = {
  theme: string;
  templateId?: string | null;
  hidden?: boolean;
};

const templatesWithoutGlobalDecor = new Set([
  "template-002",
  "template-003",
  "template-004",
  "template-005",
  "template-006",
  "template-007",
  "template-008",
  "template-009",
  "template-010",
  "template-011",
  "template-012",
  "template-013",
]);

export default function DecorLayer({
  theme,
  templateId,
  hidden = false,
}: DecorLayerProps) {
  const currentDecor =
    decor[theme as keyof typeof decor] ??
    decor["elegant-gold"];
  if (hidden || (templateId && templatesWithoutGlobalDecor.has(templateId))) {
    return null;
  }
  return (
    <>
      {/* Ornamen tetap saat halaman di-scroll, di belakang tulisan */}
      <div
data-global-decor="true"
className="fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src={currentDecor.foreground[0]}
          alt=""
          width={450}
          height={450}
          className="absolute left-0 top-0 h-auto w-52 md:w-80 lg:w-[420px]"
          priority
        />

        <Image
          src={currentDecor.foreground[1]}
          alt=""
          width={450}
          height={450}
          className="absolute right-0 top-0 h-auto w-52 md:w-80 lg:w-[420px]"
          priority
        />

        <Image
          src={currentDecor.foreground[2]}
          alt=""
          width={450}
          height={450}
          className="absolute bottom-0 left-0 h-auto w-32 md:w-44 lg:w-56"
          priority
        />

        <Image
          src={currentDecor.foreground[3]}
          alt=""
          width={450}
          height={450}
          className="absolute bottom-0 right-0 h-auto w-32 md:w-44 lg:w-56"
          priority
        />
      </div>

      {/* Ornamen khusus akhir halaman, di atas footer */}
      <div
data-global-decor="true"
className="absolute inset-x-0 bottom-0 z-20 pointer-events-none"
        aria-hidden="true"
      >
        <Image
          src={currentDecor.foreground[2]}
          alt=""
          width={450}
          height={450}
          className="absolute bottom-0 left-0 h-auto w-32 md:w-44 lg:w-56"
          priority
        />

        <Image
          src={currentDecor.foreground[3]}
          alt=""
          width={450}
          height={450}
          className="absolute bottom-0 right-0 h-auto w-32 md:w-44 lg:w-56"
          priority
        />
      </div>
    </>
  );
}
