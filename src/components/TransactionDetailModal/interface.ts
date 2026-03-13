import { BenefitTransaction } from "@/components/BeneficiaryTable/interface";

export interface TransactionDetailModalProps {
  open: boolean;
  onClose: () => void;
  transaction: BenefitTransaction | null;
  /** Running balance after this transaction */
  runningBalance: number;
  /** Annual benefit total */
  annualBenefit: number;
  /** Beneficiary display name */
  beneficiaryName: string;
  /** YAKAP ID */
  yakapId: string;
  /** PhilHealth number */
  philhealthNumber: string;
}
