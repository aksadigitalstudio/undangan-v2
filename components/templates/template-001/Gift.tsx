import Image from "next/image";
import type { TemplateProps } from "../types";
import { defaultSections } from "@/lib/defaultSections";
import { themes } from "@/lib/themes";
import MotionGroup from "@/components/motion/MotionGroup";
import MotionItem from "@/components/motion/MotionItem";
import MotionSection from "@/components/motion/MotionSection";
import CopyButton from "@/components/CopyButton";

export default function Gift({ invitation }: TemplateProps) {
  const data = invitation;

  const sections = {
    ...defaultSections,
    ...(data.sections ?? {}),
  };

  const currentTheme =
    themes[data.theme as keyof typeof themes] ??
    themes["elegant-gold"];

  if (!sections.gift) {
    return null;
  }

  return (
    <MotionSection>
      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <MotionGroup>
            <MotionItem>
              <p
                className="mb-3 text-sm uppercase tracking-[0.45em]"
                style={{
                  color: "#FFFFFF",
                  textShadow: "0 2px 8px rgba(0,0,0,0.45)",
                }}
              >
                Gift Registry
              </p>
            </MotionItem>

            <MotionItem>
              <h2
                className="mb-8 font-serif text-5xl text-white md:text-6xl"
                style={{
                  WebkitTextStroke: "1px rgba(0,0,0,0.45)",
                  textShadow: "0 4px 18px rgba(0,0,0,0.35)",
                }}
              >
                A Gift of Love
              </h2>
            </MotionItem>

            <MotionItem>
              <p
                className="mx-auto mb-12 max-w-2xl leading-9"
                style={{
                  color: "rgba(255,255,255,0.82)",
                  textShadow: "0 2px 8px rgba(0,0,0,0.45)",
                }}
              >
                Your presence is the greatest blessing to us.
                <br />
                If you wish to celebrate this special day with a gift,
                <br />
                kindly find the details below.
              </p>
            </MotionItem>
          </MotionGroup>

          <MotionGroup>
            <MotionItem>
              <div
                className="rounded-3xl border p-10 shadow-xl"
                style={{
                  background: currentTheme.card,
                  borderColor: currentTheme.divider,
                }}
              >
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gray-500">
                  Bank
                </p>

                <h3
                  className="mb-8 text-2xl font-semibold"
                  style={{ color: currentTheme.text }}
                >
                  {data.bank_name}
                </h3>

                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gray-500">
                  Account Number
                </p>

                <p
                  className="mb-8 text-4xl font-bold tracking-[0.15em]"
                  style={{ color: currentTheme.accent }}
                >
                  {data.bank_account}
                </p>

                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gray-500">
                  Account Holder
                </p>

                <p
                  className="text-xl font-semibold"
                  style={{ color: currentTheme.text }}
                >
                  {data.account_name}
                </p>

                <CopyButton text={data.bank_account} />

                {data.qris_image && (
                  <div
                    className="mt-10 rounded-3xl border p-8 text-center"
                    style={{
                      background: currentTheme.card,
                      borderColor: currentTheme.divider,
                    }}
                  >
                    <h3
                      className="mb-3 text-2xl font-semibold"
                      style={{ color: currentTheme.text }}
                    >
                      QRIS
                    </h3>

                    <p
                      className="mb-8 text-sm"
                      style={{
                        color: currentTheme.text,
                        opacity: 0.7,
                      }}
                    >
                      Scan using your preferred banking or e-wallet application.
                    </p>

                    <Image
                      src={data.qris_image}
                      alt="QRIS"
                      width={300}
                      height={300}
                      quality={85}
                      sizes="300px"
                      loading="lazy"
                      className="mx-auto rounded-2xl shadow-lg"
                    />
                  </div>
                )}

                <div
                  className="mt-10 rounded-3xl border p-10 shadow-xl"
                  style={{
                    background: currentTheme.card,
                    borderColor: currentTheme.divider,
                  }}
                >
                  <h3
                    className="mb-4 text-2xl font-semibold"
                    style={{ color: currentTheme.text }}
                  >
                    Gift Delivery Address
                  </h3>

                  <p
                    className="whitespace-pre-line"
                    style={{ color: currentTheme.text }}
                  >
                    {data.gift_address}
                  </p>

                  {data.gift_note && (
                    <>
                      <div
                        className="my-8 h-px"
                        style={{ background: currentTheme.divider }}
                      />

                      <h4
                        className="mb-3 text-sm font-semibold uppercase tracking-wider"
                        style={{
                          color: currentTheme.text,
                          opacity: 0.7,
                        }}
                      >
                        Additional Note
                      </h4>

                      <p
                        className="italic leading-relaxed"
                        style={{
                          color: currentTheme.text,
                          opacity: 0.75,
                        }}
                      >
                        {data.gift_note}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </MotionItem>
          </MotionGroup>
        </div>
      </section>
    </MotionSection>
  );
}