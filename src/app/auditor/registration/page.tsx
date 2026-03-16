"use client";

import PatientList from "@/components/PatientList";
import { Patient } from "@/components/PatientList/interface";
import patientsData from "@/json/patients.json";

export default function AuditorPatientsPage() {
  return (
    <PatientList
      patients={patientsData as Patient[]}
      basePath="/auditor/registration"
      showRegisterAction={false}
    />
  );
}
