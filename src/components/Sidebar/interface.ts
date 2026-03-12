export interface SidebarProps {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
  currentPath: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}
