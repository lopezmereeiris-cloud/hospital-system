export type RoomStatus = "Available" | "Occupied" | "Maintenance" | "Cleaning";

export type PatientType =
  | "Regular"
  | "Senior Citizen"
  | "PWD"
  | "PhilHealth"
  | "Indigent";

export const DISCOUNT_MAP: Record<PatientType, number> = {
  Regular: 0,
  "Senior Citizen": 20,
  PWD: 20,
  PhilHealth: 15,
  Indigent: 100,
};

export interface Room {
  roomId: string;
  roomNumber: string;
  roomName: string;
  roomType: string;
  floor: number;
  wing: string;
  zone: string;
  capacity: number;
  ratePerDay: number;
  status: RoomStatus;
  currentPatient: string | null;
  patientType: PatientType | null;
  discountPercent: number;
  finalRate: number;
  description: string;
  equipment: string[];
}

export interface RoomType {
  key: string;
  label: string;
  defaultCapacity: number;
  amenities: string[];
  active: boolean;
  color: string;
}

export interface RoomSchedule {
  scheduleId: string;
  roomId: string;
  type: "occupied" | "maintenance" | "cleaning";
  patientName: string | null;
  patientType: PatientType | null;
  discountPercent: number;
  billingRate: number;
  startDate: string;
  endDate: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  notes: string;
}

export const STATUS_COLORS: Record<RoomStatus, string> = {
  Available: "#12B76A",
  Occupied: "#F04438",
  Maintenance: "#F79009",
  Cleaning: "#36BFFA",
};

export interface RoomTableProps {
  rooms: Room[];
}
