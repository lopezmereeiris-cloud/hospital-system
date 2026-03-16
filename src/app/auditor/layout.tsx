"use client";

import AppShell from "@/lib/AppShell";
import type { NavItem } from "@/components/Sidebar/interface";
import { HospitalSettingsProvider, useHospitalSettings } from "@/lib/HospitalSettingsContext";

const auditorNavItems: NavItem[] = [
  { label: "Dashboard", path: "/auditor", icon: "dashboard" },
  { label: "YAKAP", path: "/auditor/yakap", icon: "yakap" },
  { label: "Patients", path: "/auditor/registration", icon: "register" },
  { label: "Appointments", path: "/auditor/appointments", icon: "calendar" },
  { label: "Medicine", path: "/auditor/inventory", icon: "inventory" },
  { label: "Rooms", path: "/auditor/rooms", icon: "rooms" },
  { label: "Doctors", path: "/auditor/doctors", icon: "doctors" },
  { label: "Billing", path: "/auditor/billing", icon: "billing" },
];

const auditorPageTitles: Record<string, string> = {
  "/auditor": "Dashboard",
  "/auditor/yakap": "YAKAP",
  "/auditor/registration": "Patients",
  "/auditor/appointments": "Appointments",
  "/auditor/inventory": "Medicine Inventory",
  "/auditor/rooms": "Room Management",
  "/auditor/doctors": "Doctor Directory",
  "/auditor/billing": "Billing",
  "/auditor/profile": "Profile",
  "/auditor/settings": "Settings",
};

function AuditorShell({ children }: { children: React.ReactNode }) {
  const { settings } = useHospitalSettings();

  return (
    <AppShell
      navItems={auditorNavItems}
      pageTitles={auditorPageTitles}
      logoText={settings.hospitalName || undefined}
    >
      {children}
    </AppShell>
  );
}

export default function AuditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HospitalSettingsProvider>
      <AuditorShell>{children}</AuditorShell>
    </HospitalSettingsProvider>
  );
}
