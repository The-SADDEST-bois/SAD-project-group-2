import { Button } from "@chakra-ui/react";

interface IStyledButton {
  buttonText: string;
  onClick: () => void;
  isDisabled?: boolean;
}

export const StyledButton = ({
  buttonText,
  onClick,
  ...props
}: IStyledButton) => {
  return (
    <Button
      onClick={onClick}
      width="full"
      background="#17BEBB"
      _hover={{ bg: "#58edea" }}
      {...props}
    >
      {buttonText}
    </Button>
  );
};
