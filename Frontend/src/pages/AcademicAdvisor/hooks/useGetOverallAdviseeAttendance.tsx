import React from 'react'
import { useQuery } from 'react-query';
import { useStore } from '../../../contexts/storeProvider';
import { getOverallAdviseeAttendance } from "../../../../api/advisorApi/advisorApi";

export const useGetOverallAdviseeAttendance = (_id: string) => {

    const { isLoading, isError, data, refetch } = useQuery({
      queryKey: "useGetOverallAdviseeAttendance",
      queryFn: () => getOverallAdviseeAttendance(_id),
      refetchOnWindowFocus: true,
    });

    console.log(data)
    return { isLoading, isError, data, refetch };
}
