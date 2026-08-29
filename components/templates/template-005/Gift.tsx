import Image from "next/image";
import type { TemplateProps } from "../types";
import CopyButton from "@/components/CopyButton";
import MotionSection from "@/components/motion/MotionSection";
import { getEditorialSections } from "./shared";

export default function Gift({ invitation }: TemplateProps) {
  const sections = getEditorialSections(invitation);
  const hasBank = Boolean(invitation.bank_account?.trim());
  const hasQris = Boolean(invitation.qris_image?.trim());
  const hasAddress = Boolean(invitation.gift_address?.trim());
  if (!sections.gift || (!hasBank && !hasQris && !hasAddress)) return null;
  return (
    <MotionSection>
      <section className="relative z-10 bg-[#f5f2ed] px-5 py-24 text-[#171717] sm:px-8 md:py-32"><style>{`.the-edit-gift button{border-radius:0!important;background:#171717!important;color:#fff!important}`}</style><div className="mx-auto max-w-4xl"><div className="mb-14 border-b border-[#171717]/20 pb-6"><p className="text-[10px] font-bold uppercase tracking-[0.42em] text-[#756d64]">With love</p><h2 className="mt-4 font-serif text-5xl sm:text-6xl">A thoughtful gift.</h2><p className="mt-5 max-w-lg text-sm leading-6 text-[#625c55]">Your presence and prayers are the greatest gift. Should you wish to send a token of love, the details are below.</p></div><div className="the-edit-gift grid gap-8 md:grid-cols-2">{hasBank && <article className="border-t border-[#171717]/25 pt-5"><p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#756d64]">Bank transfer</p><h3 className="mt-4 font-serif text-3xl">{invitation.bank_name || "Bank Account"}</h3><p className="mt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#756d64]">Account number</p><p className="mt-3 break-all font-serif text-3xl tracking-[0.06em]">{invitation.bank_account}</p><p className="mt-4 text-sm text-[#625c55]">a.n. {invitation.account_name || "-"}</p><div className="mt-6"><CopyButton text={invitation.bank_account} /></div></article>}{hasQris && <article className="border-t border-[#171717]/25 pt-5"><p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#756d64]">Digital payment</p><h3 className="mt-4 font-serif text-3xl">QRIS</h3><div className="mt-7 w-fit border border-[#171717]/20 bg-white p-3"><Image src={invitation.qris_image} alt="QRIS" width={260} height={260} className="h-auto w-52" /></div></article>}{hasAddress && <article className="border-t border-[#171717]/25 pt-5 md:col-span-2"><p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#756d64]">Send a gift</p><h3 className="mt-4 font-serif text-3xl">Delivery address</h3><p className="mt-5 max-w-xl whitespace-pre-line text-sm leading-7 text-[#625c55]">{invitation.gift_address}</p>{invitation.gift_note && <p className="mt-4 max-w-xl text-sm italic leading-7 text-[#625c55]">{invitation.gift_note}</p>}</article>}</div></div></section>
    </MotionSection>
  );
}
