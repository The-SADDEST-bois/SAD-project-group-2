import { Flex, Select, VStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { useStore } from "../../contexts/storeProvider";
import { getAllCoursesByCourseLeader } from "../../../api/courseLeaderApi/courseLeaderApi";
import { UseGetAllCourseById } from "./hooks/UseGetAllCourseById/UseGetAllCourseById";
import { ICourse } from "../../../types/types";
import { CourseAccordion } from "./components/CourseAccordion/CourseAccordion";

export const CoureLeaderAttendance = () => {
  const store = useStore();
  const [selectData, setSelectData] = useState("");
  const [courseSelection, setCourseSelection] = useState({} as ICourse);

  const { isLoading, isError, CourseObject, refetch } = UseGetAllCourseById();

  useEffect(() => {
    if (CourseObject) {
      CourseObject.map((item: ICourse) => {
        if (item?.courseName == selectData) {
          setCourseSelection(item);
          return;
        } else {
          setCourseSelection({} as ICourse);
        }
      });
    }
  }, [selectData]);
  return (
    <PageWithSideBar
      leftSection={<DynamicNavBar role={store?.auth?.user?.role as string} />}
      rightSection={
        <>
          <Flex
            height="full"
            width="full"
            justifyContent={"flex-start"}
            direction={"row"}
            gap={4}
            padding="200px"
            wrap={"wrap"}
          >
            <VStack width="full" height="full" align={"left"} spacing={10}>
              <VStack
                align={"left"}
                backgroundColor="#A3F5F4"
                padding="40px"
                borderRadius={"20px"}
              >
                <Text fontSize={"xl"}>Select Course</Text>
                <Select
                  placeholder="Please Select"
                  onChange={(e: any) => setSelectData(e.target.value)}
                  borderColor="white"
                  border={"2px"}
                >
                  {!isLoading &&
                    !isError &&
                    CourseObject.map((course: ICourse) => (
                      <option value={course.courseName}>
                        {course.courseName}
                      </option>
                    ))}
                </Select>
              </VStack>

              <VStack
                align={"left"}
                backgroundColor="#A3F5F4"
                padding="40px"
                borderRadius={"20px"}
              >
                <Text fontSize={"xl"}>Results </Text>
                <CourseAccordion course={courseSelection} />
              </VStack>
            </VStack>
          </Flex>
        </>
      }
    />
  );
};
