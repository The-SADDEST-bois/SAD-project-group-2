import React from "react";
import { useQuery } from "react-query";
import { getOverallModuleAttendance } from "../../../../../api/moduleLeaderApi/moduleLeaderApi";

interface UseGetOverallModuleAttendance {
  moduleName: string;
}

export const useGetOverallModuleAttendance = ({
  moduleName,
}: UseGetOverallModuleAttendance) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: "moduleAttendanceByName",
    queryFn: () => getOverallModuleAttendance(moduleName as string),
    refetchOnWindowFocus: true,
  });

  const percentageAttendance = data?.data.overallAttendancePercentage;
  console.log("percentageAttendance= ", percentageAttendance);
  return { isLoading, isError, percentageAttendance, refetch };
};