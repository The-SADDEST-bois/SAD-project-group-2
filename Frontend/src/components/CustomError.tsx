import { Center, HStack, VStack } from "@chakra-ui/react"

interface Props {
  errorMessage: String;
}

const CustomError = (props: Props) => {
  return (
    <Center h='100vh'>
      <h1>{props.errorMessage}</h1>
    </Center>
  )
}
export default CustomError