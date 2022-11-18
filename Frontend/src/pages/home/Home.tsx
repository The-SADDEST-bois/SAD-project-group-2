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
import { UserName } from "../../components/UserName";
import LoginPageTemplate from "../../components/LoginPageTemplate/LoginPageTemplate";

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
    if (authStore) {
      authStore.auth.login(data.data.other as IUser);
      navigate("/NewSession");
    } else {
      console.log("authStore is null");
    }
  };

  const handleSubmit = () => {
    mutation.mutate(credentials, {
      onSuccess: (data) => {
        //console.table(data.data.other);
        setAuthStore(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <LoginPageTemplate
      leftSection={<></>}
      height="200px"
      rightSection={
        <>
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

          <Button
            onClick={handleSubmit}
            width="full"
            background="#17BEBB"
            _hover={{ bg: "#58edea" }}
          >
            Submit
          </Button>
          <Link to="/newSession">New Session</Link>
        </>
      }
    />
  );
};
export default Home;
