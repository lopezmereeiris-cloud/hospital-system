import type { Appointment } from "@/components/AppointmentTable/interface";
import type { Medicine } from "@/components/InventoryTable/interface";
import type { PatientType, Room, RoomSchedule } from "@/components/RoomTable/interface";
import type { BillingRecord, BillingStatus, YakapMember } from "./interface";

export const moneyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  maximumFractionDigits: 0,
});

function parseDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDate(value: string): string {
  return parseDate(value).toLocaleDateString("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInclusiveDays(start: string, end: string): number {
  const startTime = parseDate(start).getTime();
  const endTime = parseDate(end).getTime();
  return Math.max(1, Math.floor((endTime - startTime) / 86400000) + 1);
}

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function seededNumber(value: string): number {
  return value.split("").reduce((sum, part, index) => sum + part.charCodeAt(0) * (index + 1), 0);
}

function getYakapMatch(
  patientName: string,
  yakapMembers: YakapMember[]
): { member: YakapMember | null; label: string | null } {
  const normalizedPatient = normalizeName(patientName);
  if (!normalizedPatient) return { member: null, label: null };

  const patientTokens = normalizedPatient.split(" ").filter(Boolean);
  const firstToken = patientTokens[0];

  for (const member of yakapMembers) {
    const fullName = normalizeName(
      [member.firstName, member.middleName, member.lastName, member.suffix].filter(Boolean).join(" ")
    );
    const firstAndLast = normalizeName([member.firstName, member.lastName].join(" "));
    if (normalizedPatient === fullName || normalizedPatient === firstAndLast) {
      return { member, label: "YAKAP Verified" };
    }
  }

  if (firstToken) {
    const firstNameMatches = yakapMembers.filter(
      (member) => normalizeName(member.firstName) === firstToken
    );
    if (firstNameMatches.length === 1) {
      return { member: firstNameMatches[0], label: "YAKAP Name Match" };
    }
  }

  return { member: null, label: null };
}

function inferOutpatientCoverage(age: number, notes: string): {
  patientType: PatientType | "Regular";
  discountPercent: number;
} {
  const normalizedNotes = notes.toLowerCase();
  if (/indigent|charity/.test(normalizedNotes)) return { patientType: "Indigent", discountPercent: 100 };
  if (/pwd|wheelchair|disability/.test(normalizedNotes)) return { patientType: "PWD", discountPercent: 20 };
  if (age >= 60) return { patientType: "Senior Citizen", discountPercent: 20 };
  if (/philhealth/.test(normalizedNotes)) return { patientType: "PhilHealth", discountPercent: 15 };
  return { patientType: "Regular", discountPercent: 0 };
}

function buildInpatientLineItems(
  roomRate: number,
  stayDays: number,
  seed: number
): Array<{ id: string; description: string; amount: number }> {
  const roomAndBoard = roomRate * stayDays;
  const professionalFee = Math.round(roomAndBoard * (0.24 + (seed % 11) / 100));
  const medicinesAndSupplies = Math.round(roomAndBoard * (0.16 + (seed % 8) / 100));
  const laboratory = Math.round(roomAndBoard * (0.13 + (seed % 7) / 100));
  const nursingCare = Math.round(roomAndBoard * (0.1 + (seed % 5) / 100));

  return [
    { id: "room-board", description: `Room & Board (${stayDays} ${stayDays > 1 ? "days" : "day"})`, amount: roomAndBoard },
    { id: "professional-fee", description: "Professional Fee", amount: professionalFee },
    { id: "medicines", description: "Medicines & Supplies", amount: medicinesAndSupplies },
    { id: "laboratory", description: "Laboratory", amount: laboratory },
    { id: "nursing", description: "Nursing Care", amount: nursingCare },
  ];
}

function buildOutpatientLineItems(
  appointment: Appointment,
  medicines: Medicine[]
): {
  lineItems: Array<{ id: string; description: string; amount: number }>;
  serviceType: BillingRecord["serviceType"];
  roomRate: number;
} {
  const seed = seededNumber(`${appointment.id}-${appointment.patientName}`);
  const notes = appointment.specialNotes.toLowerCase();
  const lineItems: Array<{ id: string; description: string; amount: number }> = [];

  const consultationFee = 700 + (seed % 6) * 120;
  lineItems.push({
    id: `checkup-${appointment.id}`,
    description: `Outpatient Consultation - ${appointment.assignedDoctor}`,
    amount: consultationFee,
  });

  if (/ecg/.test(notes)) lineItems.push({ id: `ecg-${appointment.id}`, description: "Electrocardiogram (ECG)", amount: 950 });
  if (/lab|fasting|results/.test(notes)) lineItems.push({ id: `lab-${appointment.id}`, description: "Laboratory Panel", amount: 1200 });
  if (/dialysis/.test(notes)) lineItems.push({ id: `dialysis-${appointment.id}`, description: "Dialysis Session", amount: 3200 });
  if (/imaging/.test(notes)) lineItems.push({ id: `imaging-${appointment.id}`, description: "Diagnostic Imaging", amount: 1800 });
  if (/vaccination/.test(notes)) lineItems.push({ id: `vaccine-${appointment.id}`, description: "Vaccination Service", amount: 650 });

  const activeMedicines = medicines.filter(
    (medicine) => medicine.status.toLowerCase() === "active" && medicine.unitCost > 0
  );
  const withMedicineNote = /prescription|med|allerg|asthma|diabetes|hypertension|referral/.test(notes);
  const medicineCount = withMedicineNote ? 2 + (seed % 2) : seed % 2;
  let addedMedicineItems = 0;

  for (let index = 0; index < medicineCount && activeMedicines.length > 0; index += 1) {
    const medicine = activeMedicines[(seed + index * 5) % activeMedicines.length];
    const quantity = 6 + ((seed + index * 3) % 12);
    const amount = Math.round(medicine.unitCost * quantity);
    lineItems.push({
      id: `med-${appointment.id}-${medicine.id}`,
      description: `Medicine: ${medicine.genericName} ${medicine.strength} x${quantity}`,
      amount,
    });
    addedMedicineItems += 1;
  }

  return {
    lineItems,
    serviceType: addedMedicineItems > 0 ? "Checkup + Pharmacy" : "Checkup",
    roomRate: consultationFee,
  };
}

function computeProgramDeductions(
  grossAmount: number,
  discountPercent: number,
  patientName: string,
  yakapMembers: YakapMember[]
) {
  const coverageDiscount = Math.round(grossAmount * (discountPercent / 100));
  const yakap = getYakapMatch(patientName, yakapMembers);
  const yakapDeduction =
    yakap.member && coverageDiscount < grossAmount
      ? Math.min(yakap.member.benefitBalance, grossAmount - coverageDiscount)
      : 0;
  const netAmount = Math.max(0, grossAmount - coverageDiscount - yakapDeduction);

  return {
    coverageDiscount,
    yakapDeduction,
    yakapMemberId: yakap.member?.id || null,
    yakapMatchLabel: yakap.label,
    netAmount,
  };
}

function finalizeStatus(netAmount: number, paidAmount: number): {
  paidAmount: number;
  balance: number;
  status: BillingStatus;
} {
  const safePaidAmount = Math.min(Math.max(paidAmount, 0), netAmount);
  const balance = Math.max(0, netAmount - safePaidAmount);
  const status: BillingStatus =
    balance === 0 ? "Paid" : safePaidAmount === 0 ? "Pending" : "Partial";
  return { paidAmount: safePaidAmount, balance, status };
}

export function buildInpatientRecord(
  schedule: RoomSchedule,
  room: Room | undefined,
  yakapMembers: YakapMember[],
  todayKey: number
): BillingRecord {
  const roomRate = room?.ratePerDay ?? Math.max(0, schedule.billingRate);
  const stayDays = getInclusiveDays(schedule.startDate, schedule.endDate);
  const seed = seededNumber(schedule.scheduleId);
  const lineItems = buildInpatientLineItems(roomRate, stayDays, seed);
  const grossAmount = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const patientName = schedule.patientName || "Unassigned Patient";

  const program = computeProgramDeductions(grossAmount, schedule.discountPercent, patientName, yakapMembers);
  const dischargeDate = parseDate(schedule.endDate).getTime();

  let paidAmount = 0;
  if (program.netAmount > 0) {
    if (dischargeDate < todayKey) {
      const settledRule = seed % 3;
      if (settledRule === 0) paidAmount = program.netAmount;
      else if (settledRule === 1) paidAmount = Math.round(program.netAmount * 0.55);
    } else if (seed % 4 === 0) {
      paidAmount = Math.round(program.netAmount * 0.2);
    }
  }

  const billing = finalizeStatus(program.netAmount, paidAmount);
  const billNumberSeed = Number(schedule.scheduleId.replace(/\D/g, "")) || seed;

  return {
    billId: `BL-2026-${String(900 + billNumberSeed).padStart(4, "0")}`,
    patientName,
    roomLabel: room ? `${room.roomName} (#${room.roomNumber})` : schedule.roomId,
    serviceLabel: "Inpatient Room Stay",
    serviceType: "Room Stay",
    serviceDate: schedule.startDate,
    encounterType: "Inpatient",
    admissionDate: schedule.startDate,
    dischargeDate: schedule.endDate,
    stayDays,
    patientType: schedule.patientType || "Regular",
    discountPercent: schedule.discountPercent,
    roomRate,
    grossAmount,
    coverageDiscount: program.coverageDiscount,
    yakapDeduction: program.yakapDeduction,
    yakapMemberId: program.yakapMemberId,
    yakapMatchLabel: program.yakapMatchLabel,
    netAmount: program.netAmount,
    paidAmount: billing.paidAmount,
    balance: billing.balance,
    status: billing.status,
    lineItems,
    notes: schedule.notes || "No additional clinical notes.",
  };
}

export function buildOutpatientRecord(
  appointment: Appointment,
  medicines: Medicine[],
  yakapMembers: YakapMember[],
  todayKey: number
): BillingRecord | null {
  if (appointment.status === "Cancelled") return null;

  const seed = seededNumber(`${appointment.id}-${appointment.patientName}-${appointment.date}`);
  const coverage = inferOutpatientCoverage(appointment.age, appointment.specialNotes);
  const service = buildOutpatientLineItems(appointment, medicines);
  const grossAmount = service.lineItems.reduce((sum, item) => sum + item.amount, 0);

  const program = computeProgramDeductions(grossAmount, coverage.discountPercent, appointment.patientName, yakapMembers);

  let paidAmount = 0;
  const serviceDate = parseDate(appointment.date).getTime();

  if (program.netAmount > 0) {
    if (appointment.status === "Completed") {
      paidAmount = seed % 2 === 0 ? program.netAmount : Math.round(program.netAmount * 0.65);
    } else if (appointment.status === "Confirmed" && serviceDate <= todayKey) {
      paidAmount = Math.round(program.netAmount * 0.3);
    }
  }

  const billing = finalizeStatus(program.netAmount, paidAmount);

  return {
    billId: `BL-2026-${String(2000 + appointment.id).padStart(4, "0")}`,
    patientName: appointment.patientName,
    roomLabel: `OPD - ${appointment.assignedDoctor}`,
    serviceLabel: service.serviceType === "Checkup + Pharmacy" ? "Checkup with Medicine Purchase" : "Checkup Consultation",
    serviceType: service.serviceType,
    serviceDate: appointment.date,
    encounterType: "Outpatient",
    admissionDate: appointment.date,
    dischargeDate: appointment.date,
    stayDays: 1,
    patientType: coverage.patientType,
    discountPercent: coverage.discountPercent,
    roomRate: service.roomRate,
    grossAmount,
    coverageDiscount: program.coverageDiscount,
    yakapDeduction: program.yakapDeduction,
    yakapMemberId: program.yakapMemberId,
    yakapMatchLabel: program.yakapMatchLabel,
    netAmount: program.netAmount,
    paidAmount: billing.paidAmount,
    balance: billing.balance,
    status: billing.status,
    lineItems: service.lineItems,
    notes: appointment.specialNotes || "Outpatient service billing.",
  };
}

export function buildPharmacyRecords(yakapMembers: YakapMember[]): BillingRecord[] {
  const rows: BillingRecord[] = [];

  yakapMembers.forEach((member) => {
    const transactions = member.transactions || [];
    transactions.forEach((transaction, index) => {
      const patientName = [member.firstName, member.middleName, member.lastName, member.suffix]
        .filter(Boolean)
        .join(" ");
      const amount = Math.max(0, Math.round(transaction.amount));

      rows.push({
        billId: `BL-2026-${String(3000 + rows.length + 1).padStart(4, "0")}`,
        patientName,
        roomLabel: "Hospital Pharmacy",
        serviceLabel: transaction.description,
        serviceType: "Pharmacy",
        serviceDate: transaction.date,
        encounterType: "Outpatient",
        admissionDate: transaction.date,
        dischargeDate: transaction.date,
        stayDays: 1,
        patientType: "PhilHealth",
        discountPercent: 0,
        roomRate: amount,
        grossAmount: amount,
        coverageDiscount: 0,
        yakapDeduction: amount,
        yakapMemberId: member.id,
        yakapMatchLabel: "YAKAP Transaction",
        netAmount: 0,
        paidAmount: 0,
        balance: 0,
        status: "Paid",
        lineItems: [{ id: `pharmacy-${member.id}-${index + 1}`, description: transaction.description, amount }],
        notes: `Recorded YAKAP medicine transaction for ${member.id}.`,
      });
    });
  });

  return rows;
}
