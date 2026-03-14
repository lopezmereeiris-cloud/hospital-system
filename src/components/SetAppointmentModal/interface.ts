export interface Doctor {
  doctorId: string;
  firstName: string;
  lastName: string;
  specialization: string;
  subSpecialization: string;
  department: string;
  yearsOfExperience: number;
  status: string;
}

export interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
  activity: string;
  type: string;
}

export interface SetAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  onBook: (appointment: {
    doctor: string;
    department: string;
    date: string;
    time: string;
    type: string;
    reason: string;
    notes: string;
    verificationIdType: string;
    verificationIdNumber: string;
  }) => void;
}

export const STEPS = [
  "Select Doctor",
  "Choose Date & Time",
  "Details & Verification",
  "Confirmation",
];

export const ID_TYPES = [
  "National ID",
  "Passport",
  "Driver's License",
  "PhilHealth ID",
  "Student ID",
];

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function format24HourTo12Hour(rawTime: string): string {
  const [hoursText, minutesText] = rawTime.split(":");
  const hours = Number(hoursText);
  const minutes = Number(minutesText);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
}
