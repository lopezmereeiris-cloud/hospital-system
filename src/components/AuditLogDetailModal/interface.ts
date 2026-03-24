import { AuditLogEntry } from "@/lib/auditLogs";

export interface AuditLogDetailModalProps {
  open: boolean;
  log: AuditLogEntry | null;
  onClose: () => void;
}

