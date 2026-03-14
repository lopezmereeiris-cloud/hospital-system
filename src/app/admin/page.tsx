"use client";

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { useRouter } from "next/navigation";
import InventoryAlertModal from "@/components/InventoryAlertModal";
import inventoryData from "@/json/inventory.json";
import { Medicine } from "@/components/InventoryTable/interface";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import LocalPharmacyRoundedIcon from "@mui/icons-material/LocalPharmacyRounded";
import DashboardCard from "@/components/DashboardCard";
import dashboardData from "@/json/dashboard.json";

import { palette } from "@/theme/palette";
const alertTypeConfig: Record<
  string,
  { label: string; color: "error" | "warning" | "info" }
> = {
  low_stock: { label: "Low Stock", color: "warning" },
  near_expiry: { label: "Near Expiry", color: "info" },
  expired: { label: "Expired", color: "error" },
};

const thStyle = {
  fontWeight: 700,
  fontSize: "0.7rem",
  color: "text.secondary",
  bgcolor: "grey.50",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  borderBottom: `1px solid ${palette.divider}`,
};

export default function DashboardPage() {
  const { totalPatients, availableRooms, bedOccupancy, lowInventoryAlerts } = dashboardData;
  const router = useRouter();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"reorder" | "review">("reorder");
  const [modalMedicine, setModalMedicine] = useState<Medicine | null>(null);

  // Find medicine by alert row (by genericName/strength)
  const medicines = inventoryData;
  function findMedicine(alert: { medicine: string }) {
    // Try to match by genericName and strength (e.g., "Amoxicillin 500mg")
    const [generic, ...rest] = alert.medicine.split(" ");
    const strength = rest.join(" ");
    return (
      medicines.find(
        (m) =>
          m.genericName.toLowerCase() === generic.toLowerCase() &&
          m.strength.replace(/\s/g, "") === strength.replace(/\s/g, "")
      ) || null
    );
  }

  function handleAction(alert: any) {
    setModalMode(alert.type === "low_stock" ? "reorder" : "review");
    setModalMedicine(findMedicine(alert));
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
    setModalMedicine(null);
  }

  function handleViewAll() {
    // Default to low_stock filter if any, else show all
    router.push("/admin/inventory?filter=low_stock");
  }

  return (
    <div>
      {/* Welcome Section */}
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            margin: "0 0 4px 0",
            color: "text.primary",
          }}
        >
          Welcome back, Admin
        </h2>
        <p
          style={{
            fontSize: "0.88rem",
            color: "text.secondary",
            margin: 0,
          }}
        >
          Here&apos;s what&apos;s happening with your hospital today.
        </p>
      </div>

      {/* Statistics Cards */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Total Patients"
            value={totalPatients.toLocaleString()}
            subtitle="+4.5% from last month"
            icon={<PeopleAltRoundedIcon />}
            color={palette.primary.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Available Rooms"
            value={availableRooms.total}
            subtitle={`${availableRooms.general} General, ${availableRooms.icu} ICU`}
            icon={<MeetingRoomRoundedIcon />}
            color={palette.success.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Bed Occupancy"
            value={`${bedOccupancy.occupancyRate}%`}
            subtitle={`${bedOccupancy.occupiedBeds}/${bedOccupancy.totalBeds} beds`}
            icon={<HotelRoundedIcon />}
            color={palette.warning.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Inventory Alerts"
            value={lowInventoryAlerts}
            subtitle="Items need attention"
            icon={<WarningAmberRoundedIcon />}
            color={palette.error.main}
          />
        </Grid>
      </Grid>

      {/* Secondary Quick Stats Row */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Appointments Today"
            value="48"
            subtitle="12 remaining"
            icon={<CalendarMonthRoundedIcon />}
            color={palette.secondary.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardCard
            title="Medicines in Stock"
            value="2,847"
            subtitle="98% availability"
            icon={<LocalPharmacyRoundedIcon />}
            color={palette.info.main}
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: 3, height: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "text.primary", marginBottom: 2 }}>
                  Bed Occupancy Trend
                </div>
                <div style={{ fontSize: "0.78rem", color: "text.secondary" }}>
                  Monthly occupancy rate across all wards
                </div>
              </div>
              <Chip
                icon={<TrendingUpRoundedIcon sx={{ fontSize: 15 }} />}
                label="+3.2%"
                color="success"
                size="small"
              />
            </div>
            <LineChart
              xAxis={[
                {
                  data: dashboardData.occupancyByMonth.map((d) => d.month),
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: dashboardData.occupancyByMonth.map((d) => d.rate),
                  label: "Occupancy Rate (%)",
                  color: palette.primary.main,
                  area: true,
                },
              ]}
              height={280}
              sx={{
                ".MuiAreaElement-root": { fillOpacity: 0.08 },
                ".MuiLineElement-root": { strokeWidth: 2.5 },
                ".MuiMarkElement-root": { display: "none" },
                ".MuiChartsAxis-line, .MuiChartsAxis-tick": { stroke: palette.divider },
                ".MuiChartsAxis-tickLabel, .MuiChartsLegend-label": { fill: palette.text.secondary },
              }}
            />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ p: 3, height: "100%" }}>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "text.primary", marginBottom: 2 }}>
                Room Availability
              </div>
              <div style={{ fontSize: "0.78rem", color: "text.secondary" }}>
                Current room status by type
              </div>
            </div>
            <BarChart
              xAxis={[
                {
                  data: dashboardData.roomAvailability.map((r) => r.category),
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: dashboardData.roomAvailability.map((r) => r.available),
                  label: "Available",
                  color: palette.success.main,
                },
                {
                  data: dashboardData.roomAvailability.map((r) => r.occupied),
                  label: "Occupied",
                  color: palette.primary.main,
                },
              ]}
              height={280}
              sx={{
                ".MuiBarElement-root": { rx: 4, ry: 4 },
                ".MuiChartsAxis-line, .MuiChartsAxis-tick": { stroke: palette.divider },
                ".MuiChartsAxis-tickLabel, .MuiChartsLegend-label": { fill: palette.text.secondary },
              }}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Inventory Alerts Table */}
      <Card sx={{ borderRadius: 4 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 28px 16px",
          }}
        >
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "text.primary", marginBottom: 2 }}>
              Medicine Inventory Alerts
            </div>
            <div style={{ fontSize: "0.78rem", color: "text.secondary" }}>
              {dashboardData.inventoryAlerts.length} items flagged for review
            </div>
          </div>
          <Chip
            label="View All"
            size="small"
            color="primary"
            variant="outlined"
            sx={{ cursor: "pointer" }}
            onClick={handleViewAll}
          />
        </div>
        <TableContainer sx={{ maxHeight: 360 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...thStyle, pl: 3.5 }}>Medicine</TableCell>
                <TableCell sx={thStyle}>Alert Type</TableCell>
                <TableCell align="center" sx={thStyle}>Qty</TableCell>
                <TableCell sx={thStyle}>Stock Level</TableCell>
                <TableCell sx={thStyle}>Detail</TableCell>
                <TableCell align="center" sx={{ ...thStyle, pr: 3.5 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dashboardData.inventoryAlerts.map((alert) => {
                const cfg = alertTypeConfig[alert.type] ?? {
                  label: alert.type,
                  color: "info" as const,
                };
                const stockPct =
                  alert.type === "low_stock" && alert.reorderLevel
                    ? Math.round((alert.quantity / alert.reorderLevel) * 100)
                    : null;
                const barColor =
                  cfg.color === "error"
                    ? palette.error.main
                    : cfg.color === "warning"
                    ? palette.warning.main
                    : palette.info.main;
                return (
                  <TableRow
                    key={alert.id}
                    sx={{
                      "&:hover": { bgcolor: alpha(palette.primary.main, 0.02) },
                      "&:last-child td": { borderBottom: 0 },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: "0.83rem",
                        fontWeight: 600,
                        pl: 3.5,
                        borderBottom: `1px solid ${palette.grey[100]}`,
                      }}
                    >
                      {alert.medicine}
                    </TableCell>
                    <TableCell sx={{ borderBottom: `1px solid ${palette.grey[100]}` }}>
                      <Chip label={cfg.label} color={cfg.color} size="small" />
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "0.83rem",
                        fontWeight: 700,
                        borderBottom: `1px solid ${palette.grey[100]}`,
                        color: cfg.color === "error" ? palette.error.main : "text.primary",
                      }}
                    >
                      {alert.quantity}
                    </TableCell>
                    <TableCell sx={{ borderBottom: `1px solid ${palette.grey[100]}`, minWidth: 120 }}>
                      {stockPct !== null ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min(stockPct, 100)}
                            sx={{
                              flex: 1,
                              height: 6,
                              borderRadius: 3,
                              bgcolor: alpha(palette.text.primary, 0.04),
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 3,
                                bgcolor: barColor,
                              },
                            }}
                          />
                          <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "text.secondary", minWidth: 30 }}>
                            {stockPct}%
                          </span>
                        </div>
                      ) : (
                        <span style={{ fontSize: "0.75rem", color: "text.disabled" }}>—</span>
                      )}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "0.78rem",
                        color: "text.secondary",
                        borderBottom: `1px solid ${palette.grey[100]}`,
                      }}
                    >
                      {alert.type === "low_stock"
                        ? `Reorder at ${alert.reorderLevel}`
                        : `Expires ${alert.expiryDate}`}
                    </TableCell>
                    <TableCell align="center" sx={{ pr: 3.5, borderBottom: `1px solid ${palette.grey[100]}` }}>
                      <Chip
                        label={alert.type === "low_stock" ? "Reorder" : "Review"}
                        size="small"
                        sx={{
                          cursor: "pointer",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          bgcolor: alpha(palette.primary.main, 0.08),
                          color: "primary.main",
                          "&:hover": { bgcolor: alpha(palette.primary.main, 0.16) },
                        }}
                        onClick={() => handleAction(alert)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Inventory Alert Modal */}
      <InventoryAlertModal
        open={modalOpen}
        onClose={handleCloseModal}
        medicine={modalMedicine}
        mode={modalMode}
      />
    </div>
  );
}
