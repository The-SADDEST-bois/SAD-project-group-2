import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Flex,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { IModule } from "../../../types/types";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { useStore } from "../../contexts/storeProvider";
import { useGetAllModules } from "./hooks/useGetAllModules";
import AccordionData from "./components/AccordionData";

const TutorViewAttendance = () => {
  const store = useStore();

  const [dateSelection, setDateSelection] = useState({} as string);

  const { isLoading, isError, moduleData, refetch } = useGetAllModules();

  if (isError) return <Text>Something went wrong</Text>;

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
                {moduleData &&
                  !isLoading &&
                  moduleData.map((item: IModule) => (
                    <Accordion allowToggle allowMultiple>
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              {item.moduleName}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionData moduleName={item.moduleName} />
                      </AccordionItem>
                    </Accordion>
                  ))}
              </VStack>
            </VStack>
          </Flex>
        </>
      }
    />
  );
};

export default TutorViewAttendance;
