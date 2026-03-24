import type { PatientRecord } from "@/lib/patients";

export type Patient = PatientRecord;

export interface PatientListProps {
  patients: Patient[];
  basePath?: string;
  showRegisterAction?: boolean;
}
