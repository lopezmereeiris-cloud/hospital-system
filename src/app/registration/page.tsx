"use client";

import React from "react";
import PatientList from "@/components/PatientList";
import { Patient } from "@/components/PatientList/interface";
import patientsData from "@/json/patients.json";

export default function PatientsPage() {
  const patients = patientsData as Patient[];

  return (
    <div>
      <PatientList patients={patients} />
    </div>
  );
}