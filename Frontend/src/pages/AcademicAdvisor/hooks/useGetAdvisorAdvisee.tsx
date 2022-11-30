import React from 'react'
import { useQuery } from 'react-query';
import { useStore } from '../../../contexts/storeProvider';
import { getAdviseesByAdvisorId } from "../../../../api/advisorApi/advisorApi";

export const useGetAdvisorAdvisee = () => {
    const store = useStore();

    const AcademicAdvisorId = store?.auth.user?._id;
  
    if (!AcademicAdvisorId) {
      throw new Error("No Academic Advisor ID");
    }

    const { isLoading, isError, data, refetch } = useQuery({
      queryKey: ['getAcademicAdvisorAdvisee', AcademicAdvisorId],
      queryFn: () => getAdviseesByAdvisorId(AcademicAdvisorId),
      refetchOnWindowFocus: true,
    });

    const advisees = data?.data;
    return { isLoading, isError, advisees, refetch };
}
