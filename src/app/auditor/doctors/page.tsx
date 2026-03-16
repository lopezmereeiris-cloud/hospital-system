"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import DashboardCard from "@/components/DashboardCard";
import DoctorCards from "@/components/DoctorCard";
import DoctorDetailModal from "@/components/DoctorDetailModal";
import DepartmentPanel from "@/components/DepartmentPanel";
import PremiumFilter from "@/components/PremiumFilter";
import { Doctor } from "@/components/DoctorCard/interface";
import { ScheduleBlock } from "@/components/DoctorSchedule";
import doctorsData from "@/json/doctors.json";
import doctorSchedulesData from "@/json/doctorSchedules.json";
import { palette } from "@/theme/palette";

const scheduleMap = doctorSchedulesData as Record<string, ScheduleBlock[]>;
type Tab = "doctors" | "departments";

export default function AuditorDoctorsPage() {
  const doctors = doctorsData as Doctor[];
  const active = doctors.filter((d) => d.status === "Active").length;
  const onLeave = doctors.filter((d) => d.status === "On Leave").length;
  const departmentCount = new Set(doctors.map((d) => d.department)).size;
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("doctors");

  const tabOptions: { value: Tab; label: string; count?: number }[] = [
    { value: "doctors", label: "Doctors", count: doctors.length },
    { value: "departments", label: "Departments", count: departmentCount },
  ];

  return (
    <div>
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 3 }}><DashboardCard title="Total Doctors" value={doctors.length} icon={<GroupsRoundedIcon />} color={palette.primary.main} /></Grid>
        <Grid size={{ xs: 6, sm: 3 }}><DashboardCard title="Active" value={active} icon={<CheckCircleRoundedIcon />} color={palette.success.main} /></Grid>
        <Grid size={{ xs: 6, sm: 3 }}><DashboardCard title="On Leave" value={onLeave} icon={<EventBusyRoundedIcon />} color={palette.warning.main} /></Grid>
        <Grid size={{ xs: 6, sm: 3 }}><DashboardCard title="Departments" value={departmentCount} icon={<BusinessRoundedIcon />} color="#7C3AED" /></Grid>
      </Grid>

      <Box sx={{ mb: 3, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1.5 }}>
        <Box sx={{ p: 0.5, backgroundColor: palette.grey[100], borderRadius: "12px", display: "inline-flex" }}>
          <PremiumFilter options={tabOptions} active={tab} onChange={setTab} />
        </Box>
      </Box>

      {tab === "doctors" && (
        <DoctorCards
          doctors={doctors}
          onDoctorClick={(doctor) => {
            setSelectedDoctor(doctor);
            setModalOpen(true);
          }}
        />
      )}

      {tab === "departments" && <DepartmentPanel doctors={doctors} readOnly />}

      <DoctorDetailModal open={modalOpen} onClose={() => setModalOpen(false)} doctor={selectedDoctor} schedule={selectedDoctor ? scheduleMap[selectedDoctor.doctorId] || [] : []} />
    </div>
  );
}
