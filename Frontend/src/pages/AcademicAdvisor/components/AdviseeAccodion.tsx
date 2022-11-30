import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { CourseAccordionData } from "../../CourseLeaderAttendance/components/CourseAccordionData/CourseAccordionData";
import { useGetOverallAdviseeAttendance } from "../hooks/useGetOverallAdviseeAttendance";

interface Iadvisee {
  _id: string;
  firstName: string;
  lastName: string;
}

export const AdviseeAccodion = ({ _id, firstName, lastName }: Iadvisee) => {

    const {isLoading, isError, data, refetch} = useGetOverallAdviseeAttendance(_id);



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
                {!isLoading && course != undefined && (
                  <>
                    <Text>{course.courseName}</Text>
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
              {course?.modules &&
                course?.modules.map((module) => (
                  <CourseAccordionData moduleName={module.moduleName} />
                ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
