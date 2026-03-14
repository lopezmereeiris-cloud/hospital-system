"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import PremiumFilter from "@/components/PremiumFilter";
import { DoctorCardProps } from "./interface";
import { palette } from "@/theme/palette";
import {
  DoctorGrid,
  DoctorCardContainer,
  DoctorHeader,
  DoctorInfo,
  DoctorName,
  DoctorSpecialization,
  DoctorBio,
  DetailRow,
  DoctorToolbar,
} from "./elements";

const statusColor: Record<string, "success" | "warning" | "error"> = {
  Active: "success",
  "On Leave": "warning",
  Inactive: "error",
};

function getInitials(first: string, last: string) {
  return `${first[0]}${last[0]}`.toUpperCase();
}

const avatarColors = [
  `linear-gradient(135deg, ${palette.primary.main}, #6C83F6)`,
  "linear-gradient(135deg, #7C3AED, #A78BFA)",
  `linear-gradient(135deg, ${palette.success.main}, #6CE9A6)`,
  `linear-gradient(135deg, ${palette.warning.main}, #FEC84B)`,
  `linear-gradient(135deg, ${palette.error.main}, #FDA29B)`,
  `linear-gradient(135deg, ${palette.info.main}, #7DD3FC)`,
];

const DoctorCards: React.FC<DoctorCardProps> = ({ doctors, onDoctorClick }) => {
  const [filter, setFilter] = useState("all");

  const departments = Array.from(new Set(doctors.map((d) => d.department)));
  const filterOptions = [
    { value: "all", label: "All Doctors", count: doctors.length },
    ...departments.map((d) => ({
      value: d,
      label: d,
      count: doctors.filter((doc) => doc.department === d).length,
    })),
  ];

  const filtered =
    filter === "all" ? doctors : doctors.filter((d) => d.department === filter);

  return (
    <div>
      <DoctorToolbar>
        <div style={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
          Doctor Directory
        </div>
        <PremiumFilter
          options={filterOptions}
          active={filter}
          onChange={setFilter}
        />
      </DoctorToolbar>

      <DoctorGrid>
        {filtered.map((doc, idx) => (
          <DoctorCardContainer
            key={doc.doctorId}
            elevation={0}
            onClick={() => onDoctorClick?.(doc)}
            sx={onDoctorClick ? { cursor: "pointer" } : undefined}
          >
            <DoctorHeader>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  background: avatarColors[idx % avatarColors.length],
                  fontWeight: 700,
                  fontSize: "0.9rem",
                }}
              >
                {getInitials(doc.firstName, doc.lastName)}
              </Avatar>
              <DoctorInfo>
                <DoctorName>
                  Dr. {doc.firstName} {doc.lastName}
                </DoctorName>
                <DoctorSpecialization>
                  {doc.specialization}
                  {doc.subSpecialization ? ` — ${doc.subSpecialization}` : ""}
                </DoctorSpecialization>
              </DoctorInfo>
              <Chip
                label={doc.status}
                color={statusColor[doc.status] || "default"}
                size="small"
              />
            </DoctorHeader>

            <DoctorBio>{doc.bio}</DoctorBio>

            <DetailRow>
              <WorkRoundedIcon />
              <span>{doc.department} &middot; {doc.yearsOfExperience} yrs experience</span>
            </DetailRow>
            <DetailRow>
              <BadgeRoundedIcon />
              <span>PRC: {doc.prcLicenseNumber}</span>
            </DetailRow>
            <DetailRow>
              <PhoneRoundedIcon />
              <span>{doc.contactNumber}</span>
            </DetailRow>
            <DetailRow>
              <EmailRoundedIcon />
              <span>{doc.email}</span>
            </DetailRow>
          </DoctorCardContainer>
        ))}
      </DoctorGrid>
    </div>
  );
};

export default DoctorCards;
