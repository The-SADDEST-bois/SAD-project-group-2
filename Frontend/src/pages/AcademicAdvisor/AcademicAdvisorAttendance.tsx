import { Flex, VStack, Select, Text, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { useStore } from "../../contexts/storeProvider";
import { ModuleAccordion } from "../ModuleLeaderAttendance/components/ModuleAccordian/ModuleAccordion";
import { AdviseeAttendanceIndicators } from "./components/AdviseeAttendanceIndicators";
import { useGetAdvisorAdvisee } from "./hooks/useGetAdvisorAdvisee";

interface Iadvisee {
  _id: string;
  firstName: string;
  lastName: string;
}

const AcademicAdvisorAttendance = () => {
  const store = useStore();

  const { advisees, isError, isLoading, refetch } = useGetAdvisorAdvisee();

  console.log(advisees);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                {!isLoading &&
                  !isError &&
                  advisees.map((item: Iadvisee) => (
                    <Flex justifyContent={"space-evenly"}>
                      <HStack width={"full"}>
                        <Text>
                          {item.firstName}
                          {item.lastName}
                        </Text>
                      </HStack>
                        <AdviseeAttendanceIndicators _id={item._id} />
                    </Flex>
                  ))}
              </VStack>
            </VStack>
          </Flex>
        </>
      }
    />
  );
};
export default AcademicAdvisorAttendance;
