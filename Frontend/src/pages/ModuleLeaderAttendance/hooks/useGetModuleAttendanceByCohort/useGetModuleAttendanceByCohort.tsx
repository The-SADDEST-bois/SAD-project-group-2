import { useState } from "react";
import { useQuery } from "react-query";
import { getOverallCohortAttendance } from "../../../../../api/moduleLeaderApi/moduleLeaderApi";

interface IuseGetModuleAttendanceByCohort {
  cohortName: string;
}

export const useGetModuleAttendanceByCohort = ({
  cohortName,
}: IuseGetModuleAttendanceByCohort) => {

  console.log("cohortName= ", cohortName);

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: "allModules",
    queryFn: () => getOverallCohortAttendance(cohortName),
    refetchOnWindowFocus: true,
  });

  const overallAttendancePercent = data?.data.overallAttendancePercentage;
  return { isLoading, isError, overallAttendancePercent, refetch };
};
