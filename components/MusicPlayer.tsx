"use client";

import { useEffect, useRef, useState } from "react";

interface MusicPlayerProps {
  musicUrl: string;
}

export default function MusicPlayer({
  musicUrl,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const demoContextRef = useRef<AudioContext | null>(null);
  const demoTimerRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const isDemo = musicUrl === "__aksa_demo_music__";

useEffect(() => {
  if (isDemo) {
    if (!playing) {
      if (demoTimerRef.current) window.clearInterval(demoTimerRef.current);
      demoTimerRef.current = null;
      demoContextRef.current?.suspend();
      return;
    }

    const context = demoContextRef.current ?? new AudioContext();
    demoContextRef.current = context;
    void context.resume();

    const playChord = () => {
      [261.63, 329.63, 392, 523.25].forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0, context.currentTime);
        gain.gain.linearRampToValueAtTime(0.045, context.currentTime + 0.08 + index * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1.8);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 1.9);
      });
    };

    playChord();
    demoTimerRef.current = window.setInterval(playChord, 3200);
    return () => {
      if (demoTimerRef.current) window.clearInterval(demoTimerRef.current);
      demoTimerRef.current = null;
    };
  }

  if (playing) {
    audioRef.current?.play().catch(() => {});
  } else {
    audioRef.current?.pause();
  }
}, [isDemo, playing]);
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
{!isDemo && <audio
  ref={audioRef}
  src={musicUrl}
  preload="metadata"
  loop
/>}

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
