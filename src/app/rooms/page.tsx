"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DashboardCard from "@/components/DashboardCard";
import RoomTable from "@/components/RoomTable";
import { Room } from "@/components/RoomTable/interface";
import roomsData from "@/json/rooms.json";

export default function RoomsPage() {
  const rooms = roomsData as Room[];
  const active = rooms.filter((r) => r.roomStatus === "Active").length;
  const maintenance = rooms.filter((r) => r.roomStatus === "Under Maintenance").length;
  const inactive = rooms.filter((r) => r.roomStatus === "Inactive").length;

  return (
    <div>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="Total Rooms"
            value={rooms.length}
            icon={<MeetingRoomRoundedIcon />}
            color="#4361EE"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="Active"
            value={active}
            icon={<CheckCircleRoundedIcon />}
            color="#12B76A"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="Maintenance"
            value={maintenance}
            icon={<BuildRoundedIcon />}
            color="#F79009"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="Inactive"
            value={inactive}
            icon={<CancelRoundedIcon />}
            color="#F04438"
          />
        </Grid>
      </Grid>

      <RoomTable rooms={rooms} />
    </div>
  );
}
