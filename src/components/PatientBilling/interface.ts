export interface BillingLineItem {
  label: string
  amount: number
}

export interface BillingRecord {
  billId: string
  patientName: string

  serviceLabel: string
  serviceType: string
  serviceDate: string

  encounterType: string

  admissionDate?: string
  dischargeDate?: string
  stayDays?: number

  patientType: string

  grossAmount: number
  coverageDiscount: number
  yakapDeduction: number
  netAmount: number

  paidAmount: number
  balance: number

  status: "Paid" | "Partial" | "Unpaid"

  lineItems: BillingLineItem[]

  notes?: string
}