import { useToast } from "@chakra-ui/react";

export const useToasts = () => {
  const toast = useToast();
  const onSuccessToast = (title: string, description: string = "") => {
    toast({
      title: title,
      description: description,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const onErrorToast = (title: string, description: string = "") => {
    toast({
      title: title,
      description: description,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };
  const onInfoToast = (title: string, description: string = "") => {
    toast({
      title: title,
      description: description,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };
  return { onSuccessToast, onErrorToast, onInfoToast };
};
