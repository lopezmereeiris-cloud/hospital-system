export interface EmergencyContactInput {
  name: string;
  relationship: string;
  contactNumber: string;
}

export interface RegistrationFormData {
  /* Step 1: Personal Information */
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dateOfBirth: string;
  gender: string;
  civilStatus: string;

  /* Step 2: Contact & Address */
  contactNumber: string;
  email: string;
  street: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;

  /* Step 3: Identification */
  philhealthNumber: string;
  validIdType: string;
  validIdNumber: string;
  validIdImage: File | null;

  /* Step 4: Emergency Contact */
  emergencyContacts: EmergencyContactInput[];
}

export interface YakapRegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => void;
}

export type StringField = Exclude<keyof RegistrationFormData, "validIdImage" | "emergencyContacts">;
