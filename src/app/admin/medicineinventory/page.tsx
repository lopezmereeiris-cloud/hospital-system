"use client";

import React, { useState } from "react";
import AddMedicineModal from "@/components/AddMedicineModal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { alpha } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import DoNotDisturbRoundedIcon from "@mui/icons-material/DoNotDisturbRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import DashboardCard from "@/components/DashboardCard";
import InventoryTable from "@/components/InventoryTable";
import MedicineCard from "@/components/MedicineCard";
import { Medicine } from "@/components/InventoryTable/interface";
import inventoryData from "@/json/inventory.json";

import { palette } from "@/theme/palette";
type FilterKey = "all" | "low_stock" | "near_expiry" | "expired";

export default function InventoryPage() {
  const [medicines, setMedicines] = useState<Medicine[]>(inventoryData as Medicine[]);
  const lowStock = medicines.filter((m) => m.lowStockAlert).length;
  const nearExpiry = medicines.filter((m) => m.nearExpiryFlag).length;
  const expired = medicines.filter((m) => m.expiredFlag).length;
  const totalValue = medicines.reduce((sum, m) => sum + m.totalValue, 0);

  const [view, setView] = useState<"list" | "card">("list");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  const filteredMeds = medicines.filter((m) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      m.genericName.toLowerCase().includes(q) ||
      m.brandNames.some((b) => b.toLowerCase().includes(q)) ||
      m.id.toLowerCase().includes(q);
    let matchesFilter = true;
    if (filter === "low_stock") matchesFilter = m.lowStockAlert;
    else if (filter === "near_expiry") matchesFilter = m.nearExpiryFlag;
    else if (filter === "expired") matchesFilter = m.expiredFlag;
    return matchesSearch && matchesFilter;
  });

  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: "all", label: "All", count: medicines.length },
    { key: "low_stock", label: "Low Stock", count: lowStock },
    { key: "near_expiry", label: "Near Expiry", count: nearExpiry },
    { key: "expired", label: "Expired", count: expired },
  ];

  const handleAddMedicine = (medicine: Medicine) => {
    setMedicines((prev) => [...prev, medicine]);
  };

  const handleEditMedicine = (updated: Medicine) => {
    setMedicines((prev) => prev.map((m) => m.id === updated.id ? updated : m));
  };

  const handleOpenEdit = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setEditModalOpen(true);
  };

  const handleOpenView = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setViewModalOpen(true);
  };

  const handleCloseModals = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
    setViewModalOpen(false);
    setSelectedMedicine(null);
  };

  return (
    <Box sx={{ maxWidth: 1440, mx: "auto" }}>
      {/* ── Toolbar ── */}
      <Paper
        sx={{
          p: "12px 16px",
          mb: 2.5,
          borderRadius: "12px",
          border: `1px solid ${palette.grey[200]}`,
          boxShadow: "none",
        }}
      >
        {/* Row 1: Search + View Toggle + Add Medicine */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.25 }}>
          {/* Search */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              bgcolor: palette.background.default,
              borderRadius: "8px",
              border: `1px solid ${palette.grey[200]}`,
              px: 1.5,
              py: 0.25,
              transition: "border-color 0.2s",
              "&:focus-within": { borderColor: "primary.main" },
            }}
          >
            <SearchRoundedIcon sx={{ color: "grey.400", fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="Search medicines…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, fontSize: 14, fontWeight: 500, color: "grey.700" }}
              inputProps={{ "aria-label": "search medicines" }}
            />
          </Box>

          {/* View Toggle — flexShrink:0 so it never disappears */}
          <Box
            sx={{
              display: "flex",
              flexShrink: 0,
              bgcolor: palette.background.default,
              borderRadius: "8px",
              border: `1px solid ${palette.grey[200]}`,
              p: "3px",
              gap: "2px",
            }}
          >
            <Tooltip title="List view" arrow>
              <IconButton
                size="small"
                onClick={() => setView("list")}
                sx={{
                  borderRadius: "6px",
                  px: 1.5,
                  bgcolor: view === "list" ? palette.background.paper : "transparent",
                  boxShadow: view === "list" ? "0 1px 3px rgba(16,24,40,0.10)" : "none",
                  color: view === "list" ? palette.primary.main : palette.grey[400],
                  transition: "all 0.15s ease",
                  "&:hover": { bgcolor: view === "list" ? palette.background.paper : alpha(palette.primary.main, 0.06) },
                }}
              >
                <ViewListRoundedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Card view" arrow>
              <IconButton
                size="small"
                onClick={() => setView("card")}
                sx={{
                  borderRadius: "6px",
                  px: 1.5,
                  bgcolor: view === "card" ? palette.background.paper : "transparent",
                  boxShadow: view === "card" ? "0 1px 3px rgba(16,24,40,0.10)" : "none",
                  color: view === "card" ? palette.primary.main : palette.grey[400],
                  transition: "all 0.15s ease",
                  "&:hover": { bgcolor: view === "card" ? palette.background.paper : alpha(palette.primary.main, 0.06) },
                }}
              >
                <GridViewRoundedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Add Medicine Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: "8px", fontWeight: 700, ml: 2 }}
            onClick={() => setAddModalOpen(true)}
          >
            Add Medicine
          </Button>
        </Box>

        {/* Row 2: Filter Chips */}
        <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <Chip
                key={f.key}
                label={`${f.label} (${f.count})`}
                onClick={() => setFilter(f.key)}
                size="small"
                sx={{
                  height: 30,
                  fontWeight: 600,
                  fontSize: 13,
                  borderRadius: "8px",
                  bgcolor: active ? alpha(palette.primary.main, 0.1) : palette.background.default,
                  color: active ? palette.primary.main : palette.grey[500],
                  border: active
                    ? `1px solid ${alpha(palette.primary.main, 0.3)}`
                    : `1px solid ${palette.grey[200]}`,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  "&:hover": {
                    bgcolor: active ? alpha(palette.primary.main, 0.14) : palette.grey[100],
                  },
                }}
              />
            );
          })}
        </Box>
      </Paper>

      {/* ── Results count ── */}
      <Typography sx={{ fontSize: 13, fontWeight: 500, color: "grey.400", mb: 2 }}>
        Showing <span style={{ fontWeight: 700, color: "grey.700" }}>{filteredMeds.length}</span> of {medicines.length} medicines
      </Typography>

      {/* ── Content ── */}
      {view === "list" ? (
        <InventoryTable medicines={filteredMeds} onEdit={handleOpenEdit} onView={handleOpenView} />
      ) : filteredMeds.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "grey.400",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          No medicines match your search or filter.
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {filteredMeds.map((med) => (
            <Grid key={med.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <MedicineCard medicine={med} onEdit={() => handleOpenEdit(med)} onView={() => handleOpenView(med)} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Medicine Modal */}
      <AddMedicineModal
        open={addModalOpen}
        onClose={handleCloseModals}
        onAdd={handleAddMedicine}
      />

      {/* Edit Medicine Modal */}
      <AddMedicineModal
        open={editModalOpen}
        onClose={handleCloseModals}
        onAdd={handleAddMedicine}
        editMedicine={selectedMedicine}
        onEdit={handleEditMedicine}
        mode="edit"
      />

      {/* View Medicine Modal */}
      <AddMedicineModal
        open={viewModalOpen}
        onClose={handleCloseModals}
        onAdd={handleAddMedicine}
        editMedicine={selectedMedicine}
        mode="view"
      />
    </Box>
  );
}
