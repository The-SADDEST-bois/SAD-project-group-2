import { NavbarItems } from "../../../../types/types";

import { HiOutlineCalendar, HiOutlineBookOpen } from "react-icons/hi";

export const StudentNavbar: NavbarItems[] = [
  {
    label: "Join Session",
    icon: <HiOutlineCalendar size="40" />,
    url: "/",
  },
];

export const TutorNavbar: NavbarItems[] = [
  {
    label: "View Sessions",
    icon: <HiOutlineCalendar size="40" />,
    url: "/",
  },

  {
    label: "View Attendance",
    icon: <HiOutlineBookOpen size="40" />,
    url: "/tutorviewattendance",
  },
];

export const ModuleLeaderNavbar: NavbarItems[] = [
  {
    label: "View Session",
    icon: <HiOutlineCalendar size="40" />,
    url: "/",
  },

  {
    label: "View Session Attendance",
    icon: <HiOutlineBookOpen size="40" />,
    url: "/tutorviewattendance",
  },

  {
    label: "View Module Attendance",
    icon: <HiOutlineBookOpen size="40" />,
    url: "/moduleleaderattendance",
  },
];

export const AcademicAdvisorNavbar: NavbarItems[] = [
  {
    label: "View Session",
    icon: <HiOutlineCalendar size="40" />,
    url: "/",
  },

  {
    label: "View Attendance",
    icon: <HiOutlineBookOpen size="40" />,
    url: "/tutorviewattendance",
  },

  {
    label: "View Advisee Attendance",
    icon: <HiOutlineBookOpen size="40" />,
    url: "/academicAdvisorViewAttendance",
  },
];

export const CourseLeaderNavbar: NavbarItems[] = [
  {
    label: "View Session",
    icon: <HiOutlineCalendar size="40" />,
    url: "/",
  },

  {
    label: "View Session Attendance",
    icon: <HiOutlineBookOpen size="40" />,
    url: "/tutorviewattendance",
  },

  {
    label: "View Course Attendance",
    icon: <HiOutlineBookOpen size="40" />,
    url: "/courseleaderattendance",
  },
];
