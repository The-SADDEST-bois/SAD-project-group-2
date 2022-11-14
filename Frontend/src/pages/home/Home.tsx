import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, VStack } from "@chakra-ui/layout";
import { useState } from "react";

interface ICredentials {
  username: string;
  password: string;
}

const Home = () => {
  const initialState = {
    username: "",
    password: "",
  };

  const onSubmit = () => {};

  const [credentials, setCredentials] = useState<ICredentials>(initialState);

  console.log(credentials);

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
        <FormControl onSubmit={onSubmit}>
          <FormLabel>Log In</FormLabel>
          <Input
            placeholder="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
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

          <Button type="submit"> Submit</Button>
        </FormControl>
      </VStack>
    </Flex>
  );
};
export default Home;
