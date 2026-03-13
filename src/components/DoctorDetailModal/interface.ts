import { Doctor } from "../DoctorCard/interface";
import { ScheduleBlock } from "../DoctorSchedule";

export interface DoctorDetailModalProps {
  open: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  schedule: ScheduleBlock[];
}
