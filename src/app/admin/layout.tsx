"use client";

import AppShell from "@/lib/AppShell";
import { HospitalSettingsProvider, useHospitalSettings } from "@/lib/HospitalSettingsContext";

function ShellWithSettings({ children }: { children: React.ReactNode }) {
  const { settings } = useHospitalSettings();
  return <AppShell logoText={settings.hospitalName || undefined}>{children}</AppShell>;
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HospitalSettingsProvider>
      <ShellWithSettings>{children}</ShellWithSettings>
    </HospitalSettingsProvider>
  );
}