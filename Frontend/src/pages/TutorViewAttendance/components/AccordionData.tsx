import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ISession } from "../../../../types/types";
import { formatDate } from "../../../utils/formatDate/formatDate";
import { useStore } from "../../../contexts/storeProvider";
import { useGetAllSessionsByModule } from "../hooks/useGetAllSessionsByModule";
import { SessionModal } from "../../../components/SessionModal/SessionModal";
import { useState } from "react";
import React from "react";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, isError, sessionData, refetch } =
    useGetAllSessionsByModule(moduleName);
  const [currentSession, setCurrentSession] = useState({} as ISession);

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
export default AccordionData;
