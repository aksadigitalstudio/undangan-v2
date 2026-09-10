import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { isAksaAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const showOrders = isAksaAdmin(user?.email);

  return (
    <div className="flex min-h-screen bg-[#f4f5f8]">
      <Sidebar showOrders={showOrders} />

      <div className="min-w-0 flex-1">
        <Navbar showOrders={showOrders} />

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
