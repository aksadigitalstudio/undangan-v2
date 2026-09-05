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

  // Marketing and account pages already have a complete header with the AKSA
  // mark linking home. A second floating button there competes with that
  // navigation and makes the layout feel unfinished.
  const hasPrimaryNavigation = ["/", "/templates", "/pricing", "/login", "/signup"].includes(pathname);
  if (hasPrimaryNavigation) return null;

  const isTemplatePreview = pathname.startsWith("/templates/");
  const href = fromDashboard ? "/dashboard/invitations" : isTemplatePreview ? "/templates" : "/";
  const label = fromDashboard ? "Return to dashboard" : isTemplatePreview ? "Explore templates" : "AKSA home";

  return (
    <Link
      href={href}
      className="fixed left-5 top-5 z-[100] inline-flex items-center gap-2 rounded-full border border-[#182235]/10 bg-white/90 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#182235] shadow-[0_10px_30px_rgba(24,34,53,0.12)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#e65d51]/40 hover:text-[#c94d43] sm:left-7 sm:top-7"
    >
      <ArrowLeft size={14} strokeWidth={1.75} /> {label}
    </Link>
  );
}
