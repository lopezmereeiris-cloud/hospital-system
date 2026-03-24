"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import WorkspacesRoundedIcon from "@mui/icons-material/WorkspacesRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DashboardCard from "@/components/DashboardCard";
import DoctorCards from "@/components/DoctorCard";
import DoctorDetailModal from "@/components/DoctorDetailModal";
import AddDoctorModal from "@/components/AddDoctorModal";
import DepartmentPanel from "@/components/DepartmentPanel";
import PremiumFilter from "@/components/PremiumFilter";
import { Doctor } from "@/components/DoctorCard/interface";
import { AddDoctorFormData } from "@/components/AddDoctorModal/interface";
import { ScheduleBlock } from "@/components/DoctorSchedule";
import doctorsData from "@/json/doctors.json";
import doctorSchedulesData from "@/json/doctorSchedules.json";
import { palette } from "@/theme/palette";
import { useUser } from "@/context/UserContext";
import { appendAuditLog, buildFieldChanges } from "@/lib/auditLogs";

const scheduleMap = doctorSchedulesData as Record<string, ScheduleBlock[]>;
type Tab = "doctors" | "departments";

export default function DoctorsPage() {
  const { user } = useUser();
  const [doctors, setDoctors] = useState<Doctor[]>(doctorsData as Doctor[]);
  const active = doctors.filter((d) => d.status === "Active").length;
  const onLeave = doctors.filter((d) => d.status === "On Leave").length;
  const specializations = new Set(doctors.map((d) => d.specialization)).size;
  const departmentCount = new Set(doctors.map((d) => d.department)).size;

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("doctors");

  const allDepartments = Array.from(new Set(doctors.map((d) => d.department)));

  const handleAddDoctor = (data: AddDoctorFormData) => {
    const nextDoctorId = `DOC-${String(doctors.length + 1).padStart(3, "0")}`;
    const doctor: Doctor = {
      doctorId: nextDoctorId,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      sex: data.sex,
      contactNumber: data.contactNumber,
      email: data.email,
      specialization: data.specialization,
      subSpecialization: data.subSpecialization || null,
      department: data.department,
      prcLicenseNumber: data.prcLicenseNumber,
      ptrNumber: data.ptrNumber,
      yearsOfExperience: Number(data.yearsOfExperience || 0),
      bio: data.bio,
      status: data.status,
    };

    setDoctors((prev) => [...prev, doctor]);

    appendAuditLog({
      action: "CREATE",
      module: "Doctor Directory",
      entity: "Doctor",
      entityId: nextDoctorId,
      actor: { name: user.name, role: user.role },
      summary: `Added new doctor Dr. ${doctor.firstName} ${doctor.lastName}.`,
      changes: buildFieldChanges(
        {} as Record<string, unknown>,
        doctor as unknown as Record<string, unknown>,
        {
          includeFields: ["doctorId", "firstName", "lastName", "department", "specialization", "status"],
        }
      ),
    });
  };

  const handleDoctorClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setModalOpen(true);
  };

  const tabOptions: { value: Tab; label: string; count?: number }[] = [
    { value: "doctors", label: "Doctors", count: doctors.length },
    { value: "departments", label: "Departments", count: departmentCount },
  ];

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
            title="Departments"
            value={departmentCount}
            icon={<BusinessRoundedIcon />}
            color="#7C3AED"
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            p: 0.5,
            backgroundColor: palette.grey[100],
            borderRadius: "12px",
            display: "inline-flex",
          }}
        >
          <PremiumFilter options={tabOptions} active={tab} onChange={setTab} />
        </Box>
        {tab === "doctors" && (
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => setAddModalOpen(true)}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            fontWeight: 600,
            px: 2.5,
            py: 1,
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          }}
        >
          Add Doctor
        </Button>
        )}
      </Box>

      {tab === "doctors" && (
        <DoctorCards doctors={doctors} onDoctorClick={handleDoctorClick} />
      )}

      {tab === "departments" && (
        <DepartmentPanel doctors={doctors} />
      )}

      <DoctorDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        doctor={selectedDoctor}
        schedule={selectedDoctor ? scheduleMap[selectedDoctor.doctorId] || [] : []}
      />

      <AddDoctorModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddDoctor}
        departments={allDepartments}
      />
    </div>
  );
}
