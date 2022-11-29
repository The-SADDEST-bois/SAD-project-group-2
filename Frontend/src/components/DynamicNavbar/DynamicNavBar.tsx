import { HiOutlineLogin } from "react-icons/hi";
import { Flex, Text, VStack } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToasts } from "../../hooks/useToasts/useToasts";
import {
  StudentNavbar,
  TutorNavbar,
  ModuleLeaderNavbar,
  CourseLeaderNavbar,
  AcademicAdvisorNavbar,
} from "./data/NavbarItems";
import NavBarIcons from "./components/NavbarIcons/NavBarIcons";
import { useStore } from "../../contexts/storeProvider";

// TODO add url to navbar items and pass navigate

interface IDynamicNavBar {
  role: string;
}
export const DynamicNavBar = ({ role }: IDynamicNavBar) => {
  const store = useStore();
  const navigate = useNavigate();
  const { onSuccessToast, onErrorToast } = useToasts();

  const handleNavigate = (url: string) => {
    navigate(url);
  };

  const handleLogout = () => {
    try {
      store.auth.logout();
      navigate("/");
      onSuccessToast("Logged Out Succesfully");
    } catch (err) {
      onErrorToast("Problem Loggin Out", `${err}`);
    }
  };

  return (
    <VStack>
      <Flex width="full" alignItems={"center"} direction="column" gap={10}>
        <Text fontWeight={"bold"}>
          {store.staticTime.Date.toLocaleDateString()}
        </Text>
        {role === "Student" &&
          NavBarIcons({ NavBarType: StudentNavbar, handleNavigate })}
        {role === "Tutor" &&
          NavBarIcons({ NavBarType: TutorNavbar, handleNavigate })}
        {role === "ModuleLeader" &&
          NavBarIcons({ NavBarType: ModuleLeaderNavbar, handleNavigate })}
        {role === "AcademicAdvisor" &&
          NavBarIcons({ NavBarType: AcademicAdvisorNavbar, handleNavigate })}
        {role === "CourseLeader" &&
          NavBarIcons({ NavBarType: CourseLeaderNavbar, handleNavigate })}

        <VStack cursor="pointer" onClick={() => handleLogout()}>
          <HiOutlineLogin size="50" />
          <Text width="100px" align="center" fontSize={"sm"}>
            Log out
          </Text>
        </VStack>
      </Flex>
    </VStack>
  );
};
