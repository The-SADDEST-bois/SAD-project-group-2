import { Flex, Select, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { useStore } from "../../contexts/storeProvider";
import { useGetAllModules } from "./hooks/useGetAllModules";
const TutorViewAttendance = () => {
  const store = useStore();

  const [dateSelection, setDateSelection] = useState({} as string);

  const { isLoading, isError, data, refetch } = useGetAllModules();
  console.log("data =", data);
  return (
    <PageWithSideBar
      leftSection={<DynamicNavBar role={store.auth.user.role.toString()} />}
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
                <Text fontSize={"xl"}>Select Date</Text>
                <Select
                  placeholder="Please Select"
                  onChange={(e) => setDateSelection(e.target.value)}
                  borderColor="white"
                  border={"2px"}
                >
                  <option value={dateSelection}>Semester 1</option>
                  <option value={dateSelection}>Semester 2</option>
                </Select>
              </VStack>

              <VStack
                align={"left"}
                backgroundColor="#A3F5F4"
                padding="40px"
                borderRadius={"20px"}
              >
                <Text fontSize={"xl"}>Results </Text>
                <Select borderColor="white" border={"2px"}>
                  <option value={""}>Module 1</option>
                  <option value={""}>Module 2</option>
                  <option value={""}>Module 3</option>
                </Select>
                <Select borderColor="white" border={"2px"}>
                  <option value={""}>Module 1</option>
                  <option value={""}>Module 3</option>
                  <option value={""}>Module 2</option>
                </Select>
                <Select borderColor="white" border={"2px"}>
                  <option value={""}>Module 1</option>
                  <option value={""}>Module 3</option>
                  <option value={""}>Module 2</option>
                </Select>
              </VStack>
            </VStack>
          </Flex>
        </>
      }
    />
  );
};

export default TutorViewAttendance;
