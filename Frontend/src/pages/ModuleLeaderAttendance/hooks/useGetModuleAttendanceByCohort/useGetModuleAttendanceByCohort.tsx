import { useState } from "react";
import { useQuery } from "react-query";
import { getOverallCohortAttendance } from "../../../../../api/moduleLeaderApi/moduleLeaderApi";

interface IuseGetModuleAttendanceByCohort {
  cohortNames: string[];
}

export interface IState {
  name: string;
  percentage: number;
}

export const useGetModuleAttendanceByCohort = ({
  cohortNames,
}: IuseGetModuleAttendanceByCohort) => {
  const [state, setState] = useState<IState[]>([]);

  cohortNames.map(async (item) => {
    return useQuery({
      queryKey: "cohortAttendanceByName",
      queryFn: () => getOverallCohortAttendance(item as string),
      refetchOnWindowFocus: true,
      onSuccess(data) {
        console.log("The data = ", data.data.overallAttendancePercentage);

        setState([
          {
            ...state,
            name: item,
            percentage: data.data.overallAttendancePercentage,
          },
        ]);
        return data.data.overallAttendancePercentage;
      },
    });
  });

  return { state };
};
