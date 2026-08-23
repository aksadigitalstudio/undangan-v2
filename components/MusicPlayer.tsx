"use client";

import { useEffect, useRef, useState } from "react";

interface MusicPlayerProps {
  musicUrl: string;
}

export default function MusicPlayer({
  musicUrl,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

useEffect(() => {
  if (playing) {
    audioRef.current?.play().catch(() => {});
  } else {
    audioRef.current?.pause();
  }
}, [playing]);
useEffect(() => {
  function handleInvitationOpened() {
    setPlaying(true);
  }

function handleVisibilityChange() {
  if (document.hidden) {
    audioRef.current?.pause();
  } else if (playing) {
    audioRef.current?.play().catch(() => {});
  }
}

  window.addEventListener(
    "invitation-opened",
    handleInvitationOpened
  );

  document.addEventListener(
    "visibilitychange",
    handleVisibilityChange
  );

  return () => {
    window.removeEventListener(
      "invitation-opened",
      handleInvitationOpened
    );

    document.removeEventListener(
      "visibilitychange",
      handleVisibilityChange
    );
  };
}, [playing]);

  return (
    <>
<audio
  ref={audioRef}
  src={musicUrl}
  preload="metadata"
  loop
/>

<button
  type="button"
  aria-label={playing ? "Pause background music" : "Play background music"}
  onClick={() => setPlaying(!playing)}
  className={`
fixed
bottom-6
right-6
z-50
flex
h-14
w-14
items-center
justify-center
rounded-full
border
border-white/20
bg-gray-900/90
text-white
backdrop-blur-md
shadow-xl
transition-all
duration-300
hover:scale-105
hover:bg-black
active:scale-95
${playing ? " scale-110 shadow-2xl" : ""}
`}
>
          {playing ? "⏸" : "▶"}
      </button>
    </>
  );
}