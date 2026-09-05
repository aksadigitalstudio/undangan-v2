"use client";

import Link from "next/link";
import { LayoutDashboard, MailPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import AksaBrand from "@/components/AksaBrand";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/invitations", label: "Invitations", icon: MailPlus },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 flex-col bg-[#182235] p-5 text-white lg:flex">
      <Link href="/dashboard" className="px-3 py-3" aria-label="AKSA dashboard"><AksaBrand darkSurface /></Link>

      <p className="mt-10 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Workspace</p>
      <nav className="mt-3 space-y-1">
        {navigation.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active ? "bg-white/12 text-white" : "text-white/60 hover:bg-white/8 hover:text-white"}`}
            >
              <Icon size={17} strokeWidth={1.8} />
              {label}
            </Link>
          );
        })}
      </nav>

      <Link href="/" className="mt-auto px-3 py-3 text-xs font-semibold text-white/45 transition hover:text-white">← Visit AKSA website</Link>
    </aside>
  );
}
