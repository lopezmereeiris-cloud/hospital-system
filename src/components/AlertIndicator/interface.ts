export interface AlertIndicatorProps {
  type: "low_stock" | "near_expiry" | "expired" | "overstock";
  label?: string;
}

export interface InventoryAlertItem {
  id: number;
  medicine: string;
  type: string;
  quantity: number;
  reorderLevel?: number;
  expiryDate?: string;
}
