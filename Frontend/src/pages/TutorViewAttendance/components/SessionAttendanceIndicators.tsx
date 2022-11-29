import React, { useEffect, useState } from "react";
import { calculateSessionAttendanceReport } from "../../../utils/calculateAttendance/calculateAttendance";
import { IAttendance } from "../../../../types/types";

export const SessionAttendanceIndicators = (attendance: IAttendance) => {

    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        setPercentage(calculateSessionAttendanceReport(attendance));
    }, [attendance]);

  return <p>{percentage}%</p>;
};
