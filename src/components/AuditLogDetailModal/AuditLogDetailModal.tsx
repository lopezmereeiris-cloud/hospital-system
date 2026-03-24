"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import { AuditLogDetailModalProps } from "./interface";
import { formatAuditValue } from "@/lib/auditLogs";
import { palette } from "@/theme/palette";

function formatTimestamp(value: string) {
  const date = new Date(value);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function actionColor(action: string) {
  if (action === "CREATE") return "success";
  if (action === "UPDATE") return "warning";
  if (action === "DELETE") return "error";
  return "info";
}

export default function AuditLogDetailModal({ open, log, onClose }: AuditLogDetailModalProps) {
  if (!open || !log) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, flexWrap: "wrap" }}>
          <Typography sx={{ fontSize: "1rem", fontWeight: 700 }}>{log.summary}</Typography>
          <Chip label={log.action} size="small" color={actionColor(log.action)} variant="outlined" />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: "8px !important" }}>
        <Box sx={{ position: "relative", pl: 3 }}>
          <Box
            sx={{
              position: "absolute",
              left: 10,
              top: 6,
              bottom: 6,
              width: "2px",
              bgcolor: "grey.200",
            }}
          />

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, mb: 1.4 }}>
            <FiberManualRecordRoundedIcon sx={{ fontSize: 12, color: "info.main", mt: 0.7, ml: -2.45, zIndex: 1, bgcolor: "background.paper" }} />
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: "text.secondary", mb: 0.5 }}>
                TIMESTAMP
              </Typography>
              <Box sx={{ p: 1.1, borderRadius: "8px", border: `1px solid ${palette.grey[200]}`, bgcolor: "grey.50" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.35 }}>
                  <AccessTimeRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography sx={{ fontSize: "0.82rem", fontWeight: 600 }}>{formatTimestamp(log.timestamp)}</Typography>
                </Box>
                <Typography sx={{ fontSize: "0.78rem", color: "text.secondary" }}>
                  Actor: {log.actor.name} ({log.actor.role})
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2, mb: 1.4 }}>
            <FiberManualRecordRoundedIcon sx={{ fontSize: 12, color: "primary.main", mt: 0.7, ml: -2.45, zIndex: 1, bgcolor: "background.paper" }} />
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: "text.secondary", mb: 0.5 }}>
                CONTEXT
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 0.8 }}>
                <Box sx={{ p: 1, borderRadius: "8px", border: `1px solid ${palette.grey[200]}` }}>
                  <Typography sx={{ fontSize: "0.68rem", color: "text.secondary", fontWeight: 700 }}>Module</Typography>
                  <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>{log.module}</Typography>
                </Box>
                <Box sx={{ p: 1, borderRadius: "8px", border: `1px solid ${palette.grey[200]}` }}>
                  <Typography sx={{ fontSize: "0.68rem", color: "text.secondary", fontWeight: 700 }}>Entity</Typography>
                  <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>{log.entity}</Typography>
                </Box>
                <Box sx={{ p: 1, borderRadius: "8px", border: `1px solid ${palette.grey[200]}` }}>
                  <Typography sx={{ fontSize: "0.68rem", color: "text.secondary", fontWeight: 700 }}>Entity ID</Typography>
                  <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>{log.entityId || "N/A"}</Typography>
                </Box>
                <Box sx={{ p: 1, borderRadius: "8px", border: `1px solid ${palette.grey[200]}` }}>
                  <Typography sx={{ fontSize: "0.68rem", color: "text.secondary", fontWeight: 700 }}>Log ID</Typography>
                  <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>{log.id}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.2 }}>
            <FiberManualRecordRoundedIcon sx={{ fontSize: 12, color: "warning.main", mt: 0.7, ml: -2.45, zIndex: 1, bgcolor: "background.paper" }} />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 0.6 }}>
                <AutorenewRoundedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: "text.secondary" }}>
                  CHANGE TIMELINE
                </Typography>
              </Box>

              {log.changes.length === 0 ? (
                <Box sx={{ p: 1, borderRadius: "8px", border: `1px solid ${palette.grey[200]}` }}>
                  <Typography sx={{ fontSize: "0.8rem", color: "text.secondary", display: "flex", alignItems: "center", gap: 0.7 }}>
                    <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                    No field-level change details recorded for this event.
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
                  {log.changes.map((change, idx) => (
                    <Box
                      key={`${change.field}-${idx}`}
                      sx={{
                        border: `1px solid ${palette.grey[200]}`,
                        borderRadius: "10px",
                        p: 1,
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "190px 1fr 20px 1fr" },
                        gap: 0.8,
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ fontSize: "0.8rem", fontWeight: 700 }}>
                        {change.label || change.field}
                      </Typography>
                      <Box sx={{ p: 0.8, borderRadius: "8px", bgcolor: "#FFF7F7", border: "1px solid #FCD1D1" }}>
                        <Typography sx={{ fontSize: "0.68rem", color: "#B42318", fontWeight: 700, mb: 0.2 }}>Previous</Typography>
                        <Typography sx={{ fontSize: "0.78rem", color: "#7A271A", fontWeight: 600 }}>
                          {formatAuditValue(change.before)}
                        </Typography>
                      </Box>
                      <EastRoundedIcon sx={{ fontSize: 15, color: "text.disabled", display: { xs: "none", md: "block" } }} />
                      <Box sx={{ p: 0.8, borderRadius: "8px", bgcolor: "#F2FCF7", border: "1px solid #B7E7CB" }}>
                        <Typography sx={{ fontSize: "0.68rem", color: "#027A48", fontWeight: 700, mb: 0.2 }}>Current</Typography>
                        <Typography sx={{ fontSize: "0.78rem", color: "#05603A", fontWeight: 700 }}>
                          {formatAuditValue(change.after)}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mt: 1.6 }} />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            borderColor: palette.grey[300],
            color: "text.primary",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

