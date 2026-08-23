import Image from "next/image";
import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionSection from "@/components/motion/MotionSection";
import CopyButton from "@/components/CopyButton";

export default function Gift({ invitation }: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  const hasBankAccount = Boolean(data.bank_account?.trim());
  const hasQris = Boolean(data.qris_image?.trim());
  const hasGiftAddress = Boolean(data.gift_address?.trim());
  const hasGiftDetails = hasBankAccount || hasQris || hasGiftAddress;

  if (!sections.gift || !hasGiftDetails) {
    return null;
  }

  return (
    <MotionSection>
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-3xl">
<div className="mx-auto mb-14 max-w-3xl rounded-[28px] border border-[#D5B477]/25 bg-[#21170F]/70 px-6 py-8 text-center shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-sm">
  <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#E2B968]">
    Tanda Kasih
  </p>

  <div className="mx-auto mb-6 h-px w-16 bg-[#D5A54D]" />

  <h2 className="font-serif text-4xl text-[#FFF6E5] md:text-5xl">
    Hadiah Pernikahan
  </h2>

  <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#F3DEC0]/85">
    Kehadiran dan doa restu Anda adalah hadiah terindah
    bagi kami. Namun, jika berkenan berbagi tanda kasih,
    berikut informasinya.
  </p>
</div>

          <div className="space-y-8">
            {hasBankAccount && (
            <div className="rounded-[32px] border border-[#D5B477]/60 bg-[#FFF8EA]/95 p-8 text-center shadow-[0_16px_35px_rgba(78,48,24,0.14)]">
              <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-[#9A6A42]">
                Transfer Bank
              </p>

              <h3 className="font-serif text-3xl text-[#4A2D1D]">
                {data.bank_name || "Transfer Bank"}
              </h3>

              <div className="mx-auto my-6 h-px w-12 bg-[#C69A52]" />

              <p className="text-[10px] uppercase tracking-[0.3em] text-[#9A6A42]">
                Nomor Rekening
              </p>

              <p className="my-4 break-all font-serif text-3xl tracking-[0.1em] text-[#8B5E3C]">
                {data.bank_account}
              </p>

              <p className="text-sm text-[#755545]">
                a.n.{" "}
                <span className="font-semibold text-[#4A2D1D]">
                  {data.account_name || "-"}
                </span>
              </p>

              <div className="mt-7">
                <CopyButton text={data.bank_account} />
              </div>
            </div>
            )}

            {hasQris && (
              <div className="rounded-[32px] border border-[#D5B477]/60 bg-[#FFF8EA]/95 p-8 text-center shadow-[0_16px_35px_rgba(78,48,24,0.14)]">
                <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-[#9A6A42]">
                  Pembayaran Digital
                </p>

                <h3 className="font-serif text-3xl text-[#4A2D1D]">
                  QRIS
                </h3>

                <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-[#755545]">
                  Silakan pindai kode QR berikut menggunakan aplikasi
                  bank atau dompet digital pilihan Anda.
                </p>

                <Image
                  src={data.qris_image}
                  alt="QRIS"
                  width={300}
                  height={300}
                  sizes="300px"
                  loading="lazy"
                  className="mx-auto mt-7 rounded-2xl border border-[#D5B477]/60 shadow-lg"
                />
              </div>
            )}

            {hasGiftAddress && (
              <div className="rounded-[32px] border border-[#D5B477]/60 bg-[#FFF8EA]/95 p-8 text-center shadow-[0_16px_35px_rgba(78,48,24,0.14)]">
                <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-[#9A6A42]">
                  Kirimkan Tanda Kasih
                </p>

                <h3 className="font-serif text-3xl text-[#4A2D1D]">
                  Alamat Pengiriman
                </h3>

                <div className="mx-auto my-6 h-px w-12 bg-[#C69A52]" />

                <p className="whitespace-pre-line text-sm leading-7 text-[#755545]">
                  {data.gift_address}
                </p>

                {data.gift_note && (
                  <>
                    <div className="mx-auto my-7 h-px w-16 bg-[#C69A52]/60" />

                    <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#9A6A42]">
                      Catatan Tambahan
                    </p>

                    <p className="italic leading-7 text-[#755545]">
                      {data.gift_note}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </MotionSection>
  );
}
