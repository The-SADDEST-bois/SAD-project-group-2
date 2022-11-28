import {
  AccordionPanel,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { ISession } from "../../../../types/types";
import { SessionModal } from "../../../components/SessionModal/SessionModal";
import { useStore } from "../../../contexts/storeProvider";
import { formatDate } from "../../../utils/formatDate/formatDate";
import { useGetAllSessionsByModuleAndDateRange } from "../hooks/useGetAllSessionByModuleAndDateRange";

interface IAccordionData {
  moduleName: string;
  startDate?: Date;
  endDate?: Date;
}

export const AccordianData = ({
  moduleName,
  startDate,
  endDate,
}: IAccordionData) => {
  const store = useStore();
  const [currentSession, setCurrentSession] = useState({} as ISession);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, isError, sessionData, refetch } =
    useGetAllSessionsByModuleAndDateRange(moduleName, startDate, endDate);

  const handleSubmit = (item: ISession): void => {
    setCurrentSession(item);
    onOpen();
  };

  return (
    <>
      <AccordionPanel>
        <Flex direction={"column"} gap={10}>
          {sessionData &&
            !isLoading &&
            // sort session by startTime
            sessionData
              .sort((a, b) => {
                return (
                  new Date(a.startTime).getTime() -
                  new Date(b.startTime).getTime()
                );
              })
              .map((item: ISession) => (
                <HStack
                  width="full"
                  justifyContent={"space-between"}
                  padding="10px"
                  border="2px solid white"
                  borderRadius={"10px"}
                >
                  <Text>
                    {item.moduleName}, {"Code: " + item.sessionCode},{" "}
                    {"Duration: " + item.duration},{" "}
                    {"Date: " + formatDate(item?.startTime.toString())},
                  </Text>
                  {new Date(item.startTime).getTime() <
                  store.staticTime.Date.getTime() ? (
                    <Button onClick={(e) => handleSubmit(item)}>
                      Edit Attendance
                    </Button>
                  ) : (
                    ""
                  )}
                </HStack>
              ))}
        </Flex>
      </AccordionPanel>
      <SessionModal
        isOpen={isOpen}
        onClose={onClose}
        session={currentSession}
      />
    </>
  );
};
