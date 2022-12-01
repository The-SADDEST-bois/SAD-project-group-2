import { useQuery } from "react-query";
import { getAllSessionsPerModule } from "../../../../api/tutorApi/tutorApi";
import { ISession } from "../../../../types/types";
import { useStore } from "../../../contexts/storeProvider";

export const useGetAllSessionsByModule = (moduleName: string) => {
  const store = useStore();

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['allSessionsByModule', moduleName, store?.auth.user._id],
    queryFn: () => getAllSessionsPerModule(moduleName),
    refetchOnWindowFocus: true,
  });

  const sessionData = data?.data as ISession[];
  return { isLoading, isError, sessionData, refetch };
};
