import React from "react";
import { useQuery } from "react-query";
import { getOverallCourseAttendance } from "../../../../../api/courseLeaderApi/courseLeaderApi";

interface IUseGetCourseAttendanceByName {
  courseName: string;
}
export const useGetCourseAttendanceByName = ({
  courseName,
}: IUseGetCourseAttendanceByName) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: "getCourseAttendanceByName",
    queryFn: () => getOverallCourseAttendance(courseName as string),
    refetchOnWindowFocus: true,
  });

  const percentageAttendance = data?.data.overallAttendancePercentage;

  return { isLoading, isError, percentageAttendance, refetch };
};
