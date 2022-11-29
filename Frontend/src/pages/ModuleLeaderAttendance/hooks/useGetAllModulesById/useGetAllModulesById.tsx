import { useQuery } from "react-query";
import { getAllModulesByModuleLeader } from "../../../../../api/moduleLeaderApi/moduleLeaderApi";
import { IModule } from "../../../../../types/types";
import { useStore } from "../../../../contexts/storeProvider";

export const useGetAllModulesById = () => {
  const store = useStore();

  const moduleLeaderId = store?.auth.user?._id;

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: "getModulesByLeaderId",
    queryFn: () => getAllModulesByModuleLeader(moduleLeaderId as string),
    refetchOnWindowFocus: true,
  });

  const moduleData: IModule[] = data?.data;

  return { isLoading, isError, moduleData, refetch };
};
