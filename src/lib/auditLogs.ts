"use client";

import seedAuditLogs from "@/json/auditLogs.json";

const AUDIT_STORAGE_KEY = "hospital-audit-logs";
const MAX_AUDIT_LOGS = 1000;

export type AuditAction = "LOGIN" | "LOGOUT" | "CREATE" | "UPDATE" | "DELETE";
export type AuditRole = "admin" | "auditor" | "doctor" | "patient" | "system";

export interface AuditActor {
  name: string;
  role: AuditRole;
}

export interface AuditFieldChange {
  field: string;
  label?: string;
  before: unknown;
  after: unknown;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: AuditAction;
  module: string;
  entity: string;
  entityId?: string;
  actor: AuditActor;
  summary: string;
  changes: AuditFieldChange[];
  metadata?: Record<string, string>;
}

export interface NewAuditLogEntry {
  timestamp?: string;
  action: AuditAction;
  module: string;
  entity: string;
  entityId?: string;
  actor: AuditActor;
  summary: string;
  changes?: AuditFieldChange[];
  metadata?: Record<string, string>;
}

function hasWindow() {
  return typeof window !== "undefined";
}

function normalize(logs: AuditLogEntry[]) {
  return [...logs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

function seedLogs(): AuditLogEntry[] {
  return normalize(seedAuditLogs as AuditLogEntry[]);
}

function mergeMissingSeedLogs(existing: AuditLogEntry[], seeds: AuditLogEntry[]) {
  const byId = new Map(existing.map((log) => [log.id, log]));
  let changed = false;

  for (const seed of seeds) {
    if (!byId.has(seed.id)) {
      byId.set(seed.id, seed);
      changed = true;
    }
  }

  return {
    merged: normalize(Array.from(byId.values())),
    changed,
  };
}

function makeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `audit-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function toLabel(field: string) {
  return field
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (x) => x.toUpperCase());
}

export function formatAuditValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "None";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.length ? value.map(formatAuditValue).join(", ") : "None";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function buildFieldChanges<T extends Record<string, unknown>>(
  before: T,
  after: T,
  options?: { includeFields?: string[]; excludeFields?: string[] }
): AuditFieldChange[] {
  const include = options?.includeFields;
  const exclude = new Set(options?.excludeFields ?? []);
  const keys = include
    ? include
    : Array.from(new Set([...Object.keys(before), ...Object.keys(after)]));

  return keys
    .filter((key) => !exclude.has(key))
    .filter((key) => JSON.stringify(before[key]) !== JSON.stringify(after[key]))
    .map((field) => ({
      field,
      label: toLabel(field),
      before: before[field],
      after: after[field],
    }));
}

export function readAuditLogs(): AuditLogEntry[] {
  if (!hasWindow()) return seedLogs();
  try {
    const seeded = seedLogs();
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw) as AuditLogEntry[];
    if (!Array.isArray(parsed)) return seeded;

    // Keep user/runtime logs, but backfill any missing seed logs.
    const { merged, changed } = mergeMissingSeedLogs(parsed, seeded);
    if (changed) {
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch {
    return seedLogs();
  }
}

export function writeAuditLogs(logs: AuditLogEntry[]) {
  if (!hasWindow()) return;
  try {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(normalize(logs).slice(0, MAX_AUDIT_LOGS)));
  } catch {
    // ignore storage errors
  }
}

export function appendAuditLog(entry: NewAuditLogEntry): AuditLogEntry {
  const nextEntry: AuditLogEntry = {
    id: makeId(),
    timestamp: entry.timestamp ?? new Date().toISOString(),
    action: entry.action,
    module: entry.module,
    entity: entry.entity,
    entityId: entry.entityId,
    actor: entry.actor,
    summary: entry.summary,
    changes: entry.changes ?? [],
    metadata: entry.metadata,
  };

  const existing = readAuditLogs();
  writeAuditLogs([nextEntry, ...existing]);
  return nextEntry;
}
