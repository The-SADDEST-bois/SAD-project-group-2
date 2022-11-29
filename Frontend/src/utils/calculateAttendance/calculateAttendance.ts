import { IAttendance } from "../../../types/types";

export const calculateSessionAttendanceReport = (item: IAttendance): number => {
    if (!item) return 0;
    const totalAttendees: number = item.attendance.length;
    const attended = item.attendance.filter(
      (attendees) => attendees.status === 1
    );
    const totalAttended: number = attended.length;

    const finalFormula = ((totalAttended / totalAttendees) * 100).toFixed(2);

    return +finalFormula;
  };
