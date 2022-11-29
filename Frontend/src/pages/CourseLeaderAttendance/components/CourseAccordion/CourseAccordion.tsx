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
import React from "react";
import { ICourse } from "../../../../../types/types";
import { useGetCourseAttendanceByName } from "../../hooks/useGetCourseAttendanceById/useGetCourseAttendanceByName";
import { CourseAccordionData } from "../CourseAccordionData/CourseAccordionData";

interface ICourseAccordion {
  course: ICourse;
}

export const CourseAccordion = ({ course }: ICourseAccordion) => {
  const courseName = course?.courseName;

  const { isLoading, percentageAttendance, refetch } =
    useGetCourseAttendanceByName({
      courseName,
    });

  if (!courseName) return <></>;

  console.log("course = ", course);

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
