export interface AddDoctorFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
  contactNumber: string;
  email: string;
  specialization: string;
  subSpecialization: string;
  department: string;
  prcLicenseNumber: string;
  ptrNumber: string;
  yearsOfExperience: string;
  bio: string;
  status: "Active" | "On Leave" | "Inactive";
}

export interface AddDoctorModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (doctor: AddDoctorFormData) => void;
  departments: string[];
}
