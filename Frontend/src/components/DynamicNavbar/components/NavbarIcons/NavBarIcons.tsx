import { Text, VStack } from "@chakra-ui/react";

import { INavBarIcons, NavbarItems } from "../../../../../types/types";

const NavBarIcons = ({
  NavBarType,
  handleNavigate,
}: INavBarIcons): JSX.Element => {
  return (
    <>
      {NavBarType.map((item: NavbarItems, key: number) => (
        <VStack
          key={key}
          cursor="pointer"
          onClick={() => handleNavigate(item?.url)}
        >
          {item.icon}
          <Text width="100px" align="center" fontSize={"sm"}>
            {item.label}
          </Text>
        </VStack>
      ))}
    </>
  );
};

export default NavBarIcons;
