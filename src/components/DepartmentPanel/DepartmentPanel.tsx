"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Chip from "@mui/material/Chip";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { alpha } from "@mui/material/styles";
import { palette } from "@/theme/palette";
import type { Doctor } from "@/components/DoctorCard/interface";

export interface Department {
  id: string;
  name: string;
  head: string;
  description: string;
  location: string;
  extension: string;
  email: string;
  status: "Active" | "Inactive";
}

interface DepartmentPanelProps {
  doctors: Doctor[];
}

const INITIAL_FORM: Omit<Department, "id"> = {
  name: "",
  head: "",
  description: "",
  location: "",
  extension: "",
  email: "",
  status: "Active",
};

const gradientColors = [
  `linear-gradient(135deg, ${palette.primary.main}, #6C83F6)`,
  "linear-gradient(135deg, #7C3AED, #A78BFA)",
  `linear-gradient(135deg, ${palette.success.main}, #6CE9A6)`,
  `linear-gradient(135deg, ${palette.warning.main}, #FEC84B)`,
  `linear-gradient(135deg, #226E8E, #5DADE2)`,
  `linear-gradient(135deg, ${palette.error.main}, #FDA29B)`,
  `linear-gradient(135deg, ${palette.info.main}, #7DD3FC)`,
  "linear-gradient(135deg, #E91E63, #F48FB1)",
];

function buildInitialDepartments(doctors: Doctor[]): Department[] {
  const deptNames = Array.from(new Set(doctors.map((d) => d.department)));
  return deptNames.map((name, i) => {
    const deptDoctors = doctors.filter((d) => d.department === name);
    const senior = deptDoctors.reduce(
      (best, d) => (d.yearsOfExperience > best.yearsOfExperience ? d : best),
      deptDoctors[0],
    );
    return {
      id: `DEPT-${String(i + 1).padStart(3, "0")}`,
      name,
      head: senior ? `Dr. ${senior.firstName} ${senior.lastName}` : "",
      description: `The ${name} department provides specialized healthcare services, diagnostics, and treatment plans for patients.`,
      location: `${["Main Building", "East Wing", "West Wing", "North Annex"][i % 4]}, Floor ${(i % 3) + 1}`,
      extension: `${1000 + i * 100 + (i * 17) % 90}`,
      email: `${name.toLowerCase().replace(/[^a-z]/g, "")}@hospital.ph`,
      status: "Active",
    };
  });
}

