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
import AddRoomModal from "@/components/AddRoomModal";
import RoomTypeManager from "@/components/RoomTypeManager";
import {
  DISCOUNT_MAP,
  PatientType,
  Room,
  RoomSchedule,
  RoomStatus,
  RoomType,
} from "@/components/RoomTable/interface";
import {
  BookingPayload,
  CreateBookingResult,
} from "@/components/RoomTimeline/interface";
import roomsData from "@/json/rooms.json";
import roomTypesData from "@/json/roomTypes.json";
import schedulesData from "@/json/roomSchedules.json";

type TabValue = "room-list" | "room-map" | "room-types";

const SCHEDULE_STATUS_MAP: Record<RoomSchedule["type"], RoomStatus> = {
  occupied: "Occupied",
  maintenance: "Maintenance",
  cleaning: "Cleaning",
};

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getNextScheduleId(existing: RoomSchedule[]): string {
  const max = existing.reduce((highest, schedule) => {
    const number = Number(schedule.scheduleId.replace(/\D/g, ""));
    return Number.isFinite(number) && number > highest ? number : highest;
  }, 0);

  return `SCH-${String(max + 1).padStart(3, "0")}`;
}

function hasDateOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean {
  return !(endA < startB || startA > endB);
}

export default function RoomsPage() {
  const roomTypes = roomTypesData as RoomType[];

  const [rooms, setRooms] = useState<Room[]>(roomsData as Room[]);
  const [schedules, setSchedules] = useState<RoomSchedule[]>(
    schedulesData as RoomSchedule[]
  );
  const [tab, setTab] = useState<TabValue>("room-list");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const available = rooms.filter((room) => room.status === "Available").length;
  const occupied = rooms.filter((room) => room.status === "Occupied").length;
  const maintenance = rooms.filter((room) => room.status === "Maintenance").length;
  const cleaning = rooms.filter((room) => room.status === "Cleaning").length;

  const handleRoomClick = (room: Room) => {
    const latestRoom = rooms.find((item) => item.roomId === room.roomId) || room;
    setSelectedRoom(latestRoom);
    setDetailOpen(true);
  };

  const handleCellClick = (room: Room) => {
    handleRoomClick(room);
  };

  const handleCreateBooking = (payload: BookingPayload): CreateBookingResult => {
    const room = rooms.find((item) => item.roomId === payload.roomId);
    if (!room) {
      return { ok: false, message: "Selected room was not found." };
    }

    const hasConflict = schedules.some(
      (schedule) =>
        schedule.roomId === payload.roomId &&
        hasDateOverlap(
          payload.startDate,
          payload.endDate,
          schedule.startDate,
          schedule.endDate
        )
    );

    if (hasConflict) {
      return {
        ok: false,
        message: "That date range overlaps an existing booking or room activity.",
      };
    }

    const patientType: PatientType | null =
      payload.type === "occupied" ? payload.patientType || "Regular" : null;

    const discountPercent =
      payload.type === "occupied" && patientType
        ? DISCOUNT_MAP[patientType]
        : 0;

    const billingRate =
      payload.type === "occupied"
        ? Math.round(room.ratePerDay * (1 - discountPercent / 100))
        : 0;

    const newSchedule: RoomSchedule = {
      scheduleId: getNextScheduleId(schedules),
      roomId: payload.roomId,
      type: payload.type,
      patientName: payload.type === "occupied" ? payload.patientName : null,
      patientType,
      discountPercent,
      billingRate,
      startDate: payload.startDate,
      endDate: payload.endDate,
      checkInTime: payload.type === "occupied" ? payload.checkInTime : null,
      checkOutTime: payload.type === "occupied" ? payload.checkOutTime : null,
      notes: payload.notes,
    };

    setSchedules((previous) =>
      [...previous, newSchedule].sort((a, b) =>
        a.startDate === b.startDate
          ? a.scheduleId.localeCompare(b.scheduleId)
          : a.startDate.localeCompare(b.startDate)
      )
    );

    const todayKey = toDateKey(new Date());
    const activeToday = payload.startDate <= todayKey && payload.endDate >= todayKey;

    if (activeToday) {
      setRooms((previous) =>
        previous.map((item) => {
          if (item.roomId !== payload.roomId) {
            return item;
          }

          return {
            ...item,
            status: SCHEDULE_STATUS_MAP[payload.type],
            currentPatient:
              payload.type === "occupied" ? newSchedule.patientName : null,
            patientType: payload.type === "occupied" ? newSchedule.patientType : null,
            discountPercent: payload.type === "occupied" ? discountPercent : 0,
            finalRate: payload.type === "occupied" ? billingRate : item.ratePerDay,
          };
        })
      );
    }

    return { ok: true };
  };

  const tabOptions: { value: TabValue; label: string }[] = [
    { value: "room-list", label: "Room Lists" },
    { value: "room-map", label: "Room Map" },
    { value: "room-types", label: "Room Types" },
  ];

  return (
    <div>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 2.4 }}>
          <DashboardCard
            title="Total Rooms"
            value={rooms.length}
            icon={<MeetingRoomRoundedIcon />}
            color="#4361EE"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 2.4 }}>
          <DashboardCard
            title="Available"
            value={available}
            icon={<CheckCircleRoundedIcon />}
            color="#12B76A"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 2.4 }}>
          <DashboardCard
            title="Occupied"
            value={occupied}
            icon={<BlockRoundedIcon />}
            color="#F04438"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 2.4 }}>
          <DashboardCard
            title="Maintenance"
            value={maintenance}
            icon={<BuildRoundedIcon />}
            color="#F79009"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 2.4 }}>
          <DashboardCard
            title="Cleaning"
            value={cleaning}
            icon={<CleaningServicesRoundedIcon />}
            color="#36BFFA"
          />
        </Grid>
      </Grid>

      <div style={{ marginBottom: 20 }}>
        <PremiumFilter options={tabOptions} active={tab} onChange={setTab} />
      </div>

      {tab === "room-list" && (
        <RoomMap
          rooms={rooms}
          roomTypes={roomTypes}
          onRoomClick={handleRoomClick}
          onAddRoom={() => setAddOpen(true)}
        />
      )}

      {tab === "room-map" && (
        <RoomTimeline
          rooms={rooms}
          schedules={schedules}
          roomTypes={roomTypes}
          onCellClick={handleCellClick}
          onCreateBooking={handleCreateBooking}
        />
      )}

      {tab === "room-types" && <RoomTypeManager roomTypes={roomTypes} />}

      <RoomDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        room={selectedRoom}
        schedules={schedules}
        roomTypes={roomTypes}
      />

      <AddRoomModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        roomTypes={roomTypes}
      />
    </div>
  );
}
