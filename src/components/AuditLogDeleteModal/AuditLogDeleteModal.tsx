"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { AuditLogDeleteModalProps } from "./interface";
import { palette } from "@/theme/palette";

export default function AuditLogDeleteModal({
  open,
  selectedCount,
  selectedLogs,
  onClose,
  onConfirm,
}: AuditLogDeleteModalProps) {
  const previewLogs = selectedLogs.slice(0, 3);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1.2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#FEF3F2",
              color: palette.error.main,
            }}
          >
            <WarningAmberRoundedIcon sx={{ fontSize: 21 }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "text.primary" }}>
              Delete Selected Logs
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
              This action permanently removes audit records.
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: "6px !important" }}>
        <Typography sx={{ fontSize: "0.86rem", color: "text.primary", mb: 1.5 }}>
          You are about to delete <strong>{selectedCount}</strong> log{selectedCount > 1 ? "s" : ""}.
        </Typography>

        {previewLogs.length > 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
            {previewLogs.map((log) => (
              <Box
                key={log.id}
                sx={{
                  p: 1,
                  borderRadius: "8px",
                  border: `1px solid ${palette.grey[200]}`,
                  bgcolor: palette.background.default,
                }}
              >
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, color: "text.primary", mb: 0.2 }}>
                  {log.summary}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, flexWrap: "wrap" }}>
                  <Typography sx={{ fontSize: "0.72rem", color: "text.secondary" }}>
                    {log.module} | {new Date(log.timestamp).toLocaleString("en-US")}
                  </Typography>
                  <Chip
                    size="small"
                    label={log.action}
                    variant="outlined"
                    sx={{ height: 22, fontSize: "0.68rem", fontWeight: 700 }}
                  />
                </Box>
              </Box>
            ))}
            {selectedCount > previewLogs.length && (
              <Typography sx={{ fontSize: "0.74rem", color: "text.secondary", mt: 0.2 }}>
                +{selectedCount - previewLogs.length} more selected log{selectedCount - previewLogs.length > 1 ? "s" : ""}.
              </Typography>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.2, gap: 1 }}>
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
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          startIcon={<DeleteSweepRoundedIcon sx={{ fontSize: 18 }} />}
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          }}
        >
          Delete Logs
        </Button>
      </DialogActions>
    </Dialog>
  );
}

