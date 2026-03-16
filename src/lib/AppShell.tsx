"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "@/theme/theme";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { NavItem } from "@/components/Sidebar/interface";

import { palette } from "@/theme/palette";
const EXPANDED_WIDTH = 260;
const COLLAPSED_WIDTH = 78;

const MainWrapper = styled("div")(({ theme: t }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: t.palette.background.default,
}));

const ContentArea = styled("main", {
  shouldForwardProp: (prop) => prop !== "sidebarWidth",
})<{ sidebarWidth: number }>(({ theme: t, sidebarWidth }) => ({
  flexGrow: 1,
  minWidth: 0,
  overflowX: "hidden",
  padding: t.spacing(3),
  marginTop: 68,
  transition: "margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
  [t.breakpoints.up("md")]: {
    marginLeft: sidebarWidth,
  },
  [t.breakpoints.down("sm")]: {
    padding: t.spacing(2),
  },
}));

const defaultPageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/yakap": "YAKAP",
  "/admin/registration": "Patients",
  "/admin/appointments": "Appointments",
  "/admin/inventory": "Medicine Inventory",
  "/admin/rooms": "Room Management",
  "/admin/doctors": "Doctor Directory",
  "/admin/billing": "Billing",
  "/admin/settings": "Settings",
};

function getPageTitle(pathname: string, titles: Record<string, string>): string {
  if (titles[pathname]) {
    return titles[pathname];
  }

  // Walk up the path to find the closest match
  const segments = pathname.split("/");
  while (segments.length > 1) {
    segments.pop();
    const parent = segments.join("/");
    if (titles[parent]) return titles[parent];
  }

  return "Dashboard";
}

interface AppShellProps {
  children: React.ReactNode;
  navItems?: NavItem[];
  pageTitles?: Record<string, string>;
  logoText?: string;
}

export default function AppShell({ children, navItems, pageTitles, logoText }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const currentSidebarWidth = isDesktop ? (collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH) : 0;
  const titles = pageTitles || defaultPageTitles;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainWrapper>
        <Sidebar
          open={sidebarOpen}
          collapsed={collapsed}
          onClose={() => setSidebarOpen(false)}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          currentPath={pathname}
          navItems={navItems}
          logoText={logoText}
        />
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title={getPageTitle(pathname, titles)}
          sidebarWidth={currentSidebarWidth}
        />
        <ContentArea sidebarWidth={currentSidebarWidth}>
          {children}
        </ContentArea>
      </MainWrapper>
    </ThemeProvider>
  );
}
