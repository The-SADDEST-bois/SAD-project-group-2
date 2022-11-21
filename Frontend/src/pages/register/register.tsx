import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/react";
import { useState } from "react";
import { addUserToDatabase } from "../../../api/userApi/userApi";
import { Roles } from "../../../types/roles";
import { IUser } from "../../../types/types";

const Register = () => {
  const initialState = {
    email: "",
    password: "",
    role: Roles.Admin,
    name: "",
  };

  const onSubmit = () => {
    addUserToDatabase(newUser);
  };

  const [newUser, setNewUser] = useState<IUser>(initialState);

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
          <FormLabel>Create An Account</FormLabel>
          <Input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          ></Input>

          <Input
            placeholder="Password"
            type={"password"}
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          ></Input>

          <Select
            placeholder="Select a Role"
            onChange={(e) =>
              setNewUser({
                ...newUser,
                role: Roles[e.target.value as keyof typeof Roles],
              })
            }
          >
            <option value={Roles.Student}>Student</option>
            <option value={Roles.Tutor}>Tutor</option>
          </Select>

          <Button onClick={onSubmit}>Submit</Button>
        </FormControl>
      </VStack>
    </Flex>
  );
};
export default Register;
