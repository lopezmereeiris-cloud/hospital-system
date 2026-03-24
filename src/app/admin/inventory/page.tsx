"use client";

import React, { useState } from "react";
import AddSupplyModal from "@/components/AddSupplyModal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { alpha } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import DoNotDisturbRoundedIcon from "@mui/icons-material/DoNotDisturbRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import DashboardCard from "@/components/DashboardCard";
import SupplyTable from "@/components/SupplyTable";
import SupplyCard from "@/components/SupplyCard";
import { SupplyItem } from "@/components/SupplyTable/interface";
import suppliesData from "@/json/supplies.json";
import { palette } from "@/theme/palette";
import { useUser } from "@/context/UserContext";
import { appendAuditLog, buildFieldChanges } from "@/lib/auditLogs";

type FilterKey = "all" | "low_stock" | "near_expiry" | "expired";

export default function InventoryPage() {
  const { user } = useUser();
  const [items, setItems] = useState<SupplyItem[]>(suppliesData as SupplyItem[]);

  const lowStock = items.filter((i) => i.lowStockAlert).length;
  const nearExpiry = items.filter((i) => i.nearExpiryFlag).length;
  const expired = items.filter((i) => i.expiredFlag).length;
  const totalValue = items.reduce((sum, i) => sum + i.totalValue, 0);

  const [view, setView] = useState<"list" | "card">("list");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SupplyItem | null>(null);

  const filteredItems = items.filter((i) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      i.name.toLowerCase().includes(q) ||
      i.brand.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q) ||
      i.subcategory.toLowerCase().includes(q) ||
      i.id.toLowerCase().includes(q);

    let matchesFilter = true;
    if (filter === "low_stock") matchesFilter = i.lowStockAlert;
    else if (filter === "near_expiry") matchesFilter = i.nearExpiryFlag;
    else if (filter === "expired") matchesFilter = i.expiredFlag;

    return matchesSearch && matchesFilter;
  });

  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: "all", label: "All", count: items.length },
    { key: "low_stock", label: "Low Stock", count: lowStock },
    { key: "near_expiry", label: "Near Expiry", count: nearExpiry },
    { key: "expired", label: "Expired", count: expired },
  ];

  const handleAddItem = (item: SupplyItem) => {
    setItems((prev) => [...prev, item]);
    appendAuditLog({
      action: "CREATE",
      module: "Supplies",
      entity: "Supply Item",
      entityId: item.id,
      actor: { name: user.name, role: user.role },
      summary: `Added supply item ${item.name}.`,
      changes: buildFieldChanges(
        {} as Record<string, unknown>,
        item as unknown as Record<string, unknown>,
        {
          includeFields: ["name", "category", "quantityOnHand", "status", "expiryDate"],
        }
      ),
    });
  };

  const handleEditItem = (item: SupplyItem) => {
    const previous = items.find((i) => i.id === item.id);
    setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
    if (previous) {
      appendAuditLog({
        action: "UPDATE",
        module: "Supplies",
        entity: "Supply Item",
        entityId: item.id,
        actor: { name: user.name, role: user.role },
        summary: `Updated supply item ${item.name}.`,
        changes: buildFieldChanges(
          previous as unknown as Record<string, unknown>,
          item as unknown as Record<string, unknown>,
          { excludeFields: ["lastUpdatedDate"] }
        ),
      });
    }
  };

  const handleOpenEdit = (item: SupplyItem) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleOpenView = (item: SupplyItem) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  const handleOpenDelete = (item: SupplyItem) => {
    setSelectedItem(item);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      setItems((prev) => prev.filter((i) => i.id !== selectedItem.id));
      appendAuditLog({
        action: "DELETE",
        module: "Supplies",
        entity: "Supply Item",
        entityId: selectedItem.id,
        actor: { name: user.name, role: user.role },
        summary: `Deleted supply item ${selectedItem.name}.`,
        changes: [
          {
            field: "recordStatus",
            label: "Record Status",
            before: "Existing",
            after: "Deleted",
          },
          {
            field: "deletedRecord",
            label: "Deleted Record",
            before: selectedItem,
            after: null,
          },
        ],
      });
    }
    setDeleteConfirmOpen(false);
    setSelectedItem(null);
  };

  return (
    <Box sx={{ maxWidth: 1440, mx: "auto" }}>
      {/* ── Stats Cards ── */}
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardCard
            title="Total Items"
            value={items.length}
            subtitle="Supply items tracked"
            icon={<Inventory2RoundedIcon />}
            color={palette.primary.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardCard
            title="Low Stock"
            value={lowStock}
            subtitle="Items below reorder level"
            icon={<WarningAmberRoundedIcon />}
            color={palette.warning.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardCard
            title="Expiry Alerts"
            value={nearExpiry + expired}
            subtitle={`${expired} expired · ${nearExpiry} near expiry`}
            icon={<ScheduleRoundedIcon />}
            color={palette.error.main}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashboardCard
            title="Total Value"
            value={`₱${totalValue.toLocaleString()}`}
            subtitle="Estimated inventory value"
            icon={<AccountBalanceWalletRoundedIcon />}
            color={palette.success.main}
          />
        </Grid>
      </Grid>

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
        {/* Row 1: Search + View Toggle + Add Button */}
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
              placeholder="Search supplies…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, fontSize: 14, fontWeight: 500, color: "grey.700" }}
              inputProps={{ "aria-label": "search supplies" }}
            />
          </Box>

          {/* View Toggle */}
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
                  "&:hover": {
                    bgcolor:
                      view === "list"
                        ? palette.background.paper
                        : alpha(palette.primary.main, 0.06),
                  },
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
                  "&:hover": {
                    bgcolor:
                      view === "card"
                        ? palette.background.paper
                        : alpha(palette.primary.main, 0.06),
                  },
                }}
              >
                <GridViewRoundedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Add Supply Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<DoNotDisturbRoundedIcon sx={{ fontSize: 18, transform: "rotate(45deg)" }} />}
            sx={{ borderRadius: "8px", fontWeight: 700, ml: 2, textTransform: "none" }}
            onClick={() => setAddModalOpen(true)}
          >
            Add Item
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
                    bgcolor: active
                      ? alpha(palette.primary.main, 0.14)
                      : palette.grey[100],
                  },
                }}
              />
            );
          })}
        </Box>
      </Paper>

      {/* ── Results Count ── */}
      <Typography sx={{ fontSize: 13, fontWeight: 500, color: "grey.400", mb: 2 }}>
        Showing{" "}
        <span style={{ fontWeight: 700, color: "grey.700" }}>{filteredItems.length}</span> of{" "}
        {items.length} items
      </Typography>

      {/* ── Content ── */}
      {view === "list" ? (
        <SupplyTable
          items={filteredItems}
          onEdit={handleOpenEdit}
          onView={handleOpenView}
          onDelete={handleOpenDelete}
        />
      ) : filteredItems.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "grey.400",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          No items match your search or filter.
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {filteredItems.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <SupplyCard
                item={item}
                onEdit={handleOpenEdit}
                onView={handleOpenView}
                onDelete={handleOpenDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Supply Modal */}
      <AddSupplyModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddItem}
      />

      {/* Edit Supply Modal */}
      <AddSupplyModal
        open={editModalOpen}
        onClose={() => { setEditModalOpen(false); setSelectedItem(null); }}
        onAdd={handleAddItem}
        mode="edit"
        editItem={selectedItem}
        onEdit={handleEditItem}
      />

      {/* View Supply Modal */}
      <AddSupplyModal
        open={viewModalOpen}
        onClose={() => { setViewModalOpen(false); setSelectedItem(null); }}
        onAdd={handleAddItem}
        mode="view"
        editItem={selectedItem}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => { setDeleteConfirmOpen(false); setSelectedItem(null); }}
        PaperProps={{ sx: { borderRadius: "12px", maxWidth: 400 } }}
      >
        <DialogContent sx={{ pt: 3, pb: 1, textAlign: "center" }}>
          <Typography sx={{ fontSize: 17, fontWeight: 700, color: "grey.900", mb: 1 }}>
            Delete Supply Item
          </Typography>
          <Typography sx={{ fontSize: 14, color: "grey.500" }}>
            Are you sure you want to delete <strong>{selectedItem?.name}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1, justifyContent: "center" }}>
          <Button
            onClick={() => { setDeleteConfirmOpen(false); setSelectedItem(null); }}
            variant="outlined"
            sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 600, px: 3, borderColor: palette.grey[300], color: "grey.700" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, px: 3, boxShadow: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
