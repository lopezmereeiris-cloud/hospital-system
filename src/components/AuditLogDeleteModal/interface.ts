import { AuditLogEntry } from "@/lib/auditLogs";

export interface AuditLogDeleteModalProps {
  open: boolean;
  selectedCount: number;
  selectedLogs: AuditLogEntry[];
  onClose: () => void;
  onConfirm: () => void;
}

