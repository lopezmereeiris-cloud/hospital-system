"use client";

import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DoctorSchedule from "@/components/DoctorSchedule";
import { DoctorDetailModalProps } from "./interface";
import { palette } from "@/theme/palette";
import {
  ModalHeader,
  HeaderInfo,
  DoctorNameLarge,
  Subtitle,
  DetailGrid,
  DetailItem,
  DetailLabel,
  DetailValue,
  SectionDivider,
  SectionTitle,
} from "./elements";

const statusColor: Record<string, "success" | "warning" | "error"> = {
  Active: "success",
  "On Leave": "warning",
  Inactive: "error",
};

const avatarColors = [
  `linear-gradient(135deg, ${palette.primary.main}, #6C83F6)`,
  "linear-gradient(135deg, #7C3AED, #A78BFA)",
  `linear-gradient(135deg, ${palette.success.main}, #6CE9A6)`,
  `linear-gradient(135deg, ${palette.warning.main}, #FEC84B)`,
  `linear-gradient(135deg, ${palette.error.main}, #FDA29B)`,
  `linear-gradient(135deg, ${palette.info.main}, #7DD3FC)`,
];

function getInitials(first: string, last: string) {
  return `${first[0]}${last[0]}`.toUpperCase();
}

const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({
  open,
  onClose,
  doctor,
  schedule,
}) => {
  const [tab, setTab] = useState(0);

  if (!doctor) return null;

  const doc = doctor;
  const colorIdx =
    parseInt(doc.doctorId.replace(/\D/g, ""), 10) % avatarColors.length;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={tab === 1 ? "lg" : "sm"}
      fullWidth
      PaperProps={{
        sx: { transition: "max-width 0.3s ease" },
      }}
    >
      <DialogContent sx={{ p: 4, pb: 3 }}>
        {/* Header */}
        <ModalHeader>
          <HeaderInfo>
            <Avatar
              sx={{
                width: 52,
                height: 52,
                background: avatarColors[colorIdx],
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              {getInitials(doc.firstName, doc.lastName)}
            </Avatar>
            <div>
              <DoctorNameLarge>
                Dr. {doc.firstName} {doc.lastName}
              </DoctorNameLarge>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
                <Subtitle>
                  {doc.specialization}
                  {doc.subSpecialization ? ` — ${doc.subSpecialization}` : ""}
                </Subtitle>
                <Chip
                  label={doc.status}
                  color={statusColor[doc.status] || "default"}
                  size="small"
                />
              </div>
            </div>
          </HeaderInfo>
          <IconButton onClick={onClose} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </ModalHeader>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            mb: 3,
            minHeight: 36,
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.82rem",
              minHeight: 36,
              px: 2,
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.main",
            },
          }}
        >
          <Tab
            icon={<PersonRoundedIcon sx={{ fontSize: 18 }} />}
            iconPosition="start"
            label="Doctor Details"
          />
          <Tab
            icon={<CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />}
            iconPosition="start"
            label="Doctor's Schedule"
          />
        </Tabs>

        {/* Tab 0: Details */}
        {tab === 0 && (
          <Box>
            <SectionTitle>
              <PersonRoundedIcon sx={{ fontSize: 18 }} />
              Personal Information
            </SectionTitle>
            <DetailGrid>
              <DetailItem>
                <DetailLabel>Full Name</DetailLabel>
                <DetailValue>
                  {doc.firstName} {doc.middleName} {doc.lastName}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Date of Birth</DetailLabel>
                <DetailValue>{doc.dateOfBirth}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Sex</DetailLabel>
                <DetailValue>{doc.sex}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Status</DetailLabel>
                <DetailValue>{doc.status}</DetailValue>
              </DetailItem>
            </DetailGrid>

            <SectionDivider />

            <SectionTitle>
              <PhoneRoundedIcon sx={{ fontSize: 18 }} />
              Contact Information
            </SectionTitle>
            <DetailGrid>
              <DetailItem>
                <DetailLabel>Phone</DetailLabel>
                <DetailValue>{doc.contactNumber}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Email</DetailLabel>
                <DetailValue>{doc.email}</DetailValue>
              </DetailItem>
            </DetailGrid>

            <SectionDivider />

            <SectionTitle>
              <WorkRoundedIcon sx={{ fontSize: 18 }} />
              Professional Details
            </SectionTitle>
            <DetailGrid>
              <DetailItem>
                <DetailLabel>Department</DetailLabel>
                <DetailValue>{doc.department}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Specialization</DetailLabel>
                <DetailValue>
                  {doc.specialization}
                  {doc.subSpecialization ? ` — ${doc.subSpecialization}` : ""}
                </DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Years of Experience</DetailLabel>
                <DetailValue>{doc.yearsOfExperience} years</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Bio</DetailLabel>
                <DetailValue>{doc.bio}</DetailValue>
              </DetailItem>
            </DetailGrid>

            <SectionDivider />

            <SectionTitle>
              <BadgeRoundedIcon sx={{ fontSize: 18 }} />
              License & Credentials
            </SectionTitle>
            <DetailGrid>
              <DetailItem>
                <DetailLabel>PRC License Number</DetailLabel>
                <DetailValue>{doc.prcLicenseNumber}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>PTR Number</DetailLabel>
                <DetailValue>{doc.ptrNumber}</DetailValue>
              </DetailItem>
            </DetailGrid>
          </Box>
        )}

        {/* Tab 1: Schedule */}
        {tab === 1 && (
          <Box sx={{ overflowX: "auto", mx: -2 }}>
            <DoctorSchedule schedule={schedule} />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DoctorDetailModal;
