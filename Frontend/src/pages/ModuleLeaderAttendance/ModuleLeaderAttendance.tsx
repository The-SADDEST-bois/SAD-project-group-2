import { Flex, Select, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IModule } from "../../../types/types";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { useStore } from "../../contexts/storeProvider";
import { ModuleAccordion } from "./components/ModuleAccordian/ModuleAccordion";
import { useGetAllModulesById } from "./hooks/useGetAllModulesById/useGetAllModulesById";

export const ModuleLeaderAttendance = () => {
  const store = useStore();
  const { moduleData, isError, isLoading } = useGetAllModulesById();
  const [moduleSelection, setModuleSelection] = useState({} as IModule);
  const [selectData, setSelectData] = useState("");

  useEffect(() => {
    if (moduleData) {
      moduleData?.map((item) => {
        if (item.moduleName == selectData) {
          setModuleSelection(item);
          return;
        } else {
          setModuleSelection({} as IModule);
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
                <Text fontSize={"xl"}>Select Module</Text>
                <Select
                  placeholder="Please Select"
                  onChange={(e: any) => setSelectData(e.target.value)}
                  borderColor="white"
                  border={"2px"}
                >
                  {!isLoading &&
                    moduleData &&
                    moduleData?.map((module) => (
                      <option value={module.moduleName}>
                        {module.moduleName}
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
                <ModuleAccordion module={moduleSelection} />
              </VStack>
            </VStack>
          </Flex>
        </>
      }
    />
  );
};
