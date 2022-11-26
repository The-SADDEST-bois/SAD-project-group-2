import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { ISession } from "../../../types/types";
import { formatDate } from "../../utils/formatDate/formatDate";
import { useStore } from "../../contexts/storeProvider";
import { useGetAllSessionsByModule } from "../../pages/TutorViewAttendance/hooks/useGetAllSessionsByModule";

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
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {moduleName}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        {sessionData &&
          !isLoading &&
          sessionData.map((item: ISession) => (
            <Text>
              {item.moduleName}, {"Code: " + item.sessionCode},{" "}
              {"Duration: " + item.duration},{" "}
              {"Date: " + formatDate(item?.startTime.toString())},
              {(item.isOpen) ? <h1>Show</h1> : <h1>no Show</h1>}
            </Text>
          ))}
      </AccordionPanel>
    </>
  );
};

export default AccordionData;
