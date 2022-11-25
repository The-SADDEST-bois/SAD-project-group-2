import { useQuery } from "react-query";
import { getAllModulesByTutor } from "../../../../api/tutorApi/tutorApi";
import { useStore } from "../../../contexts/storeProvider";

export const useGetAllModules = () => {
  const store = useStore();

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: "allModules",
    queryFn: () => getAllModulesByTutor(store.auth.user._id as string),
    refetchOnWindowFocus: true,
  });

  return { isLoading, isError, data, refetch };
};
