import type { Metadata } from "next";
import DashboardClient from "@/components/dashboard/dashboard-client";

export const metadata: Metadata = {
  title: "Dashboard | Tutor Lab",
};

export default function DashboardPage() {
  return (
    <main>
      <DashboardClient />
    </main>
  );
}