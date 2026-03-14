"use client";

import React, { useMemo } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { alpha } from "@mui/material/styles";
import { DISCOUNT_MAP, Room, RoomSchedule } from "@/components/RoomTable/interface";
import type { RoomType } from "@/components/RoomTable/interface";
import { palette } from "@/theme/palette";
import {
  BookingForm,
  formatDateLabel,
  formatTimeLabel,
  getStatusColor,
  PATIENT_TYPE_LABEL,
  PATIENT_TYPES,
  parseDateKey,
  STATUS_LABELS,
  STATUS_OPTIONS,
  STATUS_SHORT,
} from "./timelineUtils";

interface BookingModalProps {
  bookingForm: BookingForm | null;
  bookingError: string;
  rooms: Room[];
  roomTypes: RoomType[];
  schedules: RoomSchedule[];
  onClose: () => void;
  onSubmit: () => void;
  onFormChange: React.Dispatch<React.SetStateAction<BookingForm | null>>;
  onTypeChange: (type: RoomSchedule["type"]) => void;
  onStartDateChange: (value: string) => void;
}

const MODAL_FIELD_SX = {
  "& .MuiInputLabel-root": { fontSize: "0.82rem", fontWeight: 600, color: "#5F6B76" },
  "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "background.paper",
    "& .MuiInputBase-input": { fontSize: "0.82rem", fontWeight: 500 },
  },
};

const SECTION_TITLE_SX = { fontSize: "0.95rem", fontWeight: 700, color: "text.primary", mb: 0.8 };
const HELPER_TEXT_SX = { fontSize: "0.9rem", color: "#5F6B76", fontWeight: 500, lineHeight: 1.5 };

