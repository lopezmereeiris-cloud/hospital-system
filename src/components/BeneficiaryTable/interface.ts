export interface BeneficiaryAddress {
  street: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  contactNumber: string;
}

export interface BenefitTransaction {
  date: string;
  description: string;
  amount: number;
}

export interface Beneficiary {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dateOfBirth: string;
  gender: string;
  civilStatus: string;
  contactNumber: string;
  email: string;
  address: BeneficiaryAddress;
  validIdType: string;
  validIdNumber: string;
  validIdImageUrl: string;
  philhealthNumber: string;
  emergencyContact: EmergencyContact;
  registrationDate: string;
  status: "Active" | "Inactive";
  annualBenefit: number;
  benefitUsed: number;
  benefitBalance: number;
  benefitYear: number;
  transactions: BenefitTransaction[];
}

export interface BeneficiaryTableProps {
  beneficiaries: Beneficiary[];
  basePath?: string;
}
