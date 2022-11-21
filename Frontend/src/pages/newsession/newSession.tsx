import { useEffect, useState } from "react";
import { Text, Flex } from "@chakra-ui/react";
import { IUser } from "../../../types/types";
import { useStore } from "../../contexts/storeProvider";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";

const newSession = () => {
  const authStore = useStore();

  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    setCurrentUser(authStore.auth.user);
  }, [authStore.auth.user]);


  return (
    <PageWithSideBar
      leftSection={<DynamicNavBar role={currentUser?.role.toString()} />}
      rightSection={
        <>
          <Flex
            height="300px"
            width="300px"
            justifyContent={"center"}
            direction={"column"}
          >
            <Text>Helloooo, {currentUser?.name}</Text>

          </Flex>
        </>
      }
    />
  );
};
export default newSession;
