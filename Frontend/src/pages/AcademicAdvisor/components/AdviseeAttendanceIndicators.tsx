import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { useGetOverallAdviseeAttendance } from "../hooks/useGetOverallAdviseeAttendance";

interface Idstring {
  _id: string
}

export const AdviseeAttendanceIndicators = ({_id}: Idstring) => {

    const {isLoading, isError, overallAttendance, refetch} = useGetOverallAdviseeAttendance(_id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>An Error Has Occured</div>;
  }

  return (
    <>
      <h2>{overallAttendance}</h2>
    </>
  );
};
