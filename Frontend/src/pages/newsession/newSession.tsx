import { useEffect, useState } from "react";
import { VStack, Text, Button, Flex } from "@chakra-ui/react";
import { IUser } from "../../../types/types";
import { useStore } from "../../contexts/storeProvider";
import api from "../../../api/config/apiconfig";
import Cookies from "js-cookie";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";

const newSession = () => {
  const store = useStore();

  console.log("TYPE =", store.auth.user);

  return (
    <PageWithSideBar
      leftSection={<DynamicNavBar role={store.auth.user.role.toString()} />}
      rightSection={
        <>
          <Flex
            height="300px"
            width="300px"
            justifyContent={"center"}
            direction={"column"}
          >
            <Text>Helloooo, {store.auth.user?.firstName}</Text>

            <Button colorScheme="blue" variant="outline" width="full">
              Submit
            </Button>
          </Flex>
        </>
      }
    />
  );
};
export default newSession;
