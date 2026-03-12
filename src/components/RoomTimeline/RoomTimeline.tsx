"use client";

import React, { useMemo, useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import PremiumFilter from "@/components/PremiumFilter";
import {
  DISCOUNT_MAP,
  PatientType,
  Room,
  RoomSchedule,
  STATUS_COLORS,
} from "@/components/RoomTable/interface";
import { RoomTimelineProps } from "./interface";
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

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const RANGE_OPTIONS = [
  { value: "7d", label: "7 Days" },
  { value: "14d", label: "2 Weeks" },
  { value: "30d", label: "1 Month" },
] as const;

const RANGE_DAY_COUNT: Record<(typeof RANGE_OPTIONS)[number]["value"], number> = {
  "7d": 7,
  "14d": 14,
  "30d": 30,
};

const PATIENT_TYPES: PatientType[] = [
  "Regular",
  "Senior Citizen",
  "PWD",
  "PhilHealth",
  "Indigent",
];

const PATIENT_TYPE_LABEL: Record<PatientType, string> = {
  Regular: "None",
  "Senior Citizen": "Senior Citizen",
  PWD: "PWD",
  PhilHealth: "PhilHealth",
  Indigent: "Indigent",
};

const STATUS_OPTIONS: RoomSchedule["type"][] = ["occupied", "maintenance", "cleaning"];

const STATUS_LABELS: Record<RoomSchedule["type"], string> = {
  occupied: "Occupied",
  maintenance: "Maintenance",
  cleaning: "Cleaning",
};

const STATUS_SHORT: Record<RoomSchedule["type"], string> = {
  occupied: "OC",
  maintenance: "MT",
  cleaning: "CL",
};

type BookingMode = "single-day" | "date-range";

function parseDateKey(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateLabel(value: string): string {
  const date = parseDateKey(value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimeLabel(value: string | null): string {
  if (!value) {
    return "--";
  }

  const parts = value.split(":");
  if (parts.length < 2) {
    return value;
  }

  const hour24 = Number(parts[0]);
  const minute = Number(parts[1]);
  if (!Number.isFinite(hour24) || !Number.isFinite(minute)) {
    return value;
  }

  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = ((hour24 + 11) % 12) + 1;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function isToday(date: Date): boolean {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

function getTimelineStartDate(schedules: RoomSchedule[]): Date {
  if (schedules.length === 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  let earliest = parseDateKey(schedules[0].startDate);
  for (const schedule of schedules) {
    const scheduleStart = parseDateKey(schedule.startDate);
    if (scheduleStart < earliest) {
      earliest = scheduleStart;
    }
  }

  const start = new Date(earliest);
  start.setDate(start.getDate() - 1);
  return start;
}

function getDates(start: Date, count: number): Date[] {
  const dates: Date[] = [];
  for (let i = 0; i < count; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
}

type CellInfo = {
  schedule: RoomSchedule | null;
  isStart: boolean;
  isEnd: boolean;
};

type BookingForm = {
  roomId: string;
  type: RoomSchedule["type"];
  patientName: string;
  patientType: PatientType;
  startDate: string;
  endDate: string;
  checkInTime: string;
  checkOutTime: string;
  notes: string;
};

const RoomTimeline: React.FC<RoomTimelineProps> = ({
  rooms,
  schedules,
  roomTypes,
  onCellClick,
  onCreateBooking,
}) => {
  const [range, setRange] = useState<(typeof RANGE_OPTIONS)[number]["value"]>("14d");
  const [bookingForm, setBookingForm] = useState<BookingForm | null>(null);
  const [bookingMode, setBookingMode] = useState<BookingMode>("date-range");
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

  const bookingRoom = useMemo(
    () => rooms.find((room) => room.roomId === bookingForm?.roomId) || null,
    [rooms, bookingForm?.roomId]
  );

  const bookingRoomType = useMemo(
    () => roomTypes.find((type) => type.key === bookingRoom?.roomType) || null,
    [roomTypes, bookingRoom?.roomType]
  );

  const bookingPricing = useMemo(() => {
    if (!bookingForm || !bookingRoom || bookingForm.type !== "occupied") {
      return null;
    }

    const discount = DISCOUNT_MAP[bookingForm.patientType];
    const billingRate = Math.round(bookingRoom.ratePerDay * (1 - discount / 100));
    return { discount, billingRate };
  }, [bookingForm, bookingRoom]);

  const stayDays = useMemo(() => {
    if (!bookingForm) {
      return 0;
    }

    const start = parseDateKey(bookingForm.startDate).getTime();
    const end = parseDateKey(bookingForm.endDate).getTime();
    if (end < start) {
      return 0;
    }

    return Math.floor((end - start) / (24 * 60 * 60 * 1000)) + 1;
  }, [bookingForm]);

  const totalBase = useMemo(() => {
    if (!bookingRoom) {
      return 0;
    }

    return stayDays * bookingRoom.ratePerDay;
  }, [bookingRoom, stayDays]);

  const totalEstimated = useMemo(() => {
    if (!bookingPricing) {
      return 0;
    }

    return stayDays * bookingPricing.billingRate;
  }, [bookingPricing, stayDays]);

  const selectedRoomSchedules = useMemo(() => {
    if (!bookingForm) {
      return [] as RoomSchedule[];
    }

    return schedules
      .filter((schedule) => schedule.roomId === bookingForm.roomId)
      .sort((a, b) =>
        a.startDate === b.startDate
          ? a.scheduleId.localeCompare(b.scheduleId)
          : a.startDate.localeCompare(b.startDate)
      )
      .slice(0, 8);
  }, [schedules, bookingForm]);

  const getStatusColor = (type: RoomSchedule["type"]): string => {
    switch (type) {
      case "occupied":
        return STATUS_COLORS.Occupied;
      case "maintenance":
        return STATUS_COLORS.Maintenance;
      case "cleaning":
        return STATUS_COLORS.Cleaning;
      default:
        return STATUS_COLORS.Available;
    }
  };

  const getCellLabel = (cell: CellInfo): string | null => {
    if (!cell.schedule) {
      return null;
    }

    if (cell.isStart) {
      if (cell.schedule.type === "occupied") {
        const patientType = cell.schedule.patientType;
        if (patientType && patientType !== "Regular") {
          const abbreviation =
            patientType === "Senior Citizen"
              ? "SC"
              : patientType === "PhilHealth"
                ? "PH"
                : patientType;
          return `IN - ${abbreviation}`;
        }
        return "IN";
      }

      return "START";
    }

    if (cell.isEnd) {
      if (cell.schedule.type === "occupied") {
        return "OUT";
      }
      return "END";
    }

    return null;
  };

  const openBookingForm = (room: Room, date: string) => {
    setBookingError("");
    setBookingMode("date-range");
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

    openBookingForm(room, dateKey);
  };

  const handleCreateBooking = () => {
    if (!bookingForm) {
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

      const nextEnd =
        bookingMode === "single-day"
          ? value
          : previous.endDate < value
            ? value
            : previous.endDate;

      return {
        ...previous,
        startDate: value,
        endDate: nextEnd,
      };
    });
  };

  const updateMode = (mode: BookingMode) => {
    setBookingMode(mode);
    if (mode === "single-day") {
      setBookingForm((previous) =>
        previous
          ? {
              ...previous,
              endDate: previous.startDate,
            }
          : previous
      );
    }
  };

  return (
    <TimelineContainer elevation={0}>
      <TimelineToolbar>
        <div>
          <div style={{ fontSize: "1rem", fontWeight: 700, color: "#1A1D1F" }}>
            Availability Timeline
          </div>
          <div style={{ fontSize: "0.68rem", color: "#6F767E", marginTop: 3 }}>
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
              color: "#6F767E",
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
                      color: room.finalRate === 0 ? "#12B76A" : "#475467",
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
                        color: "#027A48",
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

      <Dialog open={!!bookingForm} onClose={closeBookingForm} fullWidth maxWidth="lg">
        <DialogTitle sx={{ pb: 1.5, borderBottom: "1px solid #EAECF0" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
            <Box>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#101828" }}>
                Room #{bookingRoom?.roomNumber || "--"} Admission Scheduling
              </Typography>
              <Typography sx={{ mt: 0.6, fontSize: "0.78rem", color: "#667085" }}>
                {bookingRoom?.roomName || ""}
                {bookingRoomType ? ` - ${bookingRoomType.label}` : ""}
                {bookingRoom ? ` - ${bookingRoom.zone} - Capacity ${bookingRoom.capacity}` : ""}
              </Typography>
            </Box>
            <Button
              size="small"
              variant="text"
              onClick={closeBookingForm}
              sx={{ textTransform: "none", minWidth: "auto" }}
            >
              Close
            </Button>
          </Stack>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" },
              minHeight: { md: 620 },
            }}
          >
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              {bookingError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {bookingError}
                </Alert>
              )}

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ mb: 2 }}>
                <Button
                  fullWidth
                  variant={bookingMode === "single-day" ? "outlined" : "contained"}
                  onClick={() => updateMode("single-day")}
                  sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 700 }}
                >
                  One Day
                </Button>
                <Button
                  fullWidth
                  variant={bookingMode === "date-range" ? "contained" : "outlined"}
                  onClick={() => updateMode("date-range")}
                  sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 700 }}
                >
                  Schedule Range
                </Button>
              </Stack>

              <Typography sx={{ fontSize: "0.74rem", color: "#667085", mb: 1.5 }}>
                Assign room occupancy, maintenance, or cleaning schedule using hospital room workflow.
              </Typography>

              {bookingForm?.type === "occupied" && (
                <TextField
                  label="Patient Name"
                  placeholder="Example: Juan Dela Cruz"
                  value={bookingForm.patientName}
                  onChange={(event) =>
                    setBookingForm((previous) =>
                      previous
                        ? {
                            ...previous,
                            patientName: event.target.value,
                          }
                        : previous
                    )
                  }
                  size="small"
                  fullWidth
                  sx={{ mb: 1.7 }}
                />
              )}

              <Typography sx={{ fontSize: "0.67rem", fontWeight: 700, color: "#667085", mb: 0.7 }}>
                ROOM STATUS
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mb: 1.8 }}>
                {STATUS_OPTIONS.map((statusType) => {
                  const active = bookingForm?.type === statusType;
                  const statusColor = getStatusColor(statusType);
                  return (
                    <Button
                      key={statusType}
                      fullWidth
                      variant={active ? "contained" : "outlined"}
                      onClick={() => updateBookingType(statusType)}
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "10px",
                        borderColor: alpha(statusColor, 0.34),
                        color: active ? "#FFFFFF" : statusColor,
                        backgroundColor: active ? statusColor : "#FFFFFF",
                        "&:hover": {
                          backgroundColor: active ? statusColor : alpha(statusColor, 0.08),
                          borderColor: statusColor,
                        },
                      }}
                    >
                      {STATUS_LABELS[statusType]}
                    </Button>
                  );
                })}
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ mb: 1.7 }}>
                <TextField
                  label="Admit Date"
                  type="date"
                  value={bookingForm?.startDate || ""}
                  onChange={(event) => updateStartDate(event.target.value)}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Discharge Date"
                  type="date"
                  value={bookingForm?.endDate || ""}
                  onChange={(event) =>
                    setBookingForm((previous) =>
                      previous
                        ? {
                            ...previous,
                            endDate: event.target.value,
                          }
                        : previous
                    )
                  }
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  disabled={bookingMode === "single-day"}
                />
              </Stack>

              {bookingForm?.type === "occupied" && (
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ mb: 1.7 }}>
                  <TextField
                    label="Admission Time"
                    type="time"
                    value={bookingForm.checkInTime}
                    onChange={(event) =>
                      setBookingForm((previous) =>
                        previous
                          ? {
                              ...previous,
                              checkInTime: event.target.value,
                            }
                          : previous
                      )
                    }
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Expected Discharge Time"
                    type="time"
                    value={bookingForm.checkOutTime}
                    onChange={(event) =>
                      setBookingForm((previous) =>
                        previous
                          ? {
                              ...previous,
                              checkOutTime: event.target.value,
                            }
                          : previous
                      )
                    }
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Stack>
              )}

              {bookingForm?.type === "occupied" && (
                <>
                  <Typography
                    sx={{ fontSize: "0.67rem", fontWeight: 700, color: "#667085", mb: 0.7 }}
                  >
                    COVERAGE CATEGORY
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mb: 1.8 }}>
                    {PATIENT_TYPES.map((patientType) => {
                      const active = bookingForm.patientType === patientType;
                      return (
                        <Button
                          key={patientType}
                          fullWidth
                          variant={active ? "contained" : "outlined"}
                          onClick={() =>
                            setBookingForm((previous) =>
                              previous
                                ? {
                                    ...previous,
                                    patientType,
                                  }
                                : previous
                            )
                          }
                          sx={{
                            textTransform: "none",
                            borderRadius: "10px",
                            fontWeight: 600,
                            fontSize: "0.73rem",
                            lineHeight: 1.2,
                          }}
                        >
                          {PATIENT_TYPE_LABEL[patientType]}
                        </Button>
                      );
                    })}
                  </Stack>
                </>
              )}

              <TextField
                label={bookingForm?.type === "occupied" ? "Clinical Notes" : "Work Notes"}
                value={bookingForm?.notes || ""}
                onChange={(event) =>
                  setBookingForm((previous) =>
                    previous
                      ? {
                          ...previous,
                          notes: event.target.value,
                        }
                      : previous
                  )
                }
                size="small"
                multiline
                minRows={2}
                fullWidth
                sx={{ mb: 2 }}
              />

              <Box
                sx={{
                  border: "1px solid #D0D5DD",
                  borderRadius: "12px",
                  p: 1.6,
                  mb: 1.8,
                  backgroundColor: "#F8F9FF",
                }}
              >
                <Typography sx={{ fontSize: "0.66rem", fontWeight: 700, color: "#667085", mb: 1 }}>
                  PRICE BREAKDOWN
                </Typography>
                <Stack spacing={0.55}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: "0.78rem", color: "#344054" }}>Room Rate</Typography>
                    <Typography sx={{ fontSize: "0.78rem", color: "#344054" }}>
                      PHP {bookingRoom?.ratePerDay.toLocaleString() || "0"}/day
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: "0.78rem", color: "#344054" }}>Stay Days</Typography>
                    <Typography sx={{ fontSize: "0.78rem", color: "#344054" }}>{stayDays}</Typography>
                  </Stack>
                  {bookingForm?.type === "occupied" && bookingPricing && (
                    <Stack direction="row" justifyContent="space-between">
                      <Typography sx={{ fontSize: "0.78rem", color: "#344054" }}>
                        Coverage Discount
                      </Typography>
                      <Typography sx={{ fontSize: "0.78rem", color: "#16A34A" }}>
                        -{bookingPricing.discount}%
                      </Typography>
                    </Stack>
                  )}
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: "0.78rem", color: "#344054" }}>Subtotal</Typography>
                    <Typography sx={{ fontSize: "0.78rem", color: "#344054" }}>
                      PHP {totalBase.toLocaleString()}
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 0.45 }} />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: "0.84rem", fontWeight: 700, color: "#111827" }}>
                      Estimated Total
                    </Typography>
                    <Typography sx={{ fontSize: "0.84rem", fontWeight: 700, color: "#111827" }}>
                      PHP {(bookingForm?.type === "occupied" ? totalEstimated : 0).toLocaleString()}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.1}>
                <Button
                  variant="outlined"
                  onClick={closeBookingForm}
                  fullWidth
                  sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 700 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleCreateBooking}
                  fullWidth
                  sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 700 }}
                >
                  Save Room Schedule
                </Button>
              </Stack>
            </Box>

            <Box
              sx={{
                borderLeft: { xs: "none", md: "1px solid #EAECF0" },
                borderTop: { xs: "1px solid #EAECF0", md: "none" },
                backgroundColor: "#F8FAFC",
                p: { xs: 2, md: 2.5 },
              }}
            >
              <Typography
                sx={{ fontSize: "0.7rem", fontWeight: 800, color: "#667085", letterSpacing: "0.06em" }}
              >
                SCHEDULED ROOM CHANGES
              </Typography>
              <Typography sx={{ fontSize: "0.74rem", color: "#667085", mt: 0.5, mb: 1.6 }}>
                Upcoming occupancy and service windows for this room.
              </Typography>

              <Stack spacing={1}>
                {selectedRoomSchedules.length === 0 && (
                  <Box
                    sx={{
                      border: "1px dashed #D0D5DD",
                      borderRadius: "10px",
                      p: 1.6,
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <Typography sx={{ fontSize: "0.76rem", color: "#667085" }}>
                      No scheduled changes yet for this room.
                    </Typography>
                  </Box>
                )}

                {selectedRoomSchedules.map((schedule) => {
                  const statusColor = getStatusColor(schedule.type);
                  return (
                    <Box
                      key={schedule.scheduleId}
                      sx={{
                        border: "1px solid #D0D5DD",
                        borderRadius: "10px",
                        p: 1.2,
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.8}>
                        <Chip
                          label={`${STATUS_SHORT[schedule.type]}  ${STATUS_LABELS[schedule.type]}`}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.62rem",
                            color: statusColor,
                            backgroundColor: alpha(statusColor, 0.12),
                          }}
                        />
                        <Typography sx={{ fontSize: "0.66rem", color: "#667085" }}>
                          {schedule.scheduleId}
                        </Typography>
                      </Stack>

                      <Typography sx={{ fontSize: "0.73rem", color: "#344054" }}>
                        {formatDateLabel(schedule.startDate)} - {formatDateLabel(schedule.endDate)}
                      </Typography>

                      {schedule.type === "occupied" && (
                        <Typography sx={{ mt: 0.35, fontSize: "0.72rem", color: "#667085" }}>
                          Admit {formatTimeLabel(schedule.checkInTime)} / Discharge{" "}
                          {formatTimeLabel(schedule.checkOutTime)}
                        </Typography>
                      )}

                      <Typography sx={{ mt: 0.35, fontSize: "0.72rem", color: "#667085" }}>
                        {schedule.type === "occupied"
                          ? `Patient: ${schedule.patientName || "--"}`
                          : schedule.notes || "No additional notes"}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </TimelineContainer>
  );
};

export default RoomTimeline;
