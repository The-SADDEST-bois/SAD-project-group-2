import {
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

interface IAccordionData {
  moduleName: string;
  startDate: Date;
  endDate: Date;
}

export const AccordionData = ({
  moduleName,
  startDate,
  endDate,
}: IAccordionData) => {
  return (
    <>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {moduleName}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>HELLO WORLD</AccordionPanel>
    </>
  );
};

export default AccordionData;
