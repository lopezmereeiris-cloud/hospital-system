import { Room, RoomType, RoomStatus } from "@/components/RoomTable/interface";

export interface RoomMapProps {
  rooms: Room[];
  roomTypes: RoomType[];
  onRoomClick: (room: Room) => void;
  onAddRoom: () => void;
}
