import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/react";
import { useState } from "react";
import { getUser } from "../../../api/userApi/userApi";
import { useUsers } from '../../context/useUsers';
import { useMutation } from 'react-query';

interface ICredentials {
  email: string;
  password: string;
}

const Home = () => {

  const mutation = useMutation({
    mutationFn: getUser,
  });

  const initialState = {
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState<ICredentials>(initialState);

  const handleSubmit = () => {
    mutation.mutate(credentials);
    console.log(mutation.data?.data.other);
  }

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
