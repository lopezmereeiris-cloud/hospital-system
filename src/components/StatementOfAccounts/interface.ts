import type { PatientType, Room, RoomSchedule } from "@/components/RoomTable/interface";
import type { Appointment } from "@/components/AppointmentTable/interface";
import type { Medicine } from "@/components/InventoryTable/interface";

export interface YakapMember {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  status: string;
  benefitBalance: number;
  transactions?: Array<{
    date: string;
    description: string;
    amount: number;
  }>;
}

export interface StatementOfAccountsProps {
  rooms: Room[];
  schedules: RoomSchedule[];
  yakapMembers: YakapMember[];
  appointments: Appointment[];
  medicines: Medicine[];
}

export type BillingStatus = "Pending" | "Partial" | "Paid";

export interface BillingLineItem {
  id: string;
  description: string;
  amount: number;
}

export interface BillingRecord {
  billId: string;
  patientName: string;
  roomLabel: string;
  serviceLabel: string;
  serviceType: "Room Stay" | "Checkup" | "Pharmacy" | "Checkup + Pharmacy";
  serviceDate: string;
  encounterType: "Inpatient" | "Outpatient";
  admissionDate: string;
  dischargeDate: string;
  stayDays: number;
  patientType: PatientType | "Regular";
  discountPercent: number;
  roomRate: number;
  grossAmount: number;
  coverageDiscount: number;
  yakapDeduction: number;
  yakapMemberId: string | null;
  yakapMatchLabel: string | null;
  netAmount: number;
  paidAmount: number;
  balance: number;
  status: BillingStatus;
  lineItems: BillingLineItem[];
  notes: string;
}
