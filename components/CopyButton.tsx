"use client";
import { useState } from "react";
interface CopyButtonProps {
  text: string;
}
export default function CopyButton({
  text,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  } catch {
    console.error("Failed to copy account number.");
  }
};

  return (
<button
  onClick={handleCopy}
  disabled={copied}
  className="
    mt-6
    inline-flex
    items-center
    justify-center
    rounded-full
    px-8
    py-3
    font-medium
    text-white
    bg-gray-900
    hover:bg-black
    disabled:bg-emerald-600
    disabled:cursor-default
    transition-all
    duration-300
    shadow-lg
    hover:shadow-xl
    active:scale-95
  "
>
  {copied ? "✓ Copied" : "Copy Account Number"}
</button>
  );
}