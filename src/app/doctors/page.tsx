"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import WorkspacesRoundedIcon from "@mui/icons-material/WorkspacesRounded";
import DashboardCard from "@/components/DashboardCard";
import DoctorCards from "@/components/DoctorCard";
import { Doctor } from "@/components/DoctorCard/interface";
import doctorsData from "@/json/doctors.json";

export default function DoctorsPage() {
  const doctors = doctorsData as Doctor[];
  const active = doctors.filter((d) => d.status === "Active").length;
  const onLeave = doctors.filter((d) => d.status === "On Leave").length;
  const specializations = new Set(doctors.map((d) => d.specialization)).size;

  return (
    <div>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="Total Doctors"
            value={doctors.length}
            icon={<GroupsRoundedIcon />}
            color="#4361EE"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="Active"
            value={active}
            icon={<CheckCircleRoundedIcon />}
            color="#12B76A"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="On Leave"
            value={onLeave}
            icon={<EventBusyRoundedIcon />}
            color="#F79009"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="Specializations"
            value={specializations}
            icon={<WorkspacesRoundedIcon />}
            color="#7C3AED"
          />
        </Grid>
      </Grid>

      <DoctorCards doctors={doctors} />
    </div>
  );
}
