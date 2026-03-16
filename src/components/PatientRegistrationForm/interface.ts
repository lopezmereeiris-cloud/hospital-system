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
  nationality: string;
  religion: string;
  occupation: string;

  /* Step 2: Medical Information */
  bloodType: string;
  height: string;
  weight: string;
  allergies: string;
  existingConditions: string;
  currentMedications: string;
  smokingStatus: string;
  alcoholUse: string;


  /* Step 3: Contact & Address */
  contactNumber: string;
  email: string;
  street: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;

  /* Step 4: Identification */
  philhealthNumber: string;
  sssNumber: string;
  tinNumber: string;
  validIdType: string;
  validIdNumber: string;
  validIdImage: File | null;

  /* Step 5: Emergency Contact */
  emergencyContacts: EmergencyContactInput[];
}

export interface PatientRegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => void;
}

export type StringField = Exclude<keyof RegistrationFormData, "validIdImage" | "emergencyContacts">;
