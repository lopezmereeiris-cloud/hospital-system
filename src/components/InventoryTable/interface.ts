export interface Medicine {
  id: string;
  genericName: string;
  brandNames: string[];
  manufacturer: string;
  fdaRegistrationNo: string;
  atcCode: string;
  pndfListed: boolean;
  pndfCategory: string;
  dosageForm: string;
  strength: string;
  routeOfAdministration: string;
  therapeuticCategory: string;
  therapeuticAction: string;
  unitOfMeasure: string;
  packSize: string;
  ddbClassification: string;
  genericActCompliance: boolean;
  dohProgramTag: string | null;
  philhealthCoverage: boolean;
  prescriptionRequired: boolean;
  drugCategory: string;
  storageTemperature: string;
  storageInstructions: string;
  handlingPrecautions: string;
  storageLocation: string;
  batchNumber: string;
  quantityOnHand: number;
  unitCost: number;
  totalValue: number;
  sourceFund: string;
  reorderLevel: number;
  maximumStockLevel: number;
  averageMonthlyConsumption: number;
  status: string;
  dateReceived: string;
  expiryDate: string;
  manufacturingDate: string;
  dateAddedToSystem: string;
  lastUpdatedDate: string;
  nearExpiryFlag: boolean;
  lowStockAlert: boolean;
  expiredFlag: boolean;
  recalledFlag: boolean;
  overstockFlag: boolean;
}

export interface InventoryTableProps {
  medicines: Medicine[];
  onEdit?: (medicine: Medicine) => void;
  onView?: (medicine: Medicine) => void;
}
