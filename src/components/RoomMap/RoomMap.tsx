"use client";

import React from "react";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { STATUS_COLORS } from "@/components/RoomTable/interface";
import { RoomMapProps } from "./interface";
import {
  MapContainer,
  MapToolbar,
  FloorSection,
  FloorLabel,
  RoomGrid,
  RoomCard,
  RoomCardNumber,
  RoomCardName,
  RoomCardType,
  RoomCardPatient,
  StatusLegend,
  LegendItem,
  LegendDot,
} from "./elements";

const RoomMap: React.FC<RoomMapProps> = ({
  rooms,
  roomTypes,
  onRoomClick,
  onAddRoom,
}) => {
  const floors = Array.from(new Set(rooms.map((r) => r.floor))).sort(
    (a, b) => a - b
  );

  const getTypeColor = (typeKey: string) => {
    const found = roomTypes.find((rt) => rt.key === typeKey);
    return found?.color || "#667085";
  };

  return (
    <MapContainer elevation={0}>
      <MapToolbar>
        <StatusLegend>
          {(
            Object.entries(STATUS_COLORS) as [string, string][]
          ).map(([status, color]) => (
            <LegendItem key={status}>
              <LegendDot color={color} />
              {status}
            </LegendItem>
          ))}
        </StatusLegend>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={onAddRoom}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "0.8rem",
            px: 2.5,
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          }}
        >
          Add Room
        </Button>
      </MapToolbar>

      {floors.map((floor) => {
        const floorRooms = rooms.filter((r) => r.floor === floor);
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
                    }}
                  >
                    <div>
                      <RoomCardNumber>#{room.roomNumber}</RoomCardNumber>
                      <RoomCardName>{room.roomName}</RoomCardName>
                    </div>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: STATUS_COLORS[room.status],
                        flexShrink: 0,
                        marginTop: 4,
                      }}
                    />
                  </div>
                  <RoomCardType typeColor={getTypeColor(room.roomType)}>
                    {room.roomType.replace("-", " ")}
                  </RoomCardType>
                  {/* Rate & Discount */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color:
                          room.finalRate === 0
                            ? "#12B76A"
                            : "#1A1D1F",
                      }}
                    >
                      {room.finalRate === 0
                        ? "FREE"
                        : `₱${room.finalRate.toLocaleString()}`}
                    </span>
                    {room.discountPercent > 0 && room.finalRate > 0 && (
                      <span
                        style={{
                          fontSize: "0.58rem",
                          textDecoration: "line-through",
                          color: "#98A2B3",
                        }}
                      >
                        ₱{room.ratePerDay.toLocaleString()}
                      </span>
                    )}
                    {room.discountPercent > 0 && (
                      <span
                        style={{
                          fontSize: "0.55rem",
                          fontWeight: 600,
                          padding: "1px 5px",
                          borderRadius: 4,
                          backgroundColor: "#ECFDF3",
                          color: "#027A48",
                        }}
                      >
                        −{room.discountPercent}%
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
                            fontSize: "0.52rem",
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
