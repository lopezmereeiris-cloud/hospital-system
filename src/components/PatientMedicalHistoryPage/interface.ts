import type { MedicalRecord } from "@/lib/medicalRecords";
import type { PatientRecord } from "@/lib/patients";

export interface PatientMedicalHistoryPageProps {
  patient: PatientRecord;
  records: MedicalRecord[];
  profileHref: string;
}
