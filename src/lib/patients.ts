import patientsData from "@/json/patients.json";

export interface PatientAddress {
  street?: string;
  barangay?: string;
  city?: string;
  province?: string;
  zip_code?: string;
}

export interface PatientEmergencyContact {
  name: string;
  relationship: string;
  contactNumber: string;
}

export interface PatientRecord {
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  philhealth_number: string;
  contact_number: string;
  email?: string;
  address: string | PatientAddress;
  status: "Active" | "Admitted" | "Discharged";
  last_visit: string;
  patient_type?: string;
  blood_type?: string;
  date_of_birth?: string;
  civil_status?: string;
  nationality?: string;
  religion?: string;
  occupation?: string;
  height?: string;
  weight?: string;
  smoking_status?: string;
  alcohol_use?: string;
  allergies?: string;
  existing_conditions?: string;
  current_medications?: string;
  emergency_contacts?: PatientEmergencyContact[];
  sss_number?: string;
  tin_number?: string;
  valid_id_type?: string;
  valid_id_number?: string;
}

export const patients = patientsData as PatientRecord[];

export function findPatientById(patientId: string) {
  return patients.find((patient) => patient.patient_id === patientId) ?? null;
}

export function findPatientByName(name: string) {
  const normalizedName = name.trim().toLowerCase();
  return (
    patients.find((patient) => patient.name.trim().toLowerCase() === normalizedName) ??
    null
  );
}

export function formatPatientAddress(address?: string | PatientAddress | null) {
  if (!address) return "-";
  if (typeof address === "string") return address || "-";

  const parts = [
    address.street,
    address.barangay,
    address.city,
    address.province,
    address.zip_code,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(", ") : "-";
}
