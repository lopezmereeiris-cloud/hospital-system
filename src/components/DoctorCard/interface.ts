export interface Doctor {
  doctorId: string;
  lastName: string;
  firstName: string;
  middleName: string;
  dateOfBirth: string;
  sex: string;
  contactNumber: string;
  email: string;
  specialization: string;
  subSpecialization: string | null;
  department: string;
  prcLicenseNumber: string;
  ptrNumber: string;
  yearsOfExperience: number;
  bio: string;
  status: "Active" | "On Leave" | "Inactive";
}

export interface DoctorCardProps {
  doctors: Doctor[];
  onDoctorClick?: (doctor: Doctor) => void;
}
