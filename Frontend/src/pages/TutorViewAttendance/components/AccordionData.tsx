import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ISession } from "../../../../types/types";
import { formatDate } from "../../../utils/formatDate/formatDate";
import { useStore } from "../../../contexts/storeProvider";
import { useGetAllSessionsByModule } from "../hooks/useGetAllSessionsByModule";
import { SessionModal } from "../../../components/SessionModal/SessionModal";
import { useState } from "react";

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
}

  return (
    <>
      <AccordionPanel>
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
              <Text>
                {item.moduleName}, {"Code: " + item.sessionCode},{" "}
                {"Duration: " + item.duration},{" "}
                {"Date: " + formatDate(item?.startTime.toString())},
                {new Date(item.startTime).getTime() <
                store.staticTime.Date.getTime() ? (
                  <Button onClick={(e) => handleSubmit(item)}>
                    Edit Attendance
                  </Button>
                ) : (
                  ""
                )}
              </Text>
            ))}
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