const DepartmentPanel: React.FC<DepartmentPanelProps> = ({ doctors }) => {
  const [departments, setDepartments] = useState<Department[]>(() => buildInitialDepartments(doctors));
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [detailDept, setDetailDept] = useState<Department | null>(null);

  const doctorCountMap = doctors.reduce<Record<string, number>>((map, d) => {
    map[d.department] = (map[d.department] || 0) + 1;
    return map;
  }, {});

  const openCreate = () => {
    setEditingId(null);
    setForm(INITIAL_FORM);
    setModalOpen(true);
  };

  const openEdit = (dept: Department) => {
    setEditingId(dept.id);
    setForm({ name: dept.name, head: dept.head, description: dept.description, location: dept.location, extension: dept.extension, email: dept.email, status: dept.status });
    setModalOpen(true);
  };

  const handleSave = () => {
    const trimmedName = form.name.trim();
    if (!trimmedName) return;
    if (editingId) {
      setDepartments((prev) =>
        prev.map((d) => (d.id === editingId ? { ...d, ...form, name: trimmedName } : d)),
      );
    } else {
      setDepartments((prev) => [
        ...prev,
        { ...form, name: trimmedName, id: `DEPT-${String(prev.length + 1).padStart(3, "0")}` },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
    if (detailDept?.id === id) setDetailDept(null);
  };

  const update = (field: keyof Omit<Department, "id">, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const inputSx = { "& .MuiOutlinedInput-root": { borderRadius: "10px" } };

  return (
    <Box>
      {/* Toolbar */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 1.5 }}>
        <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
          Departments ({departments.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={openCreate}
          sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600, px: 2.5, py: 0.9, boxShadow: "none", "&:hover": { boxShadow: "none" } }}
        >
          Add Department
        </Button>
      </Box>

      {/* Grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }, gap: 2.5 }}>
        {departments.map((dept, idx) => {
          const count = doctorCountMap[dept.name] || 0;
          return (
            <Paper
              key={dept.id}
              elevation={0}
              onClick={() => setDetailDept(dept)}
              sx={{
                borderRadius: "16px",
                border: `1px solid ${palette.divider}`,
                p: 3,
                cursor: "pointer",
                transition: "all 0.22s ease",
                "&:hover": {
                  borderColor: alpha(palette.primary.main, 0.2),
                  boxShadow: `0 4px 20px ${alpha(palette.primary.main, 0.08)}`,
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Avatar sx={{ width: 44, height: 44, background: gradientColors[idx % gradientColors.length], fontWeight: 700, fontSize: "0.82rem" }}>
                  {dept.name.substring(0, 2).toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "text.primary", lineHeight: 1.3 }}>
                    {dept.name}
                  </Typography>
                  <Typography sx={{ fontSize: "0.76rem", color: "text.secondary", mt: 0.25 }}>
                    {dept.head || "No head assigned"}
                  </Typography>
                </Box>
                <Chip label={dept.status} color={dept.status === "Active" ? "success" : "default"} size="small" />
              </Box>

              <Typography sx={{ fontSize: "0.78rem", color: "text.secondary", lineHeight: 1.6, mb: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {dept.description}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "0.78rem", color: "text.secondary", mb: 0.6 }}>
                <GroupsRoundedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                <span>{count} doctor{count !== 1 ? "s" : ""}</span>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "0.78rem", color: "text.secondary", mb: 0.6 }}>
                <LocationOnRoundedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                <span>{dept.location}</span>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "0.78rem", color: "text.secondary" }}>
                <PhoneRoundedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                <span>Ext. {dept.extension}</span>
              </Box>
            </Paper>
          );
        })}
      </Box>

      {/* Detail Modal */}
      <Dialog open={!!detailDept} onClose={() => setDetailDept(null)} maxWidth="sm" fullWidth>
        {detailDept && (
          <DialogContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: "14px", background: gradientColors[departments.indexOf(detailDept) % gradientColors.length], display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <LocalHospitalRoundedIcon sx={{ color: "#fff", fontSize: 24 }} />
                </Box>
                <div>
                  <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, color: "text.primary" }}>
                    {detailDept.name}
                  </Typography>
                  <Typography sx={{ fontSize: "0.82rem", color: "text.secondary", mt: 0.2 }}>
                    {detailDept.id}
                  </Typography>
                </div>
              </Box>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); openEdit(detailDept); setDetailDept(null); }}>
                  <EditRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleDelete(detailDept.id); }}>
                  <DeleteRoundedIcon sx={{ fontSize: 18, color: palette.error.main }} />
                </IconButton>
                <IconButton size="small" onClick={() => setDetailDept(null)}>
                  <CloseRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Box>

            <Chip label={detailDept.status} color={detailDept.status === "Active" ? "success" : "default"} size="small" sx={{ mb: 2 }} />

            <Typography sx={{ fontSize: "0.86rem", color: "text.secondary", lineHeight: 1.7, mb: 2.5 }}>
              {detailDept.description}
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2.5 }}>
              {[
                { label: "Department Head", value: detailDept.head || "—" },
                { label: "Doctors Assigned", value: `${doctorCountMap[detailDept.name] || 0} active` },
                { label: "Location", value: detailDept.location },
                { label: "Extension", value: detailDept.extension },
              ].map((item) => (
                <Box key={item.label} sx={{ p: 1.8, borderRadius: "12px", backgroundColor: "grey.50", border: `1px solid ${palette.divider}` }}>
                  <Typography sx={{ fontSize: "0.66rem", fontWeight: 700, color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.4 }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ fontSize: "0.86rem", fontWeight: 500, color: "text.primary" }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "0.82rem", color: "text.secondary" }}>
              <EmailRoundedIcon sx={{ fontSize: 16 }} />
              {detailDept.email}
            </Box>

            {/* Doctors in this dept */}
            {(doctorCountMap[detailDept.name] || 0) > 0 && (
              <Box sx={{ mt: 2.5 }}>
                <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "text.primary", mb: 1.2, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Assigned Doctors
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {doctors
                    .filter((d) => d.department === detailDept.name)
                    .map((d) => (
                      <Box
                        key={d.doctorId}
                        sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.2, borderRadius: "10px", border: `1px solid ${palette.divider}` }}
                      >
                        <Avatar sx={{ width: 32, height: 32, fontSize: "0.7rem", fontWeight: 700, background: palette.primary.main }}>
                          {d.firstName[0]}{d.lastName[0]}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "text.primary" }}>
                            Dr. {d.firstName} {d.lastName}
                          </Typography>
                          <Typography sx={{ fontSize: "0.72rem", color: "text.secondary" }}>
                            {d.specialization}
                          </Typography>
                        </Box>
                        <Chip label={d.status} color={d.status === "Active" ? "success" : d.status === "On Leave" ? "warning" : "error"} size="small" sx={{ fontSize: "0.68rem", height: 22 }} />
                      </Box>
                    ))}
                </Box>
              </Box>
            )}
          </DialogContent>
        )}
      </Dialog>

      {/* Create / Edit Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
            <div>
              <Typography sx={{ fontSize: "1.2rem", fontWeight: 700, color: "text.primary" }}>
                {editingId ? "Edit Department" : "Add New Department"}
              </Typography>
              <Typography sx={{ fontSize: "0.82rem", color: "text.secondary", mt: 0.3 }}>
                {editingId ? "Update department information below." : "Fill in the details for the new department."}
              </Typography>
            </div>
            <IconButton size="small" onClick={() => setModalOpen(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.2 }}>
            <TextField label="Department Name" required fullWidth value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Cardiology" InputLabelProps={{ shrink: true }} sx={inputSx} />
            <TextField label="Department Head" fullWidth value={form.head} onChange={(e) => update("head", e.target.value)} placeholder="e.g. Dr. Juan Dela Cruz" InputLabelProps={{ shrink: true }} sx={inputSx} />
            <TextField label="Description" fullWidth multiline rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Describe the department's services and scope..." InputLabelProps={{ shrink: true }} sx={inputSx} />
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <TextField label="Location" fullWidth value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. East Wing, Floor 2" InputLabelProps={{ shrink: true }} sx={inputSx} />
              <TextField label="Extension" fullWidth value={form.extension} onChange={(e) => update("extension", e.target.value)} placeholder="e.g. 1200" InputLabelProps={{ shrink: true }} sx={inputSx} />
            </Box>
            <TextField label="Email" fullWidth value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="e.g. department@hospital.ph" InputLabelProps={{ shrink: true }} sx={inputSx} />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, mt: 3, pt: 2.5, borderTop: `1px solid ${palette.divider}` }}>
            <Button variant="outlined" onClick={() => setModalOpen(false)} sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600, px: 2.5, py: 0.9 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave} disabled={!form.name.trim()} sx={{ textTransform: "none", borderRadius: "10px", fontWeight: 600, px: 2.5, py: 0.9, boxShadow: "none", "&:hover": { boxShadow: "none" } }}>
              {editingId ? "Save Changes" : "Create Department"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DepartmentPanel;
