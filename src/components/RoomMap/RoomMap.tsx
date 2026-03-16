"use client";

import React, { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ListFiltersBar from "@/components/ListFiltersBar";
import { STATUS_COLORS } from "@/components/RoomTable/interface";
import { RoomMapProps } from "./interface";
import { palette } from "@/theme/palette";
import {
  MapContainer,
  MapToolbar,
  MapFilterArea,
  FloorSection,
  FloorLabel,
  RoomGrid,
  RoomCard,
  RoomCardStatus,
  RoomCardNumber,
  RoomCardName,
  RoomCardType,
  RoomCardPatient,
  StatusLegend,
  LegendItem,
  LegendDot,
  EmptyRoomsState,
} from "./elements";

const RoomMap: React.FC<RoomMapProps> = ({
  rooms,
  roomTypes,
  onRoomClick,
  onAddRoom,
  readOnly = false,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [floorFilter, setFloorFilter] = useState("all");

  const floors = useMemo(
    () => Array.from(new Set(rooms.map((room) => room.floor))).sort((first, second) => first - second),
    [rooms]
  );

  const roomTypeOptions = useMemo(
    () =>
      Array.from(new Set(rooms.map((room) => room.roomType))).map((roomTypeKey) => {
        const roomType = roomTypes.find((item) => item.key === roomTypeKey);
        return {
          value: roomTypeKey,
          label: roomType?.label || roomTypeKey,
        };
      }),
    [rooms, roomTypes]
  );

  const getTypeColor = (typeKey: string) => {
    const found = roomTypes.find((roomType) => roomType.key === typeKey);
    return found?.color || palette.grey[500];
  };

  const normalizedSearch = search.trim().toLowerCase();

  const filteredRooms = useMemo(
    () =>
      rooms.filter((room) => {
        const matchesSearch =
          normalizedSearch.length === 0 ||
          room.roomNumber.toLowerCase().includes(normalizedSearch) ||
          room.roomName.toLowerCase().includes(normalizedSearch) ||
          room.wing.toLowerCase().includes(normalizedSearch) ||
          room.zone.toLowerCase().includes(normalizedSearch) ||
          (room.currentPatient || "").toLowerCase().includes(normalizedSearch);

        const matchesStatus =
          statusFilter === "all" || room.status.toLowerCase() === statusFilter.toLowerCase();

        const matchesType = typeFilter === "all" || room.roomType === typeFilter;

        const matchesFloor = floorFilter === "all" || String(room.floor) === floorFilter;

        return matchesSearch && matchesStatus && matchesType && matchesFloor;
      }),
    [rooms, normalizedSearch, statusFilter, typeFilter, floorFilter]
  );

  const visibleFloors = useMemo(
    () =>
      Array.from(new Set(filteredRooms.map((room) => room.floor))).sort(
        (first, second) => first - second
      ),
    [filteredRooms]
  );

  return (
    <MapContainer elevation={0}>
      <MapToolbar>
        <StatusLegend>
          {(Object.entries(STATUS_COLORS) as [string, string][]).map(([status, color]) => (
            <LegendItem key={status}>
              <LegendDot color={color} />
              {status}
            </LegendItem>
          ))}
        </StatusLegend>
        {!readOnly && onAddRoom && (
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={onAddRoom}
            sx={{
              background: "linear-gradient(135deg, #4D95B4 0%, #226E8E 100%) !important",
              color: "#FFFFFF !important",
              textTransform: "none",
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "0.8rem",
              px: 2.5,
              boxShadow: "none !important",
              "&:hover": {
                background: "linear-gradient(135deg, #4588A6 0%, #1F6785 100%) !important",
                boxShadow: "none !important",
              },
            }}
          >
            Add Room
          </Button>
        )}
      </MapToolbar>

      <MapFilterArea>
        <ListFiltersBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search room number, room name, wing, zone, or patient"
          filters={[
            {
              key: "status",
              label: "Status",
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { value: "all", label: "All Statuses" },
                ...Object.keys(STATUS_COLORS).map((status) => ({
                  value: status.toLowerCase(),
                  label: status,
                })),
              ],
            },
            {
              key: "roomType",
              label: "Room Type",
              value: typeFilter,
              onChange: setTypeFilter,
              options: [{ value: "all", label: "All Types" }, ...roomTypeOptions],
            },
            {
              key: "floor",
              label: "Floor",
              value: floorFilter,
              onChange: setFloorFilter,
              options: [
                { value: "all", label: "All Floors" },
                ...floors.map((floor) => ({ value: String(floor), label: `Floor ${floor}` })),
              ],
            },
          ]}
        />
      </MapFilterArea>

      {visibleFloors.length === 0 && (
        <EmptyRoomsState>No rooms match your current search and filters.</EmptyRoomsState>
      )}

      {visibleFloors.map((floor) => {
        const floorRooms = filteredRooms.filter((room) => room.floor === floor);
        return (
          <FloorSection key={floor}>
            <FloorLabel>Floor {floor}</FloorLabel>
            <RoomGrid>
              {floorRooms.map((room) => (
                <RoomCard
                  key={room.roomId}
                  statusColor={STATUS_COLORS[room.status]}
                  onClick={() => onRoomClick(room)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <div>
                      <RoomCardNumber>#{room.roomNumber}</RoomCardNumber>
                      <RoomCardName>{room.roomName}</RoomCardName>
                    </div>
                    <RoomCardStatus statusColor={STATUS_COLORS[room.status]}>
                      {room.status}
                    </RoomCardStatus>
                  </div>

                  <RoomCardType typeColor={getTypeColor(room.roomType)}>
                    {room.roomType.replace("-", " ")}
                  </RoomCardType>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.76rem",
                        fontWeight: 700,
                        color: room.finalRate === 0 ? palette.success.main : palette.text.primary,
                      }}
                    >
                      {room.finalRate === 0
                        ? "FREE"
                        : `PHP ${room.finalRate.toLocaleString()}`}
                    </span>
                    {room.discountPercent > 0 && room.finalRate > 0 && (
                      <span
                        style={{
                          fontSize: "0.62rem",
                          textDecoration: "line-through",
                          color: "grey.400",
                        }}
                      >
                        PHP {room.ratePerDay.toLocaleString()}
                      </span>
                    )}
                    {room.discountPercent > 0 && (
                      <span
                        style={{
                          fontSize: "0.58rem",
                          fontWeight: 600,
                          padding: "1px 5px",
                          borderRadius: 4,
                          backgroundColor: "#ECFDF3",
                          color: palette.success.dark,
                        }}
                      >
                        -{room.discountPercent}%
                      </span>
                    )}
                  </div>

                  {room.currentPatient && (
                    <RoomCardPatient>
                      <PersonRoundedIcon sx={{ fontSize: 13 }} />
                      {room.currentPatient}
                      {room.patientType && room.patientType !== "Regular" && (
                        <span
                          style={{
                            fontSize: "0.56rem",
                            fontWeight: 600,
                            padding: "1px 4px",
                            borderRadius: 3,
                            backgroundColor:
                              room.patientType === "Senior Citizen"
                                ? "#FFF4DE"
                                : room.patientType === "PWD"
                                  ? "#E8F5E9"
                                  : room.patientType === "PhilHealth"
                                    ? "#E3F2FD"
                                    : "#FCE4EC",
                            color:
                              room.patientType === "Senior Citizen"
                                ? "#B76E00"
                                : room.patientType === "PWD"
                                  ? "#1B5E20"
                                  : room.patientType === "PhilHealth"
                                    ? "#0D47A1"
                                    : "#B71C1C",
                          }}
                        >
                          {room.patientType}
                        </span>
                      )}
                    </RoomCardPatient>
                  )}
                </RoomCard>
              ))}
            </RoomGrid>
          </FloorSection>
        );
      })}
    </MapContainer>
  );
};

export default RoomMap;