const BookingModal: React.FC<BookingModalProps> = ({
  bookingForm,
  bookingError,
  rooms,
  roomTypes,
  schedules,
  onClose,
  onSubmit,
  onFormChange,
  onTypeChange,
  onStartDateChange,
}) => {
  const bookingRoom = useMemo(
    () => rooms.find((room) => room.roomId === bookingForm?.roomId) || null,
    [rooms, bookingForm?.roomId]
  );

  const bookingRoomType = useMemo(
    () => roomTypes.find((type) => type.key === bookingRoom?.roomType) || null,
    [roomTypes, bookingRoom?.roomType]
  );

  const bookingPricing = useMemo(() => {
    if (!bookingForm || !bookingRoom || bookingForm.type !== "occupied") return null;
    const discount = DISCOUNT_MAP[bookingForm.patientType];
    const billingRate = Math.round(bookingRoom.ratePerDay * (1 - discount / 100));
    return { discount, billingRate };
  }, [bookingForm, bookingRoom]);

  const stayDays = useMemo(() => {
    if (!bookingForm) return 0;
    const start = parseDateKey(bookingForm.startDate).getTime();
    const end = parseDateKey(bookingForm.endDate).getTime();
    return end < start ? 0 : Math.floor((end - start) / (24 * 60 * 60 * 1000)) + 1;
  }, [bookingForm]);

  const totalBase = useMemo(() => (bookingRoom ? stayDays * bookingRoom.ratePerDay : 0), [bookingRoom, stayDays]);
  const totalEstimated = useMemo(() => (bookingPricing ? stayDays * bookingPricing.billingRate : 0), [bookingPricing, stayDays]);

  const selectedRoomSchedules = useMemo(() => {
    if (!bookingForm) return [] as RoomSchedule[];
    return schedules
      .filter((s) => s.roomId === bookingForm.roomId)
      .sort((a, b) => (a.startDate === b.startDate ? a.scheduleId.localeCompare(b.scheduleId) : a.startDate.localeCompare(b.startDate)))
      .slice(0, 8);
  }, [schedules, bookingForm]);

  return (
    <Dialog open={!!bookingForm} onClose={onClose} fullWidth maxWidth="lg" PaperProps={{ sx: { borderRadius: "16px", overflow: "hidden" } }}>
      <DialogTitle sx={{ p: 3, pb: 2.4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={2}
          sx={{
            p: "20px 22px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(13, 138, 63, 0.08) 0%, rgba(13, 138, 63, 0.03) 100%)",
            border: "1px solid rgba(13, 138, 63, 0.12)",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "1.4rem", fontWeight: 700, color: "text.primary", lineHeight: 1.2 }}>
              Room #{bookingRoom?.roomNumber || "--"} Admission Scheduling
            </Typography>
            <Typography sx={{ mt: 1, ...HELPER_TEXT_SX }}>
              {bookingRoom?.roomName || ""}
              {bookingRoomType ? ` - ${bookingRoomType.label}` : ""}
              {bookingRoom ? ` - ${bookingRoom.zone} - Capacity ${bookingRoom.capacity}` : ""}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small"><CloseRoundedIcon /></IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr" }, minHeight: { md: 620 } }}>
          {/* Left panel: Form inputs */}
          <Box sx={{ p: { xs: 2.5, md: 3.25 } }}>
            {bookingError && <Alert severity="error" sx={{ mb: 2 }}>{bookingError}</Alert>}
            <Typography sx={{ ...HELPER_TEXT_SX, mb: 1.8 }}>
              Assign room occupancy, maintenance, or cleaning schedule using hospital room workflow.
            </Typography>

            {bookingForm?.type === "occupied" && (
              <TextField
                label="Patient Name"
                placeholder="Example: Juan Dela Cruz"
                value={bookingForm.patientName}
                onChange={(e) => onFormChange((prev) => prev ? { ...prev, patientName: e.target.value } : prev)}
                size="small"
                fullWidth
                sx={{ ...MODAL_FIELD_SX, mb: 1.9 }}
              />
            )}

            <Typography sx={SECTION_TITLE_SX}>ROOM STATUS</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mb: 1.8 }}>
              {STATUS_OPTIONS.map((statusType) => {
                const active = bookingForm?.type === statusType;
                const statusColor = getStatusColor(statusType);
                return (
                  <Button
                    key={statusType}
                    fullWidth
                    variant={active ? "contained" : "outlined"}
                    onClick={() => onTypeChange(statusType)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: "10px",
                      borderColor: alpha(statusColor, 0.34),
                      color: active ? palette.background.paper : statusColor,
                      backgroundColor: active ? statusColor : palette.background.paper,
                      "&:hover": { backgroundColor: active ? statusColor : alpha(statusColor, 0.08), borderColor: statusColor },
                    }}
                  >
                    {STATUS_LABELS[statusType]}
                  </Button>
                );
              })}
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ mb: 1.9 }}>
              <TextField label="Admit Date" type="date" value={bookingForm?.startDate || ""} onChange={(e) => onStartDateChange(e.target.value)} size="small" fullWidth InputLabelProps={{ shrink: true }} sx={MODAL_FIELD_SX} />
              <TextField label="Discharge Date" type="date" value={bookingForm?.endDate || ""} onChange={(e) => onFormChange((prev) => prev ? { ...prev, endDate: e.target.value } : prev)} size="small" fullWidth InputLabelProps={{ shrink: true }} sx={MODAL_FIELD_SX} />
            </Stack>

            {bookingForm?.type === "occupied" && (
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} sx={{ mb: 1.9 }}>
                <TextField label="Admission Time" type="time" value={bookingForm.checkInTime} onChange={(e) => onFormChange((prev) => prev ? { ...prev, checkInTime: e.target.value } : prev)} size="small" fullWidth InputLabelProps={{ shrink: true }} sx={MODAL_FIELD_SX} />
                <TextField label="Expected Discharge Time" type="time" value={bookingForm.checkOutTime} onChange={(e) => onFormChange((prev) => prev ? { ...prev, checkOutTime: e.target.value } : prev)} size="small" fullWidth InputLabelProps={{ shrink: true }} sx={MODAL_FIELD_SX} />
              </Stack>
            )}

            {bookingForm?.type === "occupied" && (
              <>
                <Typography sx={SECTION_TITLE_SX}>COVERAGE CATEGORY</Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mb: 1.8 }}>
                  {PATIENT_TYPES.map((pt) => (
                    <Button
                      key={pt}
                      fullWidth
                      variant={bookingForm.patientType === pt ? "contained" : "outlined"}
                      onClick={() => onFormChange((prev) => prev ? { ...prev, patientType: pt } : prev)}
                      sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600, fontSize: "0.73rem", lineHeight: 1.2 }}
                    >
                      {PATIENT_TYPE_LABEL[pt]}
                    </Button>
                  ))}
                </Stack>
              </>
            )}

            <TextField
              label={bookingForm?.type === "occupied" ? "Clinical Notes" : "Work Notes"}
              value={bookingForm?.notes || ""}
              onChange={(e) => onFormChange((prev) => prev ? { ...prev, notes: e.target.value } : prev)}
              size="small"
              multiline
              minRows={2}
              fullWidth
              sx={{ ...MODAL_FIELD_SX, mb: 2.1 }}
            />

            <Box sx={{ border: "1px solid #ECECEC", borderRadius: "12px", p: 1.8, mb: 1.8, backgroundColor: palette.background.default }}>
              <Typography sx={{ ...SECTION_TITLE_SX, fontSize: "0.9rem", mb: 1 }}>PRICE BREAKDOWN</Typography>
              <Stack spacing={0.55}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontSize: "0.78rem", color: "grey.700" }}>Room Rate</Typography>
                  <Typography sx={{ fontSize: "0.78rem", color: "grey.700" }}>PHP {bookingRoom?.ratePerDay.toLocaleString() || "0"}/day</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontSize: "0.78rem", color: "grey.700" }}>Stay Days</Typography>
                  <Typography sx={{ fontSize: "0.78rem", color: "grey.700" }}>{stayDays}</Typography>
                </Stack>
                {bookingForm?.type === "occupied" && bookingPricing && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: "0.78rem", color: "grey.700" }}>Coverage Discount</Typography>
                    <Typography sx={{ fontSize: "0.78rem", color: "#16A34A" }}>-{bookingPricing.discount}%</Typography>
                  </Stack>
                )}
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontSize: "0.78rem", color: "grey.700" }}>Subtotal</Typography>
                  <Typography sx={{ fontSize: "0.78rem", color: "grey.700" }}>PHP {totalBase.toLocaleString()}</Typography>
                </Stack>
                <Divider sx={{ my: 0.45 }} />
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontSize: "0.84rem", fontWeight: 700, color: "#111827" }}>Estimated Total</Typography>
                  <Typography sx={{ fontSize: "0.84rem", fontWeight: 700, color: "#111827" }}>
                    PHP {(bookingForm?.type === "occupied" ? totalEstimated : 0).toLocaleString()}
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.1}>
              <Button variant="outlined" onClick={onClose} fullWidth sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600, borderColor: "grey.300", color: "text.primary", "&:hover": { borderColor: "grey.400", backgroundColor: palette.background.default } }}>
                Cancel
              </Button>
              <Button variant="contained" onClick={onSubmit} fullWidth sx={{ backgroundColor: `${palette.primary.main} !important`, color: "#FFFFFF !important", textTransform: "none", borderRadius: "10px", fontWeight: 600, "&:hover": { backgroundColor: "#3A56D4 !important" } }}>
                Save Room Schedule
              </Button>
            </Stack>
          </Box>

          {/* Right panel: Room schedule history */}
          <Box sx={{ borderLeft: { xs: "none", md: `1px solid ${palette.grey[200]}` }, borderTop: { xs: `1px solid ${palette.grey[200]}`, md: "none" }, backgroundColor: "grey.50", p: { xs: 2, md: 2.5 } }}>
            <Typography sx={{ ...SECTION_TITLE_SX, fontSize: "0.9rem", letterSpacing: "0.02em", mb: 0.5 }}>SCHEDULED ROOM CHANGES</Typography>
            <Typography sx={{ ...HELPER_TEXT_SX, fontSize: "0.82rem", mb: 1.6 }}>Upcoming occupancy and service windows for this room.</Typography>

            <Stack spacing={1}>
              {selectedRoomSchedules.length === 0 && (
                <Box sx={{ border: `1px dashed ${palette.grey[300]}`, borderRadius: "10px", p: 1.6, backgroundColor: "background.paper" }}>
                  <Typography sx={{ fontSize: "0.76rem", color: "grey.500" }}>No scheduled changes yet for this room.</Typography>
                </Box>
              )}

              {selectedRoomSchedules.map((schedule) => {
                const statusColor = getStatusColor(schedule.type);
                return (
                  <Box key={schedule.scheduleId} sx={{ border: `1px solid ${palette.grey[300]}`, borderRadius: "10px", p: 1.2, backgroundColor: "background.paper" }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.8}>
                      <Chip label={`${STATUS_SHORT[schedule.type]}  ${STATUS_LABELS[schedule.type]}`} size="small" sx={{ fontWeight: 700, fontSize: "0.62rem", color: statusColor, backgroundColor: alpha(statusColor, 0.12) }} />
                      <Typography sx={{ fontSize: "0.66rem", color: "grey.500" }}>{schedule.scheduleId}</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: "0.73rem", color: "grey.700" }}>{formatDateLabel(schedule.startDate)} - {formatDateLabel(schedule.endDate)}</Typography>
                    {schedule.type === "occupied" && (
                      <Typography sx={{ mt: 0.35, fontSize: "0.72rem", color: "grey.500" }}>
                        Admit {formatTimeLabel(schedule.checkInTime)} / Discharge {formatTimeLabel(schedule.checkOutTime)}
                      </Typography>
                    )}
                    <Typography sx={{ mt: 0.35, fontSize: "0.72rem", color: "grey.500" }}>
                      {schedule.type === "occupied" ? `Patient: ${schedule.patientName || "--"}` : schedule.notes || "No additional notes"}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
