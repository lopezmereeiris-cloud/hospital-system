import type { Metadata } from "next";
import "@/styles/globals.css";
import AppShell from "@/lib/AppShell";

export const metadata: Metadata = {
  title: "MedAdmin - Hospital Administration Dashboard",
  description: "Hospital administration dashboard for managing patients, appointments, and medicine inventory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
