"use client";

import AppShell from "@/lib/AppShell";
import { NavItem } from "@/components/Sidebar/interface";

const clientNavItems: NavItem[] = [
  { label: "Dashboard", path: "/client", icon: "dashboard" },
  { label: "YAKAP Balance", path: "/client/yakap-balance", icon: "yakap" },
  { label: "Appointments", path: "/client/appointments", icon: "calendar" },
  { label: "Billing", path: "/client/billing", icon: "wallet" },
];

const clientPageTitles: Record<string, string> = {
  "/client": "Dashboard",
  "/client/yakap-balance": "YAKAP Balance",
  "/client/appointments": "Appointments",
  "/client/billing": "Billing",
  "/client/profile": "Profile",
  "/client/settings": "Settings",
};

export default function ClientDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell
      navItems={clientNavItems}
      pageTitles={clientPageTitles}
      logoText="Patient Portal"
    >
      {children}
    </AppShell>
  );
}
