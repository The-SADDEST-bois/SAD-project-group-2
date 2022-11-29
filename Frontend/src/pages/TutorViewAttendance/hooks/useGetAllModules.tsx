import { useQuery } from "react-query";
import { getAllModulesByTutor } from "../../../../api/tutorApi/tutorApi";
import { IModule } from "../../../../types/types";
import { useStore } from "../../../contexts/storeProvider";

export const useGetAllModules = () => {
  const store = useStore();

  const { isLoading, isError, data, refetch, } = useQuery({
    queryKey: "allModules",
    queryFn: () => getAllModulesByTutor(store.auth.user._id as string),
    refetchOnWindowFocus: true,
  });

  const moduleData = data?.data as IModule[];
  return { isLoading, isError, moduleData, refetch };
};
