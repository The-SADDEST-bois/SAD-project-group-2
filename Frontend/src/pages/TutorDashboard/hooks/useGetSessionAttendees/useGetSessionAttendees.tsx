import { useQuery } from "react-query";
import { getSessionAttendees } from "../../../../../api/sessionApi/sessionApi";
import { IAttendance } from "../../../../../types/types";

export const useGetSessionAttendees = (
  isOpen: boolean,
  userSessionID: string
) => {
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: "attendees",
    queryFn: () => getSessionAttendees(userSessionID as string),
    refetchInterval: 5000,
    enabled: isOpen,
    refetchOnWindowFocus: true,
  });

  const users: IAttendance = data as IAttendance;
  return { isLoading, isError, users, refetch };
};
