import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select } from "@chakra-ui/react";
import { useState } from "react";
import { addUserToDatabase } from "../../../api/userApi/userApi";
import { Roles } from "../../../types/roles";
import LoginPageTemplate from "../../components/LoginPageTemplate/LoginPageTemplate";

interface ICredentials {
  email: string;
  password: string;
  role: Roles;
  firstName?: string;
  lastName?: string;
}

const Register = () => {
  const initialState = {
    email: "",
    password: "",
    role: Roles.Student,
    firstName: "",
    lastName: "",
  };

  const onSubmit = () => {
    addUserToDatabase(credentials);
  };

  const [credentials, setCredentials] = useState<ICredentials>(initialState);

  return (
    <LoginPageTemplate
      leftSection={<></>}
      height={"300px"}
      rightSection={
        <>
          {" "}
          <FormLabel>Create An Account</FormLabel>
          <Input
            placeholder="First Name"
            value={credentials.firstName}
            onChange={(e) =>
              setCredentials({ ...credentials, firstName: e.target.value })
            }
          />
          <Input
            placeholder="Last Name"
            value={credentials.lastName}
            onChange={(e) =>
              setCredentials({ ...credentials, lastName: e.target.value })
            }
          />
          <Input
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <Input
            placeholder="Password"
            type={"password"}
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
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
          <Button
            onClick={onSubmit}
            width="full"
            background="#17BEBB"
            _hover={{ bg: "#58edea" }}
          >
            Submit
          </Button>
        </>
      }
    />
  );
};
export default Register;
