import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { ISession } from "../../../../types/types";
import { formatDate } from "../../../utils/formatDate/formatDate";
import { useStore } from "../../../contexts/storeProvider";
import { useGetAllSessionsByModule } from "../hooks/useGetAllSessionsByModule";

interface IAccordionData {
  moduleName: string;
  startDate?: Date;
  endDate?: Date;
}

export const AccordionData = ({
  moduleName,
  startDate,
  endDate,
}: IAccordionData) => {
  const store = useStore();
  const { isLoading, isError, sessionData, refetch } =
    useGetAllSessionsByModule(moduleName);

    
  return (
    <>

      <AccordionPanel>
        {sessionData &&
          !isLoading &&
          sessionData.map((item: ISession) => (
            <Text>
              {item.moduleName}, {"Code: " + item.sessionCode},{" "}
              {"Duration: " + item.duration},{" "}
              {"Date: " + formatDate(item?.startTime.toString())},
              {new Date(item.startTime).getTime() < store.staticTime.Date.getTime() ? "Show" : "no Show"}
            </Text>
          ))}
      </AccordionPanel>
    </>
  );
};

export default AccordionData;
