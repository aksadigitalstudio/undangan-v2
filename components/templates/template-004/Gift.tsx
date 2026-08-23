"use client";

import Image from "next/image";
import { useState } from "react";
import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import MotionSection from "@/components/motion/MotionSection";

type GiftTab = "bank" | "qris" | "address";



export default function Gift({ invitation }: TemplateProps) {
  const data = invitation;
  const [activeTab, setActiveTab] = useState<GiftTab>("bank");
  const [copied, setCopied] = useState(false);

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  if (!sections.gift) {
    return null;
  }

  async function copyAccountNumber() {
    if (!data.bank_account) return;

    await navigator.clipboard.writeText(data.bank_account);
    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <MotionSection>
      <section className="relative z-10 overflow-hidden bg-[#760A13] px-5 py-24 md:py-32">
        <style>{`
          @keyframes imperial-gift-sparkle-left {
            0% {
              transform: translate3d(-90px, 50px, 0) rotate(0deg) scale(0.6);
              opacity: 0;
            }

            18% {
              opacity: 0.72;
            }

            72% {
              opacity: 0.48;
            }

            100% {
              transform: translate3d(280px, -120px, 0) rotate(180deg) scale(1.15);
              opacity: 0;
            }
          }

          @keyframes imperial-gift-sparkle-right {
            0% {
              transform: translate3d(90px, -40px, 0) rotate(0deg) scale(0.6);
              opacity: 0;
            }

            18% {
              opacity: 0.72;
            }

            72% {
              opacity: 0.48;
            }

            100% {
              transform: translate3d(-280px, 120px, 0) rotate(-180deg) scale(1.15);
              opacity: 0;
            }
          }

          .imperial-gift-sparkle-left {
            animation: imperial-gift-sparkle-left 10s linear infinite;
          }

          .imperial-gift-sparkle-right {
            animation: imperial-gift-sparkle-right 12s linear infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .imperial-gift-sparkle-left,
            .imperial-gift-sparkle-right {
              animation: none;
            }
          }
        `}</style>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#A41720]/85 via-[#710911]/92 to-[#450309]/95" />

        <div
          className="pointer-events-none absolute left-[5%] top-[28%] z-[2] text-5xl text-[#F7C85D]/75"
          aria-hidden="true"
        >
          <span className="imperial-gift-sparkle-left block">✦</span>
        </div>

        <div
          className="pointer-events-none absolute left-[10%] top-[76%] z-[2] text-4xl text-[#FFF0B7]/60"
          aria-hidden="true"
        >
          <span
            className="imperial-gift-sparkle-left block"
            style={{ animationDelay: "-5s" }}
          >
            ✧
          </span>
        </div>

        <div
          className="pointer-events-none absolute right-[5%] top-[40%] z-[2] text-5xl text-[#F7C85D]/75"
          aria-hidden="true"
        >
          <span className="imperial-gift-sparkle-right block">✦</span>
        </div>

        <div
          className="pointer-events-none absolute right-[10%] top-[84%] z-[2] text-4xl text-[#FFF0B7]/60"
          aria-hidden="true"
        >
          <span
            className="imperial-gift-sparkle-right block"
            style={{ animationDelay: "-6s" }}
          >
            ✧
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <p className="text-[10px] uppercase tracking-[0.6em] text-[#FFE4A1]">
              礼金祝福
            </p>

            <div className="mx-auto my-6 h-px w-20 bg-[#F7C85D]" />

            <h2 className="font-serif text-4xl text-[#FFF5D7] md:text-5xl">
              Wedding Gift
            </h2>

            <p className="mx-auto mt-5 max-w-md font-serif text-sm italic leading-7 text-[#FFEAC0]">
              Your presence is our greatest gift. For those who wish to
              share their blessings, the details are available below.
            </p>
          </div>

          <div className="overflow-hidden rounded-t-[110px] border-4 border-[#F2CA69] bg-[#FFF4D6] px-5 pb-8 pt-14 shadow-[0_22px_52px_rgba(42,0,5,0.42)] md:px-10 md:pb-12 md:pt-16">
            <div className="pointer-events-none absolute" />

            <div className="mx-auto mb-10 flex max-w-md rounded-full border border-[#D99A54] bg-[#F8E4AA] p-1">
              <button
                type="button"
                onClick={() => setActiveTab("bank")}
                className={`flex-1 rounded-full px-3 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] transition md:text-[10px] ${
                  activeTab === "bank"
                    ? "bg-[#B71925] text-[#FFF7DD] shadow-md"
                    : "text-[#7B241E] hover:bg-[#F4D38B]"
                }`}
              >
                Bank Account
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("qris")}
                className={`flex-1 rounded-full px-3 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] transition md:text-[10px] ${
                  activeTab === "qris"
                    ? "bg-[#B71925] text-[#FFF7DD] shadow-md"
                    : "text-[#7B241E] hover:bg-[#F4D38B]"
                }`}
              >
                QRIS
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("address")}
                className={`flex-1 rounded-full px-3 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] transition md:text-[10px] ${
                  activeTab === "address"
                    ? "bg-[#B71925] text-[#FFF7DD] shadow-md"
                    : "text-[#7B241E] hover:bg-[#F4D38B]"
                }`}
              >
                Address
              </button>
            </div>

            {activeTab === "bank" && (
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.45em] text-[#A30F1B]">
                  Bank Transfer
                </p>

                <h3 className="mt-4 font-serif text-3xl text-[#7A171D] md:text-4xl">
                  {data.bank_name || "Bank Account"}
                </h3>

                <div className="mx-auto my-6 h-px w-14 bg-[#C89B3C]" />

                <p className="text-[10px] uppercase tracking-[0.35em] text-[#9A4A35]">
                  Account Number
                </p>

                <p className="mt-4 break-all font-serif text-3xl tracking-[0.08em] text-[#A30F1B] md:text-4xl">
                  {data.bank_account || "-"}
                </p>

                <p className="mt-4 font-serif italic text-[#7A2C27]">
                  a.n. {data.account_name || "-"}
                </p>

                {data.bank_account && (
                  <button
                    type="button"
                    onClick={copyAccountNumber}
                    className="mt-8 rounded-full bg-[#B71925] px-8 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFF7DD] shadow-lg transition hover:bg-[#D22533]"
                  >
                    {copied ? "Copied!" : "Copy Account Number"}
                  </button>
                )}
              </div>
            )}

            {activeTab === "qris" && (
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.45em] text-[#A30F1B]">
                  Digital Payment
                </p>

                <h3 className="mt-4 font-serif text-3xl text-[#7A171D] md:text-4xl">
                  QRIS
                </h3>

                <p className="mx-auto mt-4 max-w-sm font-serif text-sm italic leading-7 text-[#7A2C27]">
                  Scan the QR code below using your preferred banking or
                  digital wallet application.
                </p>

                {data.qris_image ? (
                  <Image
                    src={data.qris_image}
                    alt="QRIS payment code"
                    width={320}
                    height={320}
                    sizes="320px"
                    className="mx-auto mt-8 rounded-2xl border-4 border-[#E4C26D] bg-white p-2 shadow-[0_14px_30px_rgba(92,15,18,0.20)]"
                  />
                ) : (
                  <p className="mt-8 font-serif italic text-[#8A2A24]">
                    QRIS image is not available yet.
                  </p>
                )}
              </div>
            )}

            {activeTab === "address" && (
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-[0.45em] text-[#A30F1B]">
                  Send a Gift
                </p>

                <h3 className="mt-4 font-serif text-3xl text-[#7A171D] md:text-4xl">
                  Delivery Address
                </h3>

                <div className="mx-auto my-6 h-px w-14 bg-[#C89B3C]" />

                <p className="mx-auto max-w-md whitespace-pre-line font-serif text-base italic leading-8 text-[#7A2C27]">
                  {data.gift_address ||
                    "Delivery address is not available yet."}
                </p>

                {data.gift_note && (
                  <div className="mx-auto mt-8 max-w-md border-t border-[#D9AE59]/60 pt-6">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#A30F1B]">
                      A Special Note
                    </p>

                    <p className="mt-4 font-serif italic leading-7 text-[#7A2C27]">
                      {data.gift_note}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </MotionSection>
  );
}
