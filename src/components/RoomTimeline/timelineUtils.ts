import type { PatientType, RoomSchedule } from "@/components/RoomTable/interface";
import { STATUS_COLORS } from "@/components/RoomTable/interface";

export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const RANGE_OPTIONS = [
  { value: "7d", label: "7 Days" },
  { value: "14d", label: "2 Weeks" },
  { value: "30d", label: "1 Month" },
] as const;

export const RANGE_DAY_COUNT: Record<(typeof RANGE_OPTIONS)[number]["value"], number> = {
  "7d": 7,
  "14d": 14,
  "30d": 30,
};

export const PATIENT_TYPES: PatientType[] = ["Regular", "Senior Citizen", "PWD", "PhilHealth", "Indigent"];

export const PATIENT_TYPE_LABEL: Record<PatientType, string> = {
  Regular: "None",
  "Senior Citizen": "Senior Citizen",
  PWD: "PWD",
  PhilHealth: "PhilHealth",
  Indigent: "Indigent",
};

export const STATUS_OPTIONS: RoomSchedule["type"][] = ["occupied", "maintenance", "cleaning"];

export const STATUS_LABELS: Record<RoomSchedule["type"], string> = {
  occupied: "Occupied",
  maintenance: "Maintenance",
  cleaning: "Cleaning",
};

export const STATUS_SHORT: Record<RoomSchedule["type"], string> = {
  occupied: "OC",
  maintenance: "MT",
  cleaning: "CL",
};

export type CellInfo = {
  schedule: RoomSchedule | null;
  isStart: boolean;
  isEnd: boolean;
};

export type BookingForm = {
  roomId: string;
  type: RoomSchedule["type"];
  patientName: string;
  patientType: PatientType;
  startDate: string;
  endDate: string;
  checkInTime: string;
  checkOutTime: string;
  notes: string;
};

export function parseDateKey(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateLabel(value: string): string {
  return parseDateKey(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatTimeLabel(value: string | null): string {
  if (!value) return "--";
  const parts = value.split(":");
  if (parts.length < 2) return value;
  const hour24 = Number(parts[0]);
  const minute = Number(parts[1]);
  if (!Number.isFinite(hour24) || !Number.isFinite(minute)) return value;
  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = ((hour24 + 11) % 12) + 1;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

export function isToday(date: Date): boolean {
  const now = new Date();
  return date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

export function getTimelineStartDate(schedules: RoomSchedule[]): Date {
  if (schedules.length === 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  let earliest = parseDateKey(schedules[0].startDate);
  for (const schedule of schedules) {
    const scheduleStart = parseDateKey(schedule.startDate);
    if (scheduleStart < earliest) earliest = scheduleStart;
  }

  const start = new Date(earliest);
  start.setDate(start.getDate() - 1);
  return start;
}

export function getDates(start: Date, count: number): Date[] {
  const dates: Date[] = [];
  for (let i = 0; i < count; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
}

export function getCellLabel(cell: CellInfo): string | null {
  if (!cell.schedule) return null;

  if (cell.isStart) {
    if (cell.schedule.type === "occupied") {
      const patientType = cell.schedule.patientType;
      if (patientType && patientType !== "Regular") {
        const abbreviation = patientType === "Senior Citizen" ? "SC" : patientType === "PhilHealth" ? "PH" : patientType;
        return `IN - ${abbreviation}`;
      }
      return "IN";
    }
    return "START";
  }

  if (cell.isEnd) {
    return cell.schedule.type === "occupied" ? "OUT" : "END";
  }

  return null;
}

export function getStatusColor(type: RoomSchedule["type"]): string {
  switch (type) {
    case "occupied": return STATUS_COLORS.Occupied;
    case "maintenance": return STATUS_COLORS.Maintenance;
    case "cleaning": return STATUS_COLORS.Cleaning;
    default: return STATUS_COLORS.Available;
  }
}
