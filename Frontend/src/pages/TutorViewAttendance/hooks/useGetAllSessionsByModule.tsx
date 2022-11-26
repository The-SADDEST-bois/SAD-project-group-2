import { useQuery } from "react-query";
import { getAllSessionsPerModule } from "../../../../api/tutorApi/tutorApi";
import { ISession } from "../../../../types/types";
import { useStore } from "../../../contexts/storeProvider";

export const useGetAllModules = (moduleName: string) => {
  const store = useStore();

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: "allSessionsByModule",
    queryFn: () => getAllSessionsPerModule(moduleName),
    refetchOnWindowFocus: true,
  });

  const sessionData = data?.data as ISession[];
  return { isLoading, isError, sessionData, refetch };
};
