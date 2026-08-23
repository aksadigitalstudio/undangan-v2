import Image from "next/image";
import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionSection from "@/components/motion/MotionSection";
import CopyButton from "@/components/CopyButton";
import SundaSectionOrnament from "./SundaSectionOrnament";

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
      <section className="relative z-10 overflow-hidden bg-[#FCF8ED] px-5 py-24 md:py-32">
        <style>{`
          .sunda-gift button {
            background: #5F805D !important;
            color: #FFFFFF !important;
          }

          .sunda-gift button:hover {
            background: #214D3C !important;
          }
        `}</style>

<div
  className="pointer-events-none absolute inset-0 z-0"
  aria-hidden="true"
>
  <SundaSectionOrnament />
</div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-[#9C7A38]">
              Tanda Kasih
            </p>

            <div className="mx-auto mb-6 h-px w-20 bg-[#B89B5E]" />

            <h2 className="font-serif text-4xl text-[#214D3C] md:text-5xl">
              Hadiah Pernikahan
            </h2>

            <p className="mx-auto mt-5 max-w-md font-serif text-sm italic leading-7 text-[#52705A]">
              Kehadiran dan doa restu Anda adalah hadiah terindah bagi
              kami. Namun, bila berkenan berbagi tanda kasih, berikut
              informasinya.
            </p>
          </div>

          <div className="sunda-gift space-y-14">
            {hasBankAccount && (
              <div className="border-y border-[#B7C9AF]/70 py-10 text-center">
                <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-[#71916E]">
                  Transfer Bank
                </p>

                <h3 className="font-serif text-3xl text-[#214D3C]">
                  {data.bank_name || "Transfer Bank"}
                </h3>

                <div className="mx-auto my-6 h-px w-14 bg-[#B89B5E]" />

                <p className="text-[10px] uppercase tracking-[0.35em] text-[#71916E]">
                  Nomor Rekening
                </p>

                <p className="my-4 break-all font-serif text-3xl tracking-[0.08em] text-[#214D3C]">
                  {data.bank_account}
                </p>

                <p className="text-sm text-[#52705A]">
                  a.n.{" "}
                  <span className="font-semibold text-[#214D3C]">
                    {data.account_name || "-"}
                  </span>
                </p>

                <div className="mt-7">
                  <CopyButton text={data.bank_account} />
                </div>
              </div>
            )}

            {hasQris && (
              <div className="border-y border-[#B7C9AF]/70 py-10 text-center">
                <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-[#9C7A38]">
                  Pembayaran Digital
                </p>

                <h3 className="font-serif text-3xl text-[#214D3C]">
                  QRIS
                </h3>

                <p className="mx-auto mt-4 max-w-sm font-serif text-sm italic leading-7 text-[#52705A]">
                  Silakan pindai kode QR berikut menggunakan aplikasi
                  bank atau dompet digital pilihan Anda.
                </p>

                <div className="mx-auto mt-7 w-fit rounded-[26px] border border-[#C8D7C0] bg-white p-3 shadow-lg">
                  <Image
                    src={data.qris_image}
                    alt="QRIS"
                    width={300}
                    height={300}
                    sizes="300px"
                    loading="lazy"
                    className="rounded-2xl"
                  />
                </div>
              </div>
            )}

            {hasGiftAddress && (
              <div className="border-y border-[#B7C9AF]/70 py-10 text-center">
                <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-[#71916E]">
                  Kirimkan Tanda Kasih
                </p>

                <h3 className="font-serif text-3xl text-[#214D3C]">
                  Alamat Pengiriman
                </h3>

                <div className="mx-auto my-6 h-px w-14 bg-[#B89B5E]" />

                <p className="whitespace-pre-line font-serif text-sm italic leading-7 text-[#52705A]">
                  {data.gift_address}
                </p>

                {data.gift_note && (
                  <>
                    <div className="mx-auto my-7 h-px w-16 bg-[#B7C9AF]" />

                    <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#71916E]">
                      Catatan Tambahan
                    </p>

                    <p className="font-serif italic leading-7 text-[#52705A]">
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
