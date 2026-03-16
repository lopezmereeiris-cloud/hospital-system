export interface SupplyItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  supplier: string;
  unit: string;
  quantityOnHand: number;
  unitCost: number;
  totalValue: number;
  reorderLevel: number;
  maximumStockLevel: number;
  storageLocation: string;
  batchNumber: string;
  expiryDate: string;
  dateReceived: string;
  lastUpdatedDate: string;
  status: string;
  lowStockAlert: boolean;
  nearExpiryFlag: boolean;
  expiredFlag: boolean;
  overstockFlag: boolean;
  notes: string;
}

export interface SupplyTableProps {
  items: SupplyItem[];
  onEdit?: (item: SupplyItem) => void;
  onView?: (item: SupplyItem) => void;
}
