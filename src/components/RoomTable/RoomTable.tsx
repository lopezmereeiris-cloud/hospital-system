"use client";

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Chip from "@mui/material/Chip";
import PremiumFilter from "@/components/PremiumFilter";
import { RoomTableProps } from "./interface";
import {
  RoomContainer,
  StyledHeaderCell,
  StyledBodyCell,
  StyledRow,
  RoomToolbar,
} from "./elements";

const statusColor: Record<string, "success" | "error" | "warning"> = {
  Active: "success",
  Inactive: "error",
  "Under Maintenance": "warning",
};

const RoomTable: React.FC<RoomTableProps> = ({ rooms }) => {
  const [filter, setFilter] = useState("all");

  const roomTypes = Array.from(new Set(rooms.map((r) => r.roomType)));
  const filterOptions = [
    { value: "all", label: "All Rooms", count: rooms.length },
    ...roomTypes.map((t) => ({
      value: t,
      label: t,
      count: rooms.filter((r) => r.roomType === t).length,
    })),
  ];

  const filtered =
    filter === "all" ? rooms : rooms.filter((r) => r.roomType === filter);

  return (
    <RoomContainer>
      <RoomToolbar>
        <div style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1D1F" }}>
          Room Directory
        </div>
        <PremiumFilter
          options={filterOptions}
          active={filter}
          onChange={setFilter}
        />
      </RoomToolbar>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <StyledRow>
              <StyledHeaderCell>Room ID</StyledHeaderCell>
              <StyledHeaderCell>Room Name</StyledHeaderCell>
              <StyledHeaderCell>Type</StyledHeaderCell>
              <StyledHeaderCell>Floor</StyledHeaderCell>
              <StyledHeaderCell>Building</StyledHeaderCell>
              <StyledHeaderCell>Wing</StyledHeaderCell>
              <StyledHeaderCell>Status</StyledHeaderCell>
              <StyledHeaderCell>Description</StyledHeaderCell>
            </StyledRow>
          </TableHead>
          <TableBody>
            {filtered.map((room) => (
              <StyledRow key={room.roomId}>
                <StyledBodyCell sx={{ fontWeight: 600 }}>{room.roomId}</StyledBodyCell>
                <StyledBodyCell sx={{ fontWeight: 500 }}>{room.roomName}</StyledBodyCell>
                <StyledBodyCell>
                  <Chip label={room.roomType} size="small" variant="outlined" />
                </StyledBodyCell>
                <StyledBodyCell>{room.floorNumber}</StyledBodyCell>
                <StyledBodyCell>{room.building}</StyledBodyCell>
                <StyledBodyCell>{room.wing}</StyledBodyCell>
                <StyledBodyCell>
                  <Chip
                    label={room.roomStatus}
                    color={statusColor[room.roomStatus] || "default"}
                    size="small"
                  />
                </StyledBodyCell>
                <StyledBodyCell
                  sx={{ maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                >
                  {room.description}
                </StyledBodyCell>
              </StyledRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </RoomContainer>
  );
};

export default RoomTable;
