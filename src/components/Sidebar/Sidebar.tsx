"use client";

import React from "react";
import Link from "next/link";
import List from "@mui/material/List";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import { SidebarProps, NavItem } from "./interface";
import {
  SidebarDrawer,
  LogoContainer,
  LogoText,
  NavItemButton,
  NavLabel,
  SectionLabel,
  CollapseToggle,
  CollapseLabel,
} from "./elements";
import { navIcons } from "./icons";

const defaultNavItems: NavItem[] = [
  { label: "Dashboard", path: "/admin", icon: "dashboard" },
  { label: "YAKAP", path: "/admin/yakap", icon: "yakap" },
  { label: "Patients", path: "/admin/registration", icon: "register" },
  { label: "Appointments", path: "/admin/appointments", icon: "calendar" },
  { label: "Medicine", path: "/admin/inventory", icon: "inventory" },
  { label: "Rooms", path: "/admin/rooms", icon: "rooms" },
  { label: "Doctors", path: "/admin/doctors", icon: "doctors" },
  { label: "Billing", path: "/admin/billing", icon: "billing" },
];

function isActiveRoute(currentPath: string, itemPath: string, allItems: NavItem[]): boolean {
  if (currentPath === itemPath) {
    return true;
  }

  const dashboardItem = allItems[0];
  if (dashboardItem && itemPath === dashboardItem.path && currentPath !== itemPath) {
    return false;
  }

  return currentPath.startsWith(`${itemPath}/`);
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  collapsed,
  onClose,
  onToggleCollapse,
  currentPath,
  navItems: navItemsProp,
  logoText = "Lorem Ipsum",
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isCollapsed = collapsed && isDesktop;
  const navItems = navItemsProp || defaultNavItems;

  const drawerContent = (
    <>
      <LogoContainer collapsed={isCollapsed}>
        {navIcons.hospital}
        {!isCollapsed && <LogoText>{logoText}</LogoText>}
      </LogoContainer>

      <SectionLabel collapsed={isCollapsed}>
        {isCollapsed ? "" : "MENU"}
      </SectionLabel>

      <List disablePadding sx={{ flex: 1 }}>
        {navItems.map((item) => {
          const button = (
            <NavItemButton
              active={isActiveRoute(currentPath, item.path, navItems)}
              collapsed={isCollapsed}
              onClick={() => {
                if (!isDesktop) onClose();
              }}
            >
              {navIcons[item.icon]}
              {!isCollapsed && <NavLabel>{item.label}</NavLabel>}
            </NavItemButton>
          );

          return (
            <Link key={item.path} href={item.path} style={{ textDecoration: "none" }}>
              {isCollapsed ? (
                <Tooltip title={item.label} placement="right" arrow>
                  {button}
                </Tooltip>
              ) : (
                button
              )}
            </Link>
          );
        })}
      </List>

      {/* Collapse toggle at bottom — like reference */}
      {isDesktop && (
        <CollapseToggle onClick={onToggleCollapse} collapsed={isCollapsed}>
          <KeyboardDoubleArrowLeftRoundedIcon
            sx={{
              fontSize: 18,
              transition: "transform 0.28s ease",
              transform: isCollapsed ? "rotate(180deg)" : "none",
            }}
          />
          {!isCollapsed && <CollapseLabel>Collapse</CollapseLabel>}
        </CollapseToggle>
      )}
    </>
  );

  return (
    <SidebarDrawer
      variant={isDesktop ? "permanent" : "temporary"}
      open={isDesktop ? true : open}
      onClose={onClose}
      collapsed={isCollapsed}
    >
      {drawerContent}
    </SidebarDrawer>
  );
};

export default Sidebar;
