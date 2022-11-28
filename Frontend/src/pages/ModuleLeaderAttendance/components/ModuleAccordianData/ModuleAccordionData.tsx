import { AccordionPanel, HStack, Text, VStack } from "@chakra-ui/react";
import { isError } from "react-query";

import { ICohort } from "../../../../../types/types";
import {
  useGetModuleAttendanceByCohort,
} from "../../hooks/useGetModuleAttendanceByCohort/useGetModuleAttendanceByCohort";

interface IModuleAccordionData {
  cohortName: string;
}

export const ModuleAccordionData = ({ cohortName }: IModuleAccordionData) => {
  const { isLoading, isError, overallAttendancePercent, refetch } = useGetModuleAttendanceByCohort(
    {cohortName}
  );

  return (
    <>
      {!isLoading && !isError && overallAttendancePercent && (
      <h1>{cohortName + ":" + overallAttendancePercent+"%"}</h1>
      )}
    </>
  );
};
