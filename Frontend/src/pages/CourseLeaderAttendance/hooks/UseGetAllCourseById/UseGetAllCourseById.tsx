import React from "react";
import { useQuery } from "react-query";
import { getAllCoursesByCourseLeader } from "../../../../../api/courseLeaderApi/courseLeaderApi";
import { ICourse } from "../../../../../types/types";
import { useStore } from "../../../../contexts/storeProvider";

export const UseGetAllCourseById = () => {
  const store = useStore();
  const courseLeaderId = store?.auth.user._id;

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['useGetCourseByLeaderId', courseLeaderId],
    queryFn: () => getAllCoursesByCourseLeader(courseLeaderId as string),
    refetchOnWindowFocus: true,
  });

  const CourseObject: ICourse[] = data?.data;
  return { isLoading, isError, CourseObject, refetch };
};
