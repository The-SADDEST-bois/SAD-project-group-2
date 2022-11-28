import { AccordionPanel, HStack, Text, VStack } from "@chakra-ui/react";

import { ICohorts, IModule } from "../../../../../types/types";
import {
  IState,
  useGetModuleAttendanceByCohort,
} from "../../hooks/useGetModuleAttendanceByCohort/useGetModuleAttendanceByCohort";
import { useGetOverallModuleAttendance } from "../../hooks/useGetOverallModuleAttendance/useGetOverallModuleAttendance";

interface IModuleAccordionData {
  moduleObject: IModule;
}

export const ModuleAccordionData = ({ moduleObject }: IModuleAccordionData) => {
  const { isLoading, percentageAttendance } = useGetOverallModuleAttendance({
    moduleName: moduleObject.moduleName,
  });

  const cohortNames: string[] = moduleObject?.cohorts?.map(
    (cohort: ICohorts) => {
      return cohort.courseName;
    }
  );

  const { state } = useGetModuleAttendanceByCohort({ cohortNames });

  return (
    <>
      <AccordionPanel>
        <VStack width="full" spacing={5}>
          <HStack
            width="full"
            justifyContent={"space-between"}
            border="solid 2px white"
            padding="10px"
            borderRadius={"10px"}
          >
            <Text>Overall Attendance:</Text>
            <Text color="black" fontWeight={"bold"}>
              {percentageAttendance && percentageAttendance}%
            </Text>
          </HStack>
          <>
            {state &&
              !isLoading &&
              state.map((item: IState) => (
                <HStack
                  width="full"
                  justifyContent={"space-between"}
                  border="solid 2px white"
                  padding="10px"
                  borderRadius={"10px"}
                >
                  <Text> {item?.name}</Text>
                  <Text color="black" fontWeight={"bold"}>
                    {item?.percentage}%
                  </Text>
                </HStack>
              ))}
          </>
        </VStack>
      </AccordionPanel>
    </>
  );
};
