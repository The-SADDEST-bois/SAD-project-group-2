import {
  FormLabel,
  FormHelperText,
  FormControl,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Select } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserToDatabase } from "../../../api/userApi/userApi";
import { Roles } from "../../../types/roles";
import LoginPageTemplate from "../../components/LoginPageTemplate/LoginPageTemplate";
import { StyledButton } from "../../components/StyledButton/StyledButton";

interface ICredentials {
  email: string;
  password: string;
  role: Roles;
  firstName?: string;
  lastName?: string;
}

const Register = () => {
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
    role: Roles.Student,
    firstName: "",
    lastName: "",
  };

  const onSubmit = () => {
    addUserToDatabase(credentials);
    navigate("/");
  };

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const [credentials, setCredentials] = useState<ICredentials>(initialState);
  const errors = {
    email: isValidEmail(credentials.email),
    password: credentials.password.length < 3,
  };

  return (
    <LoginPageTemplate
      leftSection={<></>}
      height={"300px"}
      rightSection={
        <FormControl>
          {" "}
          <FormLabel>Create An Account</FormLabel>
          <Flex direction={"column"} height="75px">
            <Input
              placeholder="Email"
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />{" "}
            {!errors.email && (
              <FormHelperText color="red.400" fontStyle={"italic"}>
                Please Enter a Valid Email.
              </FormHelperText>
            )}
          </Flex>
          <Flex direction={"column"} height="75px">
            <Input
              placeholder="Password"
              type={"password"}
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
            {errors.password && (
              <FormHelperText
                color="red.400"
                fontStyle={"italic"}
                alignSelf="auto"
              >
                Please Enter A Password.
              </FormHelperText>
            )}
          </Flex>
          <Flex direction={"column"} height="50px">
            <Input
              placeholder="First Name"
              value={credentials.firstName}
              onChange={(e) =>
                setCredentials({ ...credentials, firstName: e.target.value })
              }
            />
          </Flex>
          <Flex direction={"column"} height="50px">
            <Input
              placeholder="Last Name"
              value={credentials.lastName}
              onChange={(e) =>
                setCredentials({ ...credentials, lastName: e.target.value })
              }
            />
          </Flex>
          <Flex direction={"column"} height="50px">
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
              <option value={Roles.ModuleLeader}>Module Leader</option>
              <option value={Roles.AcademicAdvisor}>Academic Advisor</option>
              <option value={Roles.CourseLeader}>Course Leader</option>
            </Select>
          </Flex>
          <StyledButton
            buttonText={"Submit"}
            onClick={onSubmit}
            isDisabled={!errors.email || errors.password}
          />
        </FormControl>
      }
    />
  );
};
export default Register;
