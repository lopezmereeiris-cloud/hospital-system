"use client";

import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import { STATUS_COLORS } from "@/components/RoomTable/interface";
import { RoomDetailModalProps } from "./interface";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  DetailSection,
  DetailSectionTitle,
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  StatusBadge,
  EquipmentChip,
  ScheduleCard,
  ScheduleTitle,
  ScheduleMeta,
} from "./elements";

const scheduleTypeColors: Record<string, string> = {
  occupied: STATUS_COLORS.Occupied,
  maintenance: STATUS_COLORS.Maintenance,
  cleaning: STATUS_COLORS.Cleaning,
};

const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  open,
  onClose,
  room,
  schedules,
  roomTypes,
}) => {
  if (!open || !room) return null;

  const roomSchedules = schedules.filter((s) => s.roomId === room.roomId);
  const roomType = roomTypes.find((rt) => rt.key === room.roomType);
  const statusColor = STATUS_COLORS[room.status];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader statusColor={statusColor}>
          <div>
            <div
              style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "#1A1D1F",
              }}
            >
              #{room.roomNumber} — {room.roomName}
            </div>
            <div
              style={{
                fontSize: "0.78rem",
                color: "#6F767E",
                marginTop: 2,
              }}
            >
              {room.wing} · Floor {room.floor} · {room.zone}
            </div>
          </div>
          <IconButton onClick={onClose} size="small">
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </ModalHeader>

        <ModalBody>
          {/* Status & Basic Info */}
          <DetailSection>
            <DetailSectionTitle>Room Information</DetailSectionTitle>
            <DetailGrid>
              <DetailItem>
                <DetailLabel>Status</DetailLabel>
                <StatusBadge statusColor={statusColor}>
                  <FiberManualRecordRoundedIcon sx={{ fontSize: 8 }} />
                  {room.status}
                </StatusBadge>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Room Type</DetailLabel>
                <DetailValue
                  style={{
                    color: roomType?.color,
                    textTransform: "capitalize",
                  }}
                >
                  {room.roomType.replace("-", " ")}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Capacity</DetailLabel>
                <DetailValue>
                  {room.capacity} {room.capacity === 1 ? "bed" : "beds"}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Rate per Day</DetailLabel>
                <DetailValue>
                  ₱{room.ratePerDay.toLocaleString()}
                </DetailValue>
              </DetailItem>
            </DetailGrid>
          </DetailSection>

          {/* Pricing Breakdown (occupied rooms only) */}
          {room.currentPatient && (
            <DetailSection>
              <DetailSectionTitle>Billing Summary</DetailSectionTitle>
              <div
                style={{
                  background: "#F9FAFB",
                  borderRadius: 10,
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.78rem",
                    color: "#475467",
                  }}
                >
                  <span>Base Rate</span>
                  <span>₱{room.ratePerDay.toLocaleString()}/day</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.78rem",
                    color: room.discountPercent > 0 ? "#12B76A" : "#475467",
                  }}
                >
                  <span>
                    Discount{" "}
                    {room.patientType && room.patientType !== "Regular"
                      ? `(${room.patientType})`
                      : ""}
                  </span>
                  <span>
                    {room.discountPercent > 0
                      ? `−${room.discountPercent}%`
                      : "None"}
                  </span>
                </div>
                <div
                  style={{
                    borderTop: "1px dashed #E4E7EC",
                    paddingTop: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color:
                      room.finalRate === 0
                        ? "#12B76A"
                        : "#1A1D1F",
                  }}
                >
                  <span>Final Rate</span>
                  <span>
                    {room.finalRate === 0
                      ? "FREE"
                      : `₱${room.finalRate.toLocaleString()}/day`}
                  </span>
                </div>
              </div>
            </DetailSection>
          )}

          {/* Current Patient */}
          {room.currentPatient && (
            <DetailSection>
              <DetailSectionTitle>Current Patient</DetailSectionTitle>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <DetailValue>{room.currentPatient}</DetailValue>
                {room.patientType && (
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 20,
                      backgroundColor:
                        room.patientType === "Senior Citizen"
                          ? "#FFF4DE"
                          : room.patientType === "PWD"
                            ? "#E8F5E9"
                            : room.patientType === "PhilHealth"
                              ? "#E3F2FD"
                              : room.patientType === "Indigent"
                                ? "#FCE4EC"
                                : "#F2F4F7",
                      color:
                        room.patientType === "Senior Citizen"
                          ? "#B76E00"
                          : room.patientType === "PWD"
                            ? "#1B5E20"
                            : room.patientType === "PhilHealth"
                              ? "#0D47A1"
                              : room.patientType === "Indigent"
                                ? "#B71C1C"
                                : "#475467",
                    }}
                  >
                    {room.patientType}
                    {room.discountPercent > 0
                      ? ` (${room.discountPercent}% off)`
                      : ""}
                  </span>
                )}
              </div>
              {roomSchedules
                .filter((s) => s.type === "occupied" && s.patientName === room.currentPatient)
                .slice(0, 1)
                .map((s) => (
                  <div
                    key={s.scheduleId}
                    style={{
                      fontSize: "0.75rem",
                      color: "#6F767E",
                      marginTop: 4,
                    }}
                  >
                    {formatDate(s.startDate)} — {formatDate(s.endDate)}
                    {s.checkInTime && ` · Check-in: ${s.checkInTime}`}
                    {s.checkOutTime && ` · Check-out: ${s.checkOutTime}`}
                    {s.notes && (
                      <div style={{ marginTop: 2, fontStyle: "italic" }}>
                        {s.notes}
                      </div>
                    )}
                  </div>
                ))}
            </DetailSection>
          )}

          {/* Description */}
          <DetailSection>
            <DetailSectionTitle>Description</DetailSectionTitle>
            <div style={{ fontSize: "0.8rem", color: "#475467", lineHeight: 1.6 }}>
              {room.description}
            </div>
          </DetailSection>

          {/* Equipment */}
          <DetailSection>
            <DetailSectionTitle>Equipment & Facilities</DetailSectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {room.equipment.map((eq) => (
                <EquipmentChip key={eq}>{eq}</EquipmentChip>
              ))}
            </div>
          </DetailSection>

          {/* Scheduled Activity */}
          {roomSchedules.length > 0 && (
            <DetailSection>
              <DetailSectionTitle>Scheduled Activity</DetailSectionTitle>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {roomSchedules.map((sch) => (
                  <ScheduleCard
                    key={sch.scheduleId}
                    typeColor={scheduleTypeColors[sch.type] || "#667085"}
                  >
                    <ScheduleTitle>
                      {sch.type === "occupied"
                        ? sch.patientName
                        : sch.type.charAt(0).toUpperCase() + sch.type.slice(1)}
                    </ScheduleTitle>
                    <ScheduleMeta>
                      {formatDate(sch.startDate)} — {formatDate(sch.endDate)}
                      {sch.notes && ` · ${sch.notes}`}
                    </ScheduleMeta>
                  </ScheduleCard>
                ))}
              </div>
            </DetailSection>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RoomDetailModal;
