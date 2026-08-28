"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface InvitationCoverProps {
  groomName: string;
  brideName: string;
  guestName: string;
  galleryImages: string[];
}

export default function Cover({
  groomName,
  brideName,
  guestName,
  galleryImages,
}: InvitationCoverProps) {
const [opened, setOpened] = useState(false);

const [isClosing, setIsClosing] = useState(false);

const [currentImage, setCurrentImage] = useState(0);

const [previousImage, setPreviousImage] = useState(0);

const [isTransitioning, setIsTransitioning] = useState(false);

useEffect(() => {
  // A marketing preview must always start on its cover. On a real invitation,
  // retain state only for the current URL instead of every template globally.
  if (window.location.pathname.startsWith("/templates/")) return;

  const isOpened = sessionStorage.getItem(
    `invitation-opened:${window.location.pathname}`
  );

  if (isOpened === "true") {
    setOpened(true);
  }
}, []);

useEffect(() => {
  if (galleryImages.length <= 1) return;

  const timer = setTimeout(() => {
    setPreviousImage(currentImage);

    setCurrentImage((currentImage + 1) % galleryImages.length);

    setIsTransitioning(true);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);

  }, 5000);

  return () => clearTimeout(timer);

}, [currentImage, galleryImages]);
useEffect(() => {
  galleryImages.forEach((src) => {
const img = new window.Image();
    img.src = src;
  });
}, [galleryImages]);
if (opened) return null;

return (
<motion.div
  className="fixed inset-0 z-50 overflow-hidden"
  animate={{
    opacity: isClosing ? 0 : 1,
    scale: isClosing ? 1.04 : 1,
  }}
  transition={{
    duration: 0.5,
    ease: "easeInOut",
  }}
>

{galleryImages.length > 0 && (
  <div className="absolute inset-0 overflow-hidden">

    <motion.div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${galleryImages[previousImage]})`,
      }}
      animate={{
        opacity: isTransitioning ? 0 : 1,
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
    />

    <motion.div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${galleryImages[currentImage]})`,
      }}
      initial={false}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
    />

  </div>
)}
<div
  className="
    absolute
    inset-0
    z-[1]
    bg-gradient-to-b
from-[#3A2118]/80
via-[#3A2118]/55
to-[#3A2118]/80
    backdrop-blur-[2px]
  "
/>

<div className="relative z-[2] flex h-full items-center justify-center">

<div
  className="
    relative
    overflow-hidden
    text-center
text-[#3B2417]
    px-8
    py-12
    -mt-12
    mx-6
    rounded-[32px]
    border
border-[#D5A85C]/70
bg-[#F8EEDC]/95
shadow-[0_20px_60px_rgba(43,26,18,0.35)]
  "
>  <Image
    src="/decor/sekar-sogan/foreground/sekar-sogan-ornament.png"
    alt=""
    fill
    priority
    sizes="(max-width: 768px) 100vw, 480px"
    className="pointer-events-none absolute inset-0 z-0 object-contain object-bottom opacity-40"
  />
  <div
    className="
      pointer-events-none
      absolute
      inset-0
      rounded-[32px]
      bg-gradient-to-br
      from-white/12
      via-transparent
      to-transparent
    "
  />

  <div className="relative z-10">

<motion.p
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.15 }}
  className="uppercase tracking-[0.35em] text-sm mb-10"
>
  PAWIWAHAN
</motion.p>

<motion.h1
  initial={{ opacity: 0, y: 18 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.35 }}
  className="text-5xl font-serif leading-tight mb-12"
>
  {groomName.split(" ")[0]}
  <br />
  &
  <br />
  {brideName.split(" ")[0]}
</motion.h1>
<div className="flex flex-col items-center gap-6">
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.6 }}
  className="
    inline-flex
    flex-col
    items-center
    rounded-2xl
    border
    border-white/15
    bg-black/10
    px-8
    py-5
  "
>
<p className="uppercase tracking-[0.28em] text-[11px] text-[#6B4B34]/80 mb-2">
  Kepada Yth.
</p>

<p className="text-xl font-medium">
  {guestName || "Bapak / Ibu / Saudara/i"}
</p>
</motion.div>

<motion.button
onClick={() => {
  // This runs inside the user gesture, so mobile browsers allow the music.
  window.dispatchEvent(new CustomEvent("invitation-opened"));
  setIsClosing(true);

  setTimeout(() => {
    if (!window.location.pathname.startsWith("/templates/")) {
      sessionStorage.setItem(
        `invitation-opened:${window.location.pathname}`,
        "true"
      );
    }

    setOpened(true);
  }, 500);
}}
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.55, delay: 0.8 }}

className="
    group
    inline-flex
    items-center
    justify-center
    gap-3
    rounded-full
bg-[#6B2A2A]
    px-11
    py-5
    text-[15px]
    font-medium
    tracking-[0.12em]
text-[#FFF8E8]
    shadow-[0_12px_35px_rgba(0,0,0,0.18)]
    transition-all
    duration-300
    hover:scale-[1.03]
    hover:-translate-y-0.5
    hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)]
    active:scale-[0.98]
  "
>
<span className="text-xl leading-none">✦</span>

<span>Buka Undangan</span>

<svg
    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14m-5-5 5 5-5 5"
    />
  </svg>
</motion.button>
</div>
  </div>

</div>

    </div>

</motion.div>
);
}
