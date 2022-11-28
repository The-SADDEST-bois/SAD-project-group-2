import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
import { ModuleAccordionData } from "./compoenents/ModuleAccordianData/ModuleAccordionData";
import { useGetAllModulesById } from "./hooks/useGetAllModulesById/useGetAllModulesById";

export const ModuleLeaderAttendance = () => {
  const store = useStore();
  const { moduleData, isError, isLoading } = useGetAllModulesById();
  const [dateSelection, setDateSelection] = useState({} as string);

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
                            <Box
                              flex="1"
                              textAlign="left"
                              border={"2px white solid"}
                              padding="10px"
                              borderRadius={"10px"}
                            >
                              {item.moduleName}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <ModuleAccordionData moduleObject={item} />
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
