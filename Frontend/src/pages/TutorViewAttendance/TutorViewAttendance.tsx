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
import { useEffect, useState } from "react";
import { IModule } from "../../../types/types";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { useStore } from "../../contexts/storeProvider";
import { useGetAllModules } from "./hooks/useGetAllModules";
import { AccordianData } from "./components/AccordianData";

const TutorViewAttendance = () => {
  const store = useStore();

  const [dateSelection, setDateSelection] = useState({} as string);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (dateSelection == "") {
      setStartDate(undefined);
      setEndDate(undefined);
    } else if (dateSelection == "Semester 1") {
      setStartDate(new Date("2022/10/01"));
      setEndDate(new Date("2022/11/15"));
    } else if (dateSelection == "Semester 2") {
      setStartDate(new Date("2022/11/16"));
      setEndDate(new Date("2023/01/01"));
    }
  }, [dateSelection]);

  const { isLoading, isError, moduleData } = useGetAllModules();

  if (isError) return <Text>Something went wrong</Text>;

  if (isLoading) return <Text>Loading...</Text>;

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
                  <option value={"Semester 1"}>Semester 1</option>
                  <option value={"Semester 2"}>Semester 2</option>
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
                  !isError &&
                  moduleData?.map((item: IModule) => (
                    <Accordion allowMultiple>
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              {item.moduleName}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordianData
                          moduleName={item.moduleName}
                          startDate={startDate}
                          endDate={endDate}
                        />
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
