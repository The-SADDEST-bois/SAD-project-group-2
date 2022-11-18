import { useEffect, useState } from "react";
import { VStack, Text, Button, Flex } from "@chakra-ui/react";
import { IUser } from "../../../types/types";
import { useStore } from "../../contexts/storeProvider";
import api from "../../../api/config/apiconfig";
import Cookies from "js-cookie";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";

const newSession = () => {
  const authStore = useStore();

  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    setCurrentUser(authStore.auth.user);
  }, [authStore.auth.user]);

  const handleSubmit = async () => {
    const cookie = Cookies.get("accessToken");
    const response = await api.post("/user/refresh", { accessToken: cookie });
    console.log(response);
  };

  return (
    <PageWithSideBar
      leftSection={<></>}
      rightSection={
        <>
          <Flex
            height="300px"
            width="300px"
            justifyContent={"center"}
            direction={"column"}
          >
            <Text>Helloooo, {currentUser?.name}</Text>

            <Button
              colorScheme="blue"
              variant="outline"
              width="full"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Flex>
        </>
      }
    />
  );
};
export default newSession;
