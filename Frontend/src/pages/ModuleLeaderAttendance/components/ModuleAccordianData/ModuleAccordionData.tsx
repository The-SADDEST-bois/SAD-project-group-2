import { HStack, Text } from "@chakra-ui/react";

import { useGetModuleAttendanceByCohort } from "../../hooks/useGetModuleAttendanceByCohort/useGetModuleAttendanceByCohort";

interface IModuleAccordionData {
  cohortName: string;
  moduleName: string;
}

export const ModuleAccordionData = ({
  cohortName,
  moduleName,
}: IModuleAccordionData) => {
  const { isLoading, isError, overallAttendancePercent, refetch } =
    useGetModuleAttendanceByCohort({ cohortName, moduleName });

  return (
    <HStack
      width="100%"
      border="solid 2px white"
      borderRadius="10px"
      padding="10px"
      justifyContent={"space-between"}
    >
      {!isLoading && !isError && overallAttendancePercent && (
        <>
          <Text>{cohortName} Cohort</Text>
          <Text fontWeight={"bolder"}>{overallAttendancePercent}%</Text>
        </>
      )}
    </HStack>
  );
};
