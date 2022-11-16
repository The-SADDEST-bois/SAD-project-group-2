import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/react";
import { useState } from "react";
import { addUserToDatabase, login } from "../../../api/userApi/userApi";

interface ICredentials {
  email: string;
  password: string;
}

const Home = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const onSubmit = () => {
    login(credentials);
  };

  const [credentials, setCredentials] = useState<ICredentials>(initialState);

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

          <Button onClick={onSubmit}>Submit</Button>
        </FormControl>
      </VStack>
    </Flex>
  );
};
export default Home;
