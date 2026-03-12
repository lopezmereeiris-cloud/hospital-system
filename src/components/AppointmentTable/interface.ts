export interface Appointment {
  id: number;
  patientName: string;
  assignedDoctor: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  contact: string;
  email: string;
  age: number;
  gender: string;
  medicalHistory: string;
  specialNotes: string;
}

export interface AppointmentTableProps {
  appointments: Appointment[];
  onRowClick: (appointment: Appointment) => void;
}
