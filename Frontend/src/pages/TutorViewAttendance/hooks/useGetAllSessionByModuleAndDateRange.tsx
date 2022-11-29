import { useEffect } from "react";
import { useQueries, useQuery } from "react-query";
import { getAllSessionsBetweenDateRange, getAllSessionsPerModule } from "../../../../api/tutorApi/tutorApi";
import { ISession } from "../../../../types/types";


export const useGetAllSessionsByModuleAndDateRange = (moduleName: string, startDate?: Date, endDate?: Date) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["getAllSessionByModuleAndDateRange", moduleName, startDate, endDate],
    queryFn: () => getAllSessionsBetweenDateRange(moduleName, startDate, endDate),
    refetchOnWindowFocus: true,
  });

  const sessionData = data?.data as ISession[];
  return { isLoading, isError, sessionData, refetch };
};