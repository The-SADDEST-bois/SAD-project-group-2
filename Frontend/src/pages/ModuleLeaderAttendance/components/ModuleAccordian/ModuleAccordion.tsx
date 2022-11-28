import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { ICohort, IModule } from "../../../../../types/types";
import { useGetOverallModuleAttendance } from "../../hooks/useGetOverallModuleAttendance/useGetOverallModuleAttendance";
import { ModuleAccordionData } from "../ModuleAccordianData/ModuleAccordionData";

interface IModuleAttendance {
  module: IModule;
}

export const ModuleAccordion = ({ module }: IModuleAttendance) => {
  const { isLoading, percentageAttendance } = useGetOverallModuleAttendance({
    moduleName: module.moduleName,
  });

  console.log("module= ", module.moduleName);
  if (!module.moduleName) return <></>

  return (
    <>
      <Accordion allowToggle allowMultiple>
        <AccordionItem>
          <AccordionButton>
          <Box flex="1" textAlign="left">
            {!isLoading && module != undefined && (
              <>
                <Text>{module.moduleName}</Text>
                <Text>Overall Attendance:</Text>
                <Text color="black" fontWeight={"bold"}>
                  {percentageAttendance && percentageAttendance}%
                </Text>
              </>
            )}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            {module.cohorts && module.cohorts.map((cohort) => (
              <ModuleAccordionData cohortName={cohort.courseName} />
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
