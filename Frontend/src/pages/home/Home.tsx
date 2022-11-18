import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, VStack, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { login } from "../../../api/userApi/userApi";
import { useMutation } from "react-query";
import { useStore } from "../../contexts/storeProvider";
import { IUser } from "../../../types/types";
import { Link, useNavigate } from "react-router-dom";

interface ICredentials {
  email: string;
  password: string;
}

const Home = () => {

  const navigate = useNavigate();

  const authStore = useStore();

  const mutation = useMutation({
    mutationFn: login,
  });

  const initialState = {
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState<ICredentials>(initialState);

  const setAuthStore = (data: any) => {
    if (authStore){
      authStore.auth.login(data.user as IUser, data.accessToken);
      navigate('/NewSession');
    }
    else{
      console.log("authStore is null");
    }
  } 

  const handleSubmit = () => {
    mutation.mutate(credentials, {
      onSuccess: (response) => {
        //console.table(data.data.other);
        setAuthStore(response.data);
      },
      onError: (error) => {
        console.log(error);
      }
    });
  };

  return (
    <Flex h="100vh" justify="space-between">
      <VStack h="full" w="full" bg={"#17BEBB"}></VStack>

      <VStack
        bg="white"
        h="full"
        maxW="450px"
        w="full"
        px="16"
        borderLeft="1px"
        borderColor="black"
        overflowY="auto"
        justifyContent={"center"}
      >
        <FormControl>
          <FormLabel>Login</FormLabel>
          <Input
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          ></Input>

          <Input
            placeholder="Password"
            type={"password"}
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          ></Input>

          <Button onClick={handleSubmit}>Submit</Button>
        </FormControl>
      </VStack>
    </Flex>
  );
};
export default Home;
