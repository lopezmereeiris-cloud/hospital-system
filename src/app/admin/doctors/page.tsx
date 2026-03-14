"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import WorkspacesRoundedIcon from "@mui/icons-material/WorkspacesRounded";
import DashboardCard from "@/components/DashboardCard";
import DoctorCards from "@/components/DoctorCard";
import DoctorDetailModal from "@/components/DoctorDetailModal";
import { Doctor } from "@/components/DoctorCard/interface";
import { ScheduleBlock } from "@/components/DoctorSchedule";
import doctorsData from "@/json/doctors.json";
import doctorSchedulesData from "@/json/doctorSchedules.json";
import { palette } from "@/theme/palette";

const scheduleMap = doctorSchedulesData as Record<string, ScheduleBlock[]>;

export default function DoctorsPage() {
  const doctors = doctorsData as Doctor[];
  const active = doctors.filter((d) => d.status === "Active").length;
  const onLeave = doctors.filter((d) => d.status === "On Leave").length;
  const specializations = new Set(doctors.map((d) => d.specialization)).size;

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
  };

  return (
    <div>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="Total Doctors"
            value={doctors.length}
            icon={<GroupsRoundedIcon />}
            color={palette.primary.main}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="Active"
            value={active}
            icon={<CheckCircleRoundedIcon />}
            color={palette.success.main}
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <DashboardCard
            title="On Leave"
            value={onLeave}
            icon={<EventBusyRoundedIcon />}
            color={palette.warning.main}
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

      <DoctorCards doctors={doctors} onDoctorClick={handleDoctorClick} />

      <DoctorDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        doctor={selectedDoctor}
        schedule={selectedDoctor ? scheduleMap[selectedDoctor.doctorId] || [] : []}
      />
    </div>
  );
}
