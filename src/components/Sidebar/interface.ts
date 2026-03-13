export interface SidebarProps {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
  currentPath: string;
  navItems?: NavItem[];
  logoText?: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}
