"use doctor";

import AppShell from "@/lib/AppShell";
import { NavItem } from "@/components/Sidebar/interface";

const doctorNavItems: NavItem[] = [
  { label: "Dashboard", path: "/doctor", icon: "dashboard" },
  { label: "Schedule", path: "/doctor/schedule", icon: "calendar" },
  { label: "Patients", path: "/doctor/patients", icon: "register" },
];

const doctorPageTitles: Record<string, string> = {
  "/doctor": "Dashboard",
  "/doctor/schedule": "Schedule",
  "/doctor/patients": "Patients",
};

export default function doctorDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell
      navItems={doctorNavItems}
      pageTitles={doctorPageTitles}
      logoText="Patient Portal"
    >
      {children}
    </AppShell>
  );
}
