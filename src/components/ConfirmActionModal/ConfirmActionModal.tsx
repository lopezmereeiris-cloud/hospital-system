"use client";

import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import {
  Overlay,
  ModalPanel,
  ModalHeader,
  SectionTitle,
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  SectionDivider,
} from "@/components/TransactionDetailModal/elements";
import { ConfirmActionModalProps } from "./interface";
import { palette } from "@/theme/palette";

const fmtDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function ConfirmActionModal({
  open,
  onClose,
  onConfirm,
  type,
  appointment,
}: ConfirmActionModalProps) {
  if (!open || !appointment) return null;

  const isApprove = type === "approve";

  return (
    <Overlay onClick={onClose}>
      <ModalPanel
        onClick={(e) => e.stopPropagation()}
        sx={{ maxWidth: 460 }}
      >
        {/* Header */}
        <ModalHeader>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: isApprove ? "#F0FDF4" : "#FEF3F2",
                color: isApprove ? "#16A34A" : "#D92D20",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {isApprove ? (
                <CheckCircleOutlineRoundedIcon sx={{ fontSize: 26 }} />
              ) : (
                <CancelOutlinedIcon sx={{ fontSize: 26 }} />
              )}
            </div>
            <div>
              <Typography
                sx={{ fontSize: "1.05rem", fontWeight: 700, color: "text.primary", lineHeight: 1.2 }}
              >
                {isApprove ? "Approve Appointment" : "Reject Appointment"}
              </Typography>
              <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", mt: 0.25 }}>
                {isApprove
                  ? "This will confirm the appointment and notify the patient."
                  : "This action cannot be undone."}
              </Typography>
            </div>
          </div>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "grey.400", "&:hover": { color: "text.primary", bgcolor: "grey.100" } }}
          >
            <CloseRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </ModalHeader>

        {/* Appointment Summary */}
        <SectionTitle>Appointment Summary</SectionTitle>
        <DetailGrid>
          <DetailItem>
            <DetailLabel>Patient</DetailLabel>
            <DetailValue>{appointment.patientName}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Doctor</DetailLabel>
            <DetailValue>{appointment.assignedDoctor}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Date</DetailLabel>
            <DetailValue>{fmtDate(appointment.date)}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Time</DetailLabel>
            <DetailValue>{appointment.time}</DetailValue>
          </DetailItem>
        </DetailGrid>

        <SectionDivider />

        {/* Actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
              borderColor: "grey.300",
              color: "grey.700",
              "&:hover": { borderColor: "grey.400", bgcolor: palette.background.default },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            startIcon={
              isApprove ? (
                <CheckCircleOutlineRoundedIcon sx={{ fontSize: 18 }} />
              ) : (
                <CancelOutlinedIcon sx={{ fontSize: 18 }} />
              )
            }
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
              boxShadow: "none",
              bgcolor: isApprove ? palette.success.main : "#D92D20",
              "&:hover": {
                bgcolor: isApprove ? "#039855" : palette.error.dark,
                boxShadow: "none",
              },
            }}
          >
            {isApprove ? "Approve" : "Reject"}
          </Button>
        </div>
      </ModalPanel>
    </Overlay>
  );
}
