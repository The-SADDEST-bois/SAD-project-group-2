import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IModule } from "../../../../../types/types";
import { useGetOverallModuleAttendance } from "../../hooks/useGetOverallModuleAttendance/useGetOverallModuleAttendance";
import { ModuleAccordionData } from "../ModuleAccordianData/ModuleAccordionData";

interface IModuleAttendance {
  module: IModule;
}

export const ModuleAccordion = ({ module }: IModuleAttendance) => {
  const { isLoading, percentageAttendance } = useGetOverallModuleAttendance({
    moduleName: module.moduleName,
  });

  if (!module.moduleName) return <></>;

  return (
    <>
      <Accordion allowToggle allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <HStack
                width="full"
                border="solid 2px white"
                borderRadius="10px"
                padding="10px"
                justifyContent={"space-between"}
              >
                {!isLoading && module != undefined && (
                  <>
                    <Text>{module.moduleName}</Text>
                    <Text color="black" fontWeight={"bold"}>
                      {percentageAttendance && percentageAttendance}%
                    </Text>
                  </>
                )}
              </HStack>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack
              width="100%"
              padding="10px"
              justifyContent={"space-between"}
              spacing={5}
            >
              {module.cohorts &&
                module.cohorts.map((cohort) => (
                  <ModuleAccordionData cohortName={cohort.courseName} />
                ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
