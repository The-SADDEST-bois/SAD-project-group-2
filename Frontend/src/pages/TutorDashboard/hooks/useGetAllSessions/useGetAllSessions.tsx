import { useQuery } from "react-query";
import { getAllSessionsApi } from "../../../../../api/sessionApi/sessionApi";
import { useStore } from "../../../../contexts/storeProvider";

export const useGetAllSessions = () => {
  const store = useStore();

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: "allSessions",
    queryFn: () => getAllSessionsApi(store.auth.user._id as string),
    refetchOnWindowFocus: true,
  });
  return { isLoading, isError, data, refetch };
};
