"use client";

import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import SelectAllRoundedIcon from "@mui/icons-material/SelectAllRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { palette } from "@/theme/palette";
import AuditLogDeleteModal from "@/components/AuditLogDeleteModal";
import AuditLogDetailModal from "@/components/AuditLogDetailModal";
import { AuditAction, AuditLogEntry, readAuditLogs, writeAuditLogs } from "@/lib/auditLogs";

const ACTION_OPTIONS: AuditAction[] = ["LOGIN", "LOGOUT", "CREATE", "UPDATE", "DELETE"];

function formatTimestamp(value: string) {
  const date = new Date(value);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>(() => readAuditLogs());
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState<"ALL" | AuditAction>("ALL");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [activeLog, setActiveLog] = useState<AuditLogEntry | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key?.includes("audit")) {
        setLogs(readAuditLogs());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const filteredLogs = useMemo(() => {
    const term = search.trim().toLowerCase();
    return logs.filter((log) => {
      const matchesAction = actionFilter === "ALL" || log.action === actionFilter;
      const matchesText =
        term.length === 0 ||
        log.summary.toLowerCase().includes(term) ||
        log.actor.name.toLowerCase().includes(term) ||
        log.module.toLowerCase().includes(term) ||
        log.entity.toLowerCase().includes(term) ||
        (log.entityId ?? "").toLowerCase().includes(term);
      return matchesAction && matchesText;
    });
  }, [logs, search, actionFilter]);

  const validSelectedIds = useMemo(
    () => selectedIds.filter((id) => logs.some((log) => log.id === id)),
    [selectedIds, logs]
  );
  const filteredIds = useMemo(() => filteredLogs.map((log) => log.id), [filteredLogs]);
  const selectedLogs = useMemo(
    () => logs.filter((log) => validSelectedIds.includes(log.id)),
    [logs, validSelectedIds]
  );
  const allFilteredSelected = filteredIds.length > 0 && filteredIds.every((id) => validSelectedIds.includes(id));

  const paginatedLogs = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredLogs.slice(start, start + rowsPerPage);
  }, [filteredLogs, page, rowsPerPage]);

  const toggleOne = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleAllFiltered = () => {
    if (allFilteredSelected) {
      setSelectedIds((prev) => prev.filter((id) => !filteredIds.includes(id)));
      return;
    }
    setSelectedIds((prev) => Array.from(new Set([...prev, ...filteredIds])));
  };

  const clearSelection = () => setSelectedIds([]);

  const requestDeleteSelected = () => {
    if (validSelectedIds.length === 0) return;
    setDeleteModalOpen(true);
  };

  const confirmDeleteSelected = () => {
    if (validSelectedIds.length === 0) return;
    const remaining = logs.filter((log) => !validSelectedIds.includes(log.id));
    writeAuditLogs(remaining);
    setLogs(remaining);
    setSelectedIds([]);
    if (activeLog && validSelectedIds.includes(activeLog.id)) {
      setActiveLog(null);
      setDetailOpen(false);
    }
    setDeleteModalOpen(false);
  };

  const openDetail = (log: AuditLogEntry) => {
    setActiveLog(log);
    setDetailOpen(true);
  };

  return (
    <Box sx={{ maxWidth: 1440, mx: "auto" }}>
      <Paper
        sx={{
          p: 1.5,
          mb: 1.2,
          borderRadius: "12px",
          border: `1px solid ${palette.grey[200]}`,
          boxShadow: "none",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 1,
        }}
      >
        <TextField
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          placeholder="Search logs..."
          size="small"
          fullWidth
        />
        <TextField
          select
          value={actionFilter}
          onChange={(e) => {
            setActionFilter(e.target.value as "ALL" | AuditAction);
            setPage(0);
          }}
          size="small"
          fullWidth
        >
          <MenuItem value="ALL">All Actions</MenuItem>
          {ACTION_OPTIONS.map((action) => (
            <MenuItem key={action} value={action}>
              {action}
            </MenuItem>
          ))}
        </TextField>
      </Paper>

      <Paper
        sx={{
          p: 1,
          mb: 1.2,
          borderRadius: "12px",
          border: `1px solid ${palette.grey[200]}`,
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Typography sx={{ fontSize: "0.8rem", color: "text.secondary", pl: 0.6 }}>
          {filteredLogs.length} log{filteredLogs.length !== 1 ? "s" : ""} | selected: <strong>{validSelectedIds.length}</strong>
        </Typography>

        <Stack direction="row" spacing={0.4}>
          <Tooltip title={allFilteredSelected ? "Unselect all filtered logs" : "Select all filtered logs"}>
            <span>
              <IconButton size="small" onClick={toggleAllFiltered}>
                <SelectAllRoundedIcon sx={{ color: allFilteredSelected ? palette.primary.main : "inherit" }} />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Clear selection">
            <span>
              <IconButton size="small" onClick={clearSelection} disabled={validSelectedIds.length === 0}>
                <ClearAllRoundedIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete selected logs">
            <span>
              <IconButton
                size="small"
                onClick={requestDeleteSelected}
                disabled={validSelectedIds.length === 0}
                sx={{ color: validSelectedIds.length > 0 ? "error.main" : "inherit" }}
              >
                <DeleteSweepRoundedIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Paper>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "12px",
          border: `1px solid ${palette.grey[200]}`,
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "grey.50" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  size="small"
                  checked={allFilteredSelected}
                  indeterminate={!allFilteredSelected && validSelectedIds.some((id) => filteredIds.includes(id))}
                  onChange={toggleAllFiltered}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.76rem" }}>Date & Time</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.76rem" }}>Action</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.76rem" }}>Module</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.76rem" }}>Entity</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.76rem" }}>Actor</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.76rem" }}>Summary</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: "0.76rem" }}>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography sx={{ fontSize: "0.86rem", color: "text.secondary" }}>
                    No logs found for the selected filter.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedLogs.map((log) => {
                const isSelected = validSelectedIds.includes(log.id);
                return (
                  <TableRow
                    key={log.id}
                    hover
                    selected={isSelected}
                    onClick={() => openDetail(log)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      padding="checkbox"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Checkbox
                        size="small"
                        checked={isSelected}
                        onChange={() => toggleOne(log.id)}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.8rem", color: "text.secondary", whiteSpace: "nowrap" }}>
                      {formatTimestamp(log.timestamp)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={log.action}
                        color={
                          log.action === "CREATE"
                            ? "success"
                            : log.action === "UPDATE"
                            ? "warning"
                            : log.action === "DELETE"
                            ? "error"
                            : "info"
                        }
                        variant="outlined"
                        sx={{ height: 22, fontSize: "0.68rem", fontWeight: 700 }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.8rem", fontWeight: 600 }}>{log.module}</TableCell>
                    <TableCell sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                      {log.entityId ? `${log.entity} (${log.entityId})` : log.entity}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.8rem" }}>
                      {log.actor.name} ({log.actor.role})
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.8rem", maxWidth: 420 }}>
                      <Box
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {log.summary}
                      </Box>
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetail(log);
                      }}
                    >
                      <Tooltip title="View full details">
                        <IconButton size="small">
                          <VisibilityRoundedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredLogs.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[10, 20, 50, 100]}
        />
      </TableContainer>

      <AuditLogDeleteModal
        open={deleteModalOpen}
        selectedCount={validSelectedIds.length}
        selectedLogs={selectedLogs}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteSelected}
      />

      <AuditLogDetailModal
        open={detailOpen}
        log={activeLog}
        onClose={() => setDetailOpen(false)}
      />
    </Box>
  );
}

