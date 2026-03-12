"use client";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
<<<<<<< HEAD
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import Person2Icon from '@mui/icons-material/Person2';
=======
import AssignmentIcon from '@mui/icons-material/Assignment';
>>>>>>> c02982a8673635d2762f85a57cfd50d35b994f97
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const navIcons: Record<string, React.ReactElement> = {
  dashboard: <DashboardRoundedIcon sx={{ fontSize: 22 }} />,
  yakap: <VolunteerActivismRoundedIcon sx={{ fontSize: 22 }} />,
  inventory: <MedicationRoundedIcon sx={{ fontSize: 22 }} />,
  rooms: <MeetingRoomRoundedIcon sx={{ fontSize: 22 }} />,
  doctors: <PersonRoundedIcon sx={{ fontSize: 22 }} />,
  billing: <ReceiptLongRoundedIcon sx={{ fontSize: 22 }} />,
  hospital: <LocalHospitalRoundedIcon sx={{ fontSize: 28, color: "#4361EE" }} />,
  calendar: <CalendarMonthIcon sx={{ fontSize: 22 }} />,
  register: <AssignmentIcon sx={{ fontSize: 22 }} />,
};
