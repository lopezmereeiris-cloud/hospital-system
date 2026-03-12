import { Beneficiary } from "../BeneficiaryTable/interface";

export interface BeneficiaryDetailModalProps {
  open: boolean;
  onClose: () => void;
  beneficiary: Beneficiary | null;
}
