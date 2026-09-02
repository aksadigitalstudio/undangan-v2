"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function BackToHome() {
  const pathname = usePathname();
  const [fromDashboard, setFromDashboard] = useState(false);

  useEffect(() => {
    setFromDashboard(new URLSearchParams(window.location.search).get("return") === "dashboard");
  }, []);

  if (pathname === "/") return null;

  const isTemplatePreview = pathname.startsWith("/templates/");
  const href = fromDashboard ? "/dashboard/invitations" : isTemplatePreview ? "/templates" : "/";
  const label = fromDashboard ? "Kembali ke Dashboard" : isTemplatePreview ? "Semua template" : "Kembali ke awal";

  return (
    <Link
      href={href}
      className="fixed left-4 top-4 z-[100] inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#182235]/90 px-4 py-2.5 text-xs font-bold text-white shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:bg-[#263653]"
    >
      <ArrowLeft size={14} /> {label}
    </Link>
  );
}
