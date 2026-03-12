export interface Patient {
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  philhealth_number: string;
  contact_number: string;
  address: string;
  status: "Active" | "Admitted" | "Discharged";
  last_visit: string;
}

export interface PatientListProps {
  patients: Patient[];
}