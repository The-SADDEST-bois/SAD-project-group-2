import { Flex, VStack, Select, Text } from '@chakra-ui/react'
import React from 'react'
import { DynamicNavBar } from '../../components/DynamicNavbar/DynamicNavBar'
import { PageWithSideBar } from '../../components/PageWithSideBar/PageWithSideBar'
import { useStore } from '../../contexts/storeProvider'
import { ModuleAccordion } from '../ModuleLeaderAttendance/components/ModuleAccordian/ModuleAccordion'
import { useGetAdvisorAdvisee } from './hooks/useGetAdvisorAdvisee'

const AcademicAdvisorAttendance = () => {
    const store = useStore();

    const { data, isError, isLoading, refetch } = useGetAdvisorAdvisee();

    console.log(data);

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
                <Select>
                    {/* select options */}
                </Select>
              </VStack>

              <VStack
                align={"left"}
                backgroundColor="#A3F5F4"
                padding="40px"
                borderRadius={"20px"}
              >
                <Text fontSize={"xl"}>Results </Text>
                {/*student results*/}
              </VStack>
            </VStack>
          </Flex>
        </>
      }
    />
  )
}
export default AcademicAdvisorAttendance