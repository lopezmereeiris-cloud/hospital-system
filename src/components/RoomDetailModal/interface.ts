import { Room, RoomSchedule, RoomType } from "@/components/RoomTable/interface";

export interface RoomDetailModalProps {
  open: boolean;
  onClose: () => void;
  room: Room | null;
  schedules: RoomSchedule[];
  roomTypes: RoomType[];
}
