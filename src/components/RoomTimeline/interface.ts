import {
  PatientType,
  Room,
  RoomSchedule,
  RoomType,
} from "@/components/RoomTable/interface";

export interface BookingPayload {
  roomId: string;
  type: RoomSchedule["type"];
  patientName: string | null;
  patientType: PatientType | null;
  startDate: string;
  endDate: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  notes: string;
}

export interface CreateBookingResult {
  ok: boolean;
  message?: string;
}

export interface RoomTimelineProps {
  rooms: Room[];
  schedules: RoomSchedule[];
  roomTypes: RoomType[];
  onCellClick: (room: Room, date: string, schedule?: RoomSchedule | null) => void;
  onCreateBooking: (payload: BookingPayload) => CreateBookingResult;
}
