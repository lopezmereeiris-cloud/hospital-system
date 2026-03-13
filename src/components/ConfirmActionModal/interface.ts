import { Appointment } from "@/components/AppointmentTable/interface";

export interface ConfirmActionModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "approve" | "reject";
  appointment: Appointment | null;
}
