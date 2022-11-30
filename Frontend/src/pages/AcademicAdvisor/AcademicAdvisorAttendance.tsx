import { Flex, VStack, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { useStore } from "../../contexts/storeProvider";
import { ModuleAccordion } from "../ModuleLeaderAttendance/components/ModuleAccordian/ModuleAccordion";
import { useGetAdvisorAdvisee } from "./hooks/useGetAdvisorAdvisee";

interface Iadvisee {
  _id: string;
  firstName: string;
  lastName: string;
}

const AcademicAdvisorAttendance = () => {
  const store = useStore();

  const [selectData, setSelectData] = useState<string>("");
  const { advisees, isError, isLoading, refetch } = useGetAdvisorAdvisee();
  const [adviseeSelection, setAdviseeSelection] = useState({} as Iadvisee);

  useEffect(() => {
    if (advisees) {
      advisees?.map((item: Iadvisee) => {
        if (item._id == selectData) {
          setAdviseeSelection(item);
          return;
        }
      });
      if (selectData == "") {
        setAdviseeSelection({} as Iadvisee);
      }
    }
  }, [selectData]);

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
                <Text fontSize={"xl"}>Select Student</Text>
                <Select
                  placeholder="Please Select"
                  onChange={(e: any) => setSelectData(e.target.value)}
                  borderColor="white"
                  border={"2px"}
                >
                  {!isLoading &&
                    !isError &&
                    advisees &&
                    advisees?.map((advisee: Iadvisee) => (
                      <option value={advisee._id}>{advisee.firstName}</option>
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
                <Text>{adviseeSelection.firstName}</Text>
              </VStack>
            </VStack>
          </Flex>
        </>
      }
    />
  );
};
export default AcademicAdvisorAttendance;
