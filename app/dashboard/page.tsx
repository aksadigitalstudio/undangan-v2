"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import {
  LayoutDashboard,
  Globe,
  FileText,
  Users,
  CheckCircle2,
  XCircle,
  Clock3,
  BarChart3,
} from "lucide-react";

export default function DashboardPage() {
const [totalInvitations, setTotalInvitations] = useState(0);
const [publishedInvitations, setPublishedInvitations] = useState(0);
const [draftInvitations, setDraftInvitations] = useState(0);
const [totalGuests, setTotalGuests] = useState(0);
const [attendingGuests, setAttendingGuests] = useState(0);
const [declinedGuests, setDeclinedGuests] = useState(0);
const [pendingGuests, setPendingGuests] = useState(0);
const [attendanceRate, setAttendanceRate] = useState(0);
const [loading, setLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState("");
useEffect(() => {
  loadDashboardStats();
}, []);

async function loadDashboardStats() {
  const [
    totalResult,
    publishedResult,
    draftResult,
    totalGuestsResult,
    attendingResult,
    declinedResult,
    pendingResult,
  ] = await Promise.all([
    supabase
      .from("invitations")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("invitations")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "Published"),

    supabase
      .from("invitations")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "Draft"),

    supabase
      .from("guests")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("guests")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("rsvp_status", "attending"),

    supabase
      .from("guests")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("rsvp_status", "declined"),

    supabase
      .from("guests")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("rsvp_status", "pending"),
  ]);

if (
  totalResult.error ||
  publishedResult.error ||
  draftResult.error ||
  totalGuestsResult.error ||
  attendingResult.error ||
  declinedResult.error ||
  pendingResult.error
) {
  setErrorMessage(
    "Statistik belum dapat dimuat. Terapkan migration Supabase dan pastikan undangan lama sudah memiliki owner admin."
  );
  setLoading(false);
  return;
}

setTotalInvitations(totalResult.count ?? 0);
setPublishedInvitations(publishedResult.count ?? 0);
setDraftInvitations(draftResult.count ?? 0);

const totalGuests = totalGuestsResult.count ?? 0;
const attendingGuests = attendingResult.count ?? 0;

setTotalGuests(totalGuests);
setAttendingGuests(attendingGuests);
setDeclinedGuests(declinedResult.count ?? 0);
setPendingGuests(pendingResult.count ?? 0);

const rate =
  totalGuests > 0
    ? (attendingGuests / totalGuests) * 100
    : 0;

setAttendanceRate(Number(rate.toFixed(1)));
setLoading(false);
}
if (loading) {
  return <DashboardSkeleton />;
}

if (errorMessage) {
  return (
    <div className="max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
      <h1 className="text-2xl font-bold">Dashboard membutuhkan konfigurasi Supabase</h1>
      <p className="mt-3 leading-7">{errorMessage}</p>
      <p className="mt-3 text-sm leading-6">
        Ikuti langkah di <code>SUPABASE_DEPLOYMENT.md</code>, lalu muat ulang halaman ini.
      </p>
    </div>
  );
}

return (
    <>
      <h1 className="text-4xl font-bold text-black mb-8">
        Dashboard
      </h1>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
  <div className="flex items-center justify-between">
    <h2 className="text-sm font-medium text-gray-500">
      Total Undangan
    </h2>

<div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
  <LayoutDashboard
    size={18}
    className="text-blue-600"
  />
</div>
  </div>

  <p className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
    {totalInvitations}
  </p>
</div>

<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
  <div className="flex items-center justify-between">
    <h2 className="text-sm font-medium text-gray-500">
      Published
    </h2>

<div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
  <Globe
    size={18}
    className="text-green-600"
  />
</div>
  </div>

  <p className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
    {publishedInvitations}
  </p>
</div>

<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
  <div className="flex items-center justify-between">
    <h2 className="text-sm font-medium text-gray-500">
      Draft
    </h2>

<div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100">
  <FileText
    size={18}
    className="text-yellow-600"
  />
</div>
  </div>

  <p className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
    {draftInvitations}
  </p>
</div>

<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
  <div className="flex items-center justify-between">
    <h2 className="text-sm font-medium text-gray-500">
      Total Guests
    </h2>

<div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
  <Users
    size={18}
    className="text-indigo-600"
  />
</div>
  </div>

  <p className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
    {totalGuests}
  </p>
</div>

<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
  <div className="flex items-center justify-between">
    <h2 className="text-sm font-medium text-gray-500">
      Attending
    </h2>

<div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
  <CheckCircle2
    size={18}
    className="text-green-600"
  />
</div>
  </div>

  <p className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
    {attendingGuests}
  </p>
</div>

<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
  <div className="flex items-center justify-between">
    <h2 className="text-sm font-medium text-gray-500">
      Declined
    </h2>

<div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100">
  <XCircle
    size={18}
    className="text-red-600"
  />
</div>
  </div>

  <p className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
    {declinedGuests}
  </p>
</div>

<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
  <div className="flex items-center justify-between">
    <h2 className="text-sm font-medium text-gray-500">
      Pending
    </h2>

<div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100">
  <Clock3
    size={18}
    className="text-orange-600"
  />
</div>
  </div>

  <p className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
    {pendingGuests}
  </p>
</div>

<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
  <div className="flex items-center justify-between">
    <h2 className="text-sm font-medium text-gray-500">
      Attendance Rate
    </h2>

<div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100">
  <BarChart3
    size={18}
    className="text-purple-600"
  />
</div>
  </div>

  <p className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
    {attendanceRate}%
  </p>
</div>
      </div>
    </>
  );
}
