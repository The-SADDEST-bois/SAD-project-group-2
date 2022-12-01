import { useState } from "react";
import { useQuery } from "react-query";
import { getOverallCohortAttendance } from "../../../../../api/moduleLeaderApi/moduleLeaderApi";

interface IuseGetModuleAttendanceByCohort {
  cohortName: string;
  moduleName: string;
}

export const useGetModuleAttendanceByCohort = ({
  cohortName,
  moduleName,
}: IuseGetModuleAttendanceByCohort) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['useGetModuleAttendanceByCohort', cohortName, moduleName],
    queryFn: () => getOverallCohortAttendance(cohortName, moduleName),
    refetchOnWindowFocus: true,
  });

  const overallAttendancePercent = data?.data.overallAttendancePercentage;
  return { isLoading, isError, overallAttendancePercent, refetch };
};
