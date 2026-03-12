export interface Room {
  roomId: string;
  roomName: string;
  roomType: string;
  floorNumber: number;
  building: string;
  wing: string;
  roomStatus: "Active" | "Inactive" | "Under Maintenance";
  description: string;
}

export interface RoomTableProps {
  rooms: Room[];
}
