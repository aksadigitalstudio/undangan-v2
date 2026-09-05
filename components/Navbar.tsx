"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, MailPlus } from "lucide-react";
import { supabase } from "@/lib/supabase";

const mobileNavigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/invitations", label: "Invitations", icon: MailPlus },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState("Admin");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email);
    });
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-[#182235]/10 bg-white/95 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden" aria-label="AKSA dashboard">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#182235] font-serif text-sm font-bold text-[#f3c777]">A</span>
          <span className="font-serif text-lg font-semibold text-[#182235]">AKSA</span>
        </Link>
        <p className="hidden text-sm font-medium text-[#687184] lg:block">Your invitation workspace</p>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="hidden max-w-48 truncate text-sm font-medium text-[#687184] sm:block">{email}</span>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-xl border border-[#182235]/12 px-3 py-2 text-xs font-bold text-[#182235] transition hover:bg-[#f8f5ef] sm:px-4 sm:text-sm"
          >
            <LogOut size={15} /> <span className="hidden sm:inline">Sign out</span>
          </button>
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e65d51] text-sm font-bold text-white">A</div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto border-t border-[#182235]/8 px-4 py-2.5 lg:hidden">
        {mobileNavigation.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold transition ${active ? "bg-[#182235] text-white" : "bg-[#f4f5f8] text-[#657087]"}`}
            >
              <Icon size={14} /> {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
