import { useQuery } from "react-query";
import { getAllSessionsByDate } from "../../../../../api/sessionApi/sessionApi";
import { useStore } from "../../../../contexts/storeProvider";

export const useGetAllSessions = () => {
  const store = useStore();

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['allSessions', store?.auth.user._id],
    queryFn: () => getAllSessionsByDate(store.auth.user._id as string, store.staticTime.Date),
    refetchOnWindowFocus: true,
  });
  return { isLoading, isError, data, refetch };
};