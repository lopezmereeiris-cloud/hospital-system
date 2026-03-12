"use client";

import React, { useState } from "react";
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

type FilterKey = "all" | "low_stock" | "near_expiry" | "expired";

export default function InventoryPage() {
  const medicines = inventoryData as Medicine[];
  const lowStock = medicines.filter((m) => m.lowStockAlert).length;
  const nearExpiry = medicines.filter((m) => m.nearExpiryFlag).length;
  const expired = medicines.filter((m) => m.expiredFlag).length;
  const totalValue = medicines.reduce((sum, m) => sum + m.totalValue, 0);

  const [view, setView] = useState<"list" | "card">("list");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

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

  return (
    <Box sx={{ maxWidth: 1440, mx: "auto" }}>
      {/* ── Stat Cards ── */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 4, lg: 2.4 }}>
          <DashboardCard
            title="Total Items"
            value={medicines.length}
            icon={<MedicationRoundedIcon />}
            color="#4361EE"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, lg: 2.4 }}>
          <DashboardCard
            title="Low Stock"
            value={lowStock}
            subtitle="Need reorder"
            icon={<WarningAmberRoundedIcon />}
            color="#F79009"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, lg: 2.4 }}>
          <DashboardCard
            title="Near Expiry"
            value={nearExpiry}
            icon={<ScheduleRoundedIcon />}
            color="#36BFFA"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 4, lg: 2.4 }}>
          <DashboardCard
            title="Expired"
            value={expired}
            icon={<DoNotDisturbRoundedIcon />}
            color="#F04438"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4, lg: 2.4 }}>
          <DashboardCard
            title="Total Value"
            value={`₱${totalValue.toLocaleString()}`}
            icon={<AccountBalanceWalletRoundedIcon />}
            color="#12B76A"
          />
        </Grid>
      </Grid>

      {/* ── Toolbar ── */}
      <Paper
        sx={{
          p: "12px 16px",
          mb: 2.5,
          borderRadius: "12px",
          border: "1px solid #EAECF0",
          boxShadow: "none",
        }}
      >
        {/* Row 1: Search + View Toggle (always side by side) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.25 }}>
          {/* Search */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              bgcolor: "#F9FAFB",
              borderRadius: "8px",
              border: "1px solid #EAECF0",
              px: 1.5,
              py: 0.25,
              transition: "border-color 0.2s",
              "&:focus-within": { borderColor: "#4361EE" },
            }}
          >
            <SearchRoundedIcon sx={{ color: "#98A2B3", fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="Search medicines…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, fontSize: 14, fontWeight: 500, color: "#344054" }}
              inputProps={{ "aria-label": "search medicines" }}
            />
          </Box>

          {/* View Toggle — flexShrink:0 so it never disappears */}
          <Box
            sx={{
              display: "flex",
              flexShrink: 0,
              bgcolor: "#F9FAFB",
              borderRadius: "8px",
              border: "1px solid #EAECF0",
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
                  bgcolor: view === "list" ? "#fff" : "transparent",
                  boxShadow: view === "list" ? "0 1px 3px rgba(16,24,40,0.10)" : "none",
                  color: view === "list" ? "#4361EE" : "#98A2B3",
                  transition: "all 0.15s ease",
                  "&:hover": { bgcolor: view === "list" ? "#fff" : alpha("#4361EE", 0.06) },
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
                  bgcolor: view === "card" ? "#fff" : "transparent",
                  boxShadow: view === "card" ? "0 1px 3px rgba(16,24,40,0.10)" : "none",
                  color: view === "card" ? "#4361EE" : "#98A2B3",
                  transition: "all 0.15s ease",
                  "&:hover": { bgcolor: view === "card" ? "#fff" : alpha("#4361EE", 0.06) },
                }}
              >
                <GridViewRoundedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>
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
                  bgcolor: active ? alpha("#4361EE", 0.1) : "#F9FAFB",
                  color: active ? "#4361EE" : "#667085",
                  border: active
                    ? `1px solid ${alpha("#4361EE", 0.3)}`
                    : "1px solid #EAECF0",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  "&:hover": {
                    bgcolor: active ? alpha("#4361EE", 0.14) : "#F2F4F7",
                  },
                }}
              />
            );
          })}
        </Box>
      </Paper>

      {/* ── Results count ── */}
      <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#98A2B3", mb: 2 }}>
        Showing <span style={{ fontWeight: 700, color: "#344054" }}>{filteredMeds.length}</span> of {medicines.length} medicines
      </Typography>

      {/* ── Content ── */}
      {view === "list" ? (
        <InventoryTable medicines={filteredMeds} />
      ) : filteredMeds.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "#98A2B3",
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
              <MedicineCard medicine={med} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
