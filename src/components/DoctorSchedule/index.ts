export { default } from "./DoctorSchedule";
export type { ScheduleBlock } from "./DoctorSchedule";
export type ScheduleStatus = "Available" | "Booked" | "Unavailable";

export interface DoctorSchedule {
  id: number;
  doctorName: string;
  date: string;
  time: string;
  endTime: string;
  department: string;
  room?: string;
  status: ScheduleStatus;
  notes?: string;
}