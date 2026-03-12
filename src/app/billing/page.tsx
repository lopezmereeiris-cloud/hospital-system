"use client";

import React from "react";
import StatementOfAccounts from "@/components/StatementOfAccounts";
import type { Appointment } from "@/components/AppointmentTable/interface";
import type { Medicine } from "@/components/InventoryTable/interface";
import type { Room, RoomSchedule } from "@/components/RoomTable/interface";
import type { YakapMember } from "@/components/StatementOfAccounts/interface";
import appointmentsData from "@/json/appointments.json";
import inventoryData from "@/json/inventory.json";
import roomsData from "@/json/rooms.json";
import roomSchedulesData from "@/json/roomSchedules.json";
import yakapData from "@/json/yakap.json";

export default function BillingPage() {
  return (
    <StatementOfAccounts
      rooms={roomsData as Room[]}
      schedules={roomSchedulesData as RoomSchedule[]}
      yakapMembers={yakapData as YakapMember[]}
      appointments={appointmentsData as Appointment[]}
      medicines={inventoryData as Medicine[]}
    />
  );
}
