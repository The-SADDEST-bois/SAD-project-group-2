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
import { useNavigate } from "react-router-dom";
import LoginPageTemplate from "../../components/LoginPageTemplate/LoginPageTemplate";
import { Flex, Text } from "@chakra-ui/react";
import { StyledButton } from "../../components/StyledButton/StyledButton";
import { isValidEmail } from "../../utils/validateEmail/isValidEmail";

interface ICredentials {
  email: string;
  password: string;
}

interface IUserDetails {
  email: string;
  role: string;
  password: string;
}
interface IAuthResponse {
  accessToken: string;
  message: string;
  user: IUserDetails;
}

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const authStore = useStore();
  const mutation = useMutation({
    mutationFn: loginUser,
  });

  const [credentials, setCredentials] = useState<ICredentials>(initialState);
  const setAuthStore = (data: IAuthResponse) => {
    if (authStore) {
      authStore.auth.login(data.user as IUser, data.accessToken);
    }

    if (data.user.role === "Student") {
      navigate("/studentdashboard");
      return;
    }
    if (data.user.role === "Tutor") {
      navigate("/tutordashboard");
      return;
    }
    console.log("authStore is null");
  };

  const handleSubmit = () => {
    mutation.mutate(credentials, {
      onSuccess: (response) => {
        setAuthStore(response.data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const errors = {
    email: isValidEmail(credentials.email),
    password: credentials.password.length < 3,
  };

  return (
    <LoginPageTemplate
      leftSection={
        <>
          <Text fontSize={"8xl"}>Attendance Register</Text>
        </>
      }
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

          <StyledButton
            buttonText={"Submit"}
            onClick={handleSubmit}
            isDisabled={!errors.email || errors.password}
          />
        </FormControl>
      }
    />
  );
};
export default Login;
