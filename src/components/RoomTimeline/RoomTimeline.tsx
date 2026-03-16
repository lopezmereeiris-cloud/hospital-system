"use client";

import React, { useMemo, useState } from "react";
import Button from "@mui/material/Button";
import PremiumFilter from "@/components/PremiumFilter";
import { Room, RoomSchedule, STATUS_COLORS } from "@/components/RoomTable/interface";
import { RoomTimelineProps } from "./interface";
import { palette } from "@/theme/palette";
import {
  TimelineContainer,
  TimelineToolbar,
  TimelineScrollArea,
  TimelineHeaderRow,
  TimelineHeaderCell,
  TimelineRoomLabel,
  TimelineRoomName,
  TimelineRoomNumber,
  TimelineRow,
  TimelineCell,
  CellLabel,
  TimelineHeaderLabel,
} from "./elements";
import {
  BookingForm,
  CellInfo,
  DAY_NAMES,
  formatDateKey,
  getCellLabel,
  getDates,
  getStatusColor,
  getTimelineStartDate,
  isToday,
  MONTH_NAMES,
  RANGE_DAY_COUNT,
  RANGE_OPTIONS,
  parseDateKey,
} from "./timelineUtils";
import BookingModal from "./BookingModal";

const RoomTimeline: React.FC<RoomTimelineProps> = ({
  rooms,
  schedules,
  roomTypes,
  onCellClick,
  onCreateBooking,
  readOnly = false,
}) => {
  const [range, setRange] = useState<(typeof RANGE_OPTIONS)[number]["value"]>("14d");
  const [bookingForm, setBookingForm] = useState<BookingForm | null>(null);
  const [bookingError, setBookingError] = useState<string>("");

  const timelineStart = useMemo(() => getTimelineStartDate(schedules), [schedules]);

  const dates = useMemo(
    () => getDates(timelineStart, RANGE_DAY_COUNT[range]),
    [timelineStart, range]
  );

  const scheduleMap = useMemo(() => {
    const map: Record<string, Record<string, CellInfo>> = {};

    for (const room of rooms) {
      map[room.roomId] = {};
      for (const date of dates) {
        map[room.roomId][formatDateKey(date)] = {
          schedule: null,
          isStart: false,
          isEnd: false,
        };
      }
    }

    for (const schedule of schedules) {
      const start = parseDateKey(schedule.startDate);
      const end = parseDateKey(schedule.endDate);
      for (const date of dates) {
        const dateKey = formatDateKey(date);
        if (date >= start && date <= end && map[schedule.roomId]) {
          map[schedule.roomId][dateKey] = {
            schedule,
            isStart: date.getTime() === start.getTime(),
            isEnd: date.getTime() === end.getTime(),
          };
        }
      }
    }

    return map;
  }, [rooms, schedules, dates]);

  const openBookingForm = (room: Room, date: string) => {
    setBookingError("");
    setBookingForm({
      roomId: room.roomId,
      type: "occupied",
      patientName: "",
      patientType: "Regular",
      startDate: date,
      endDate: date,
      checkInTime: "08:00",
      checkOutTime: "12:00",
      notes: "",
    });
  };

  const closeBookingForm = () => {
    setBookingError("");
    setBookingForm(null);
  };

  const handleCellSelect = (room: Room, dateKey: string, cell?: CellInfo) => {
    if (cell?.schedule) {
      onCellClick(room, dateKey, cell.schedule);
      return;
    }

    if (readOnly) {
      return;
    }

    openBookingForm(room, dateKey);
  };

  const handleCreateBooking = () => {
    if (!bookingForm) {
      return;
    }

    if (!onCreateBooking) {
      return;
    }

    if (bookingForm.endDate < bookingForm.startDate) {
      setBookingError("Discharge date must be on or after admit date.");
      return;
    }

    if (bookingForm.type === "occupied" && bookingForm.patientName.trim().length === 0) {
      setBookingError("Patient name is required for occupied room assignment.");
      return;
    }

    const result = onCreateBooking({
      roomId: bookingForm.roomId,
      type: bookingForm.type,
      patientName:
        bookingForm.type === "occupied" ? bookingForm.patientName.trim() : null,
      patientType: bookingForm.type === "occupied" ? bookingForm.patientType : null,
      startDate: bookingForm.startDate,
      endDate: bookingForm.endDate,
      checkInTime:
        bookingForm.type === "occupied" && bookingForm.checkInTime
          ? bookingForm.checkInTime
          : null,
      checkOutTime:
        bookingForm.type === "occupied" && bookingForm.checkOutTime
          ? bookingForm.checkOutTime
          : null,
      notes: bookingForm.notes.trim(),
    });

    if (!result.ok) {
      setBookingError(result.message || "Unable to save booking.");
      return;
    }

    closeBookingForm();
  };

  const handleQuickCreate = () => {
    const targetRoom = rooms.find((room) => room.status === "Available") || rooms[0];
    if (!targetRoom) {
      return;
    }

    const firstDate = dates[0] ? formatDateKey(dates[0]) : formatDateKey(new Date());
    openBookingForm(targetRoom, firstDate);
  };

  const updateBookingType = (type: RoomSchedule["type"]) => {
    setBookingForm((previous) => {
      if (!previous) {
        return previous;
      }

      if (type === "occupied") {
        return {
          ...previous,
          type,
          patientType: previous.patientType || "Regular",
          checkInTime: previous.checkInTime || "08:00",
          checkOutTime: previous.checkOutTime || "12:00",
        };
      }

      return {
        ...previous,
        type,
        patientName: "",
      };
    });
  };

  const updateStartDate = (value: string) => {
    setBookingForm((previous) => {
      if (!previous) {
        return previous;
      }

      const nextEnd = previous.endDate < value ? value : previous.endDate;

      return {
        ...previous,
        startDate: value,
        endDate: nextEnd,
      };
    });
  };

  return (
    <TimelineContainer elevation={0}>
      <TimelineToolbar>
        <div>
          <div style={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
            Availability Timeline
          </div>
          <div style={{ fontSize: "0.68rem", color: "text.secondary", marginTop: 3 }}>
            Click any empty date cell to create a booking.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 10,
          }}
        >
          <PremiumFilter
            options={RANGE_OPTIONS.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
            active={range}
            onChange={setRange}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 14,
              flexWrap: "wrap",
              fontSize: "0.72rem",
              fontWeight: 500,
              color: "text.secondary",
            }}
          >
            {[
              { label: "Available", color: STATUS_COLORS.Available },
              { label: "Occupied", color: STATUS_COLORS.Occupied },
              { label: "Maintenance", color: STATUS_COLORS.Maintenance },
              { label: "Cleaning", color: STATUS_COLORS.Cleaning },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: item.color,
                  }}
                />
                {item.label}
              </div>
            ))}

            {!readOnly && (
              <Button
                variant="contained"
                size="small"
                onClick={handleQuickCreate}
                sx={{
                  textTransform: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  boxShadow: "none",
                  "&:hover": { boxShadow: "none" },
                }}
              >
                Create Booking
              </Button>
            )}
          </div>
        </div>
      </TimelineToolbar>

      <TimelineScrollArea>
        <TimelineHeaderRow>
          <TimelineHeaderLabel>Room</TimelineHeaderLabel>
          {dates.map((date) => {
            const today = isToday(date);
            return (
              <TimelineHeaderCell key={formatDateKey(date)} isToday={today}>
                <div>{DAY_NAMES[date.getDay()]}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>{date.getDate()}</div>
                <div style={{ fontSize: "0.58rem" }}>{MONTH_NAMES[date.getMonth()]}</div>
              </TimelineHeaderCell>
            );
          })}
        </TimelineHeaderRow>

        {rooms.map((room) => (
          <TimelineRow key={room.roomId}>
            <TimelineRoomLabel>
              <TimelineRoomName>{room.roomName}</TimelineRoomName>
              <TimelineRoomNumber>
                #{room.roomNumber} - {room.wing}
              </TimelineRoomNumber>
              {room.currentPatient && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      color: room.finalRate === 0 ? palette.success.main : palette.grey[600],
                    }}
                  >
                    {room.finalRate === 0 ? "FREE" : `PHP ${room.finalRate.toLocaleString()}/d`}
                  </span>
                  {room.discountPercent > 0 && (
                    <span
                      style={{
                        fontSize: "0.5rem",
                        fontWeight: 600,
                        padding: "0px 3px",
                        borderRadius: 3,
                        backgroundColor: "#ECFDF3",
                        color: palette.success.dark,
                      }}
                    >
                      -{room.discountPercent}%
                    </span>
                  )}
                </div>
              )}
            </TimelineRoomLabel>

            {dates.map((date) => {
              const dateKey = formatDateKey(date);
              const cell = scheduleMap[room.roomId]?.[dateKey];
              const hasEvent = !!cell?.schedule;
              const color = hasEvent ? getStatusColor(cell.schedule!.type) : undefined;
              const label = cell ? getCellLabel(cell) : null;

              return (
                <TimelineCell
                  key={dateKey}
                  statusColor={color}
                  isToday={isToday(date)}
                  hasEvent={hasEvent}
                  eventType={cell?.schedule?.type}
                  onClick={() => handleCellSelect(room, dateKey, cell)}
                >
                  {label && <CellLabel variant={cell?.schedule?.type}>{label}</CellLabel>}
                </TimelineCell>
              );
            })}
          </TimelineRow>
        ))}
      </TimelineScrollArea>

      {!readOnly && (
        <BookingModal
          bookingForm={bookingForm}
          bookingError={bookingError}
          rooms={rooms}
          roomTypes={roomTypes}
          schedules={schedules}
          onClose={closeBookingForm}
          onSubmit={handleCreateBooking}
          onFormChange={setBookingForm}
          onTypeChange={updateBookingType}
          onStartDateChange={updateStartDate}
        />
      )}
    </TimelineContainer>
  );
};

export default RoomTimeline;
