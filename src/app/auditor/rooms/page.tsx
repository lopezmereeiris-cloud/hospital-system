"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import DashboardCard from "@/components/DashboardCard";
import PremiumFilter from "@/components/PremiumFilter";
import RoomMap from "@/components/RoomMap";
import RoomTimeline from "@/components/RoomTimeline";
import RoomDetailModal from "@/components/RoomDetailModal";
import RoomTypeManager from "@/components/RoomTypeManager";
import { Room, RoomSchedule, RoomType } from "@/components/RoomTable/interface";
import roomsData from "@/json/rooms.json";
import roomTypesData from "@/json/roomTypes.json";
import schedulesData from "@/json/roomSchedules.json";
import { palette } from "@/theme/palette";

type TabValue = "room-list" | "room-map" | "room-types";

export default function AuditorRoomsPage() {
  const roomTypes = roomTypesData as RoomType[];
  const rooms = roomsData as Room[];
  const schedules = schedulesData as RoomSchedule[];
  const [tab, setTab] = useState<TabValue>("room-list");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const available = rooms.filter((room) => room.status === "Available").length;
  const occupied = rooms.filter((room) => room.status === "Occupied").length;
  const maintenance = rooms.filter((room) => room.status === "Maintenance").length;
  const cleaning = rooms.filter((room) => room.status === "Cleaning").length;

  const tabOptions: { value: TabValue; label: string }[] = [
    { value: "room-list", label: "Room Lists" },
    { value: "room-map", label: "Room Map" },
    { value: "room-types", label: "Room Types" },
  ];

  return (
    <div>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 2.4 }}><DashboardCard title="Total Rooms" value={rooms.length} icon={<MeetingRoomRoundedIcon />} color={palette.primary.main} /></Grid>
        <Grid size={{ xs: 6, sm: 2.4 }}><DashboardCard title="Available" value={available} icon={<CheckCircleRoundedIcon />} color={palette.success.main} /></Grid>
        <Grid size={{ xs: 6, sm: 2.4 }}><DashboardCard title="Occupied" value={occupied} icon={<BlockRoundedIcon />} color={palette.error.main} /></Grid>
        <Grid size={{ xs: 6, sm: 2.4 }}><DashboardCard title="Maintenance" value={maintenance} icon={<BuildRoundedIcon />} color={palette.warning.main} /></Grid>
        <Grid size={{ xs: 6, sm: 2.4 }}><DashboardCard title="Cleaning" value={cleaning} icon={<CleaningServicesRoundedIcon />} color={palette.info.main} /></Grid>
      </Grid>

      <div style={{ marginBottom: 20 }}>
        <PremiumFilter options={tabOptions} active={tab} onChange={setTab} />
      </div>

      {tab === "room-list" && (
        <RoomMap
          rooms={rooms}
          roomTypes={roomTypes}
          onRoomClick={(room) => {
            setSelectedRoom(room);
            setDetailOpen(true);
          }}
          readOnly
        />
      )}

      {tab === "room-map" && (
        <RoomTimeline
          rooms={rooms}
          schedules={schedules}
          roomTypes={roomTypes}
          onCellClick={(room) => {
            setSelectedRoom(room);
            setDetailOpen(true);
          }}
          readOnly
        />
      )}

      {tab === "room-types" && <RoomTypeManager roomTypes={roomTypes} readOnly />}

      <RoomDetailModal open={detailOpen} onClose={() => setDetailOpen(false)} room={selectedRoom} schedules={schedules} roomTypes={roomTypes} />
    </div>
  );
}
