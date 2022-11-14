import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/react";
import { useState } from "react";
import { addUserToDatabase } from "../../../api/userApi/userApi";

enum Roles {
  Admin = "Admin",
  Student = "Student",
  Tutor = "Tutor",
  ModuleLeader = "ModuleLeader",
  AcademicAdvisor = "AcademicAdvisor",
  CourseLeader = "CourseLeader",
}
interface ICredentials {
  email: string;
  password: string;
  role: Roles;
  name?: string;
}

const Home = () => {
  const initialState = {
    email: "",
    password: "",
    role: Roles.Admin,
    name: "",
  };

  const onSubmit = () => {
    addUserToDatabase(credentials);
  };

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
        <FormControl>
          <FormLabel>Log In</FormLabel>
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

          <Select
            placeholder="Select a Role"
            onChange={(e) =>
              setCredentials({
                ...credentials,
                role: Roles[e.target.value as keyof typeof Roles],
              })
            }
          >
            <option value={Roles.Student}>Student</option>
            <option value={Roles.Tutor}>Tutor</option>
          </Select>

          <Button onClick={onSubmit}> Submit</Button>
        </FormControl>
      </VStack>
    </Flex>
  );
};
export default Home;
