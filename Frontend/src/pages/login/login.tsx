import { Button } from "@chakra-ui/button";
import {
  FormLabel,
  FormControl,
  FormHelperText,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import { loginUser } from "../../../api/userApi/userApi";
import { useMutation } from "react-query";
import { useStore } from "../../contexts/storeProvider";
import { IUser } from "../../../types/types";
import { Link, useNavigate } from "react-router-dom";
import LoginPageTemplate from "../../components/LoginPageTemplate/LoginPageTemplate";
import { Flex } from "@chakra-ui/react";

interface ICredentials {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const authStore = useStore();
  const mutation = useMutation({
    mutationFn: loginUser,
  });

  const setAuthStore = (data: any) => {
    if (authStore) {
      authStore.auth.login(data.user as IUser, data.accessToken);
      //TODO navigate based on role
      navigate("/studentdashboard");
    } else {
      console.log("authStore is null");
    }
  };

  const initialState = {
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState<ICredentials>(initialState);

  const handleSubmit = () => {
    mutation.mutate(credentials, {
      onSuccess: (response) => {
        //console.table(data.data.other);
        setAuthStore(response.data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const errors = {
    email: isValidEmail(credentials.email),
    password: credentials.password.length < 3,
  };

  return (
    <LoginPageTemplate
      leftSection={<></>}
      height="200px"
      rightSection={
        <FormControl>
          <FormLabel>Login</FormLabel>

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
                Please Enter Your Password.
              </FormHelperText>
            )}
          </Flex>

          <Button
            onClick={handleSubmit}
            width="full"
            background="#17BEBB"
            _hover={{ bg: "#58edea" }}
            isDisabled={!errors.email || errors.password}
          >
            Submit
          </Button>
          <Link to="/newSession">New Session</Link>
        </FormControl>
      }
    />
  );
};
export default Login;
