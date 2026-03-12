import { RoomType } from "@/components/RoomTable/interface";

export interface AddRoomModalProps {
  open: boolean;
  onClose: () => void;
  roomTypes: RoomType[];
}
