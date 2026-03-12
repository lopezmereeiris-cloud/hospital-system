import { Appointment } from "../AppointmentTable/interface";

export interface AppointmentModalProps {
  open: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onStatusChange: (id: number, status: Appointment["status"]) => void;
}
