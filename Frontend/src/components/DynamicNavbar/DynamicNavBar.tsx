import {
  HiOutlineCalendar,
  HiOutlineBookOpen,
  HiOutlineLogin,
} from "react-icons/hi";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavbarItems {
  label: string;
  icon: ReactNode;
}

interface IDynamicNavBar {
  role: string;
}
export const DynamicNavBar = ({ role }: IDynamicNavBar) => {
  const StudentNavbar: NavbarItems[] = [
    {
      label: "Join Session",
      icon: <HiOutlineCalendar size="40" />,
    },
    {
      label: "View Attendance",
      icon: <HiOutlineBookOpen size="40" />,
    },
  ];

  const TutorNavbar: NavbarItems[] = [
    {
      label: "Start Session",
      icon: <HiOutlineCalendar size="40" />,
    },
    {
      label: "View Attendance",
      icon: <HiOutlineBookOpen size="40" />,
    },
  ];

  return (
    <VStack>
      <Flex width="full" alignItems={"center"} direction="column" gap={10}>
        {role === "Student" &&
          StudentNavbar.map((item: NavbarItems, key: number) => (
            <VStack key={key} cursor="pointer">
              {item.icon}
              <Text width="100px" align="center" fontSize={"sm"}>
                {item.label}
              </Text>
            </VStack>
          ))}

        {role === "Tutor" &&
          TutorNavbar.map((item: NavbarItems, key: number) => (
            <VStack key={key} cursor="pointer">
              {item.icon}
              <Text width="100px" align="center" fontSize={"sm"}>
                {item.label}
              </Text>
            </VStack>
          ))}
        <VStack cursor="pointer">
          <HiOutlineLogin size="50" />
          <Text width="100px" align="center" fontSize={"sm"}>
            Log out
          </Text>
        </VStack>
      </Flex>
    </VStack>
  );
};
