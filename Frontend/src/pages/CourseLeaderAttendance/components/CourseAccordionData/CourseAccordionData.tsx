import { HStack, Text } from "@chakra-ui/react";
import { useGetOverallModuleAttendance } from "../../../ModuleLeaderAttendance/hooks/useGetOverallModuleAttendance/useGetOverallModuleAttendance";

interface ICourseAccordionData {
  moduleName: string;
}

export const CourseAccordionData = ({ moduleName }: ICourseAccordionData) => {
  const { isLoading, isError, percentageAttendance, refetch } =
    useGetOverallModuleAttendance({ moduleName });
  return (
    <HStack
      width="100%"
      border="solid 2px white"
      borderRadius="10px"
      padding="10px"
      justifyContent={"space-between"}
    >
      {!isLoading && !isError && percentageAttendance && (
        <>
          <Text>{moduleName}</Text>
          <Text fontWeight={"bolder"}>{percentageAttendance}%</Text>
        </>
      )}
    </HStack>
  );
};
