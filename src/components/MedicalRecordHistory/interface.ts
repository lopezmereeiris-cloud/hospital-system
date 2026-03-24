import type { MedicalRecord } from "@/lib/medicalRecords";
import type { PatientRecord } from "@/lib/patients";

export interface MedicalRecordHistoryProps {
  patient: PatientRecord;
  records: MedicalRecord[];
  title?: string;
}
