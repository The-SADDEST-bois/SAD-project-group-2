import { Button, Center, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useMutation, useQuery } from "react-query";
import { getOverallCohortAttendance } from "../../../api/moduleLeaderApi/moduleLeaderApi";
import {
  getAllSessionsApi,
  setSessionOpen,
} from "../../../api/sessionApi/sessionApi";
import { ISession } from "../../../types/types";
import { useStore } from "../../contexts/storeProvider";

const TestUseQuery = () => {
  const store = useStore();

  const cohort = "Software Engineering";
  const moduleName = "Human Factors";
  const handleSubmit = () => {
    getOverallCohortAttendance(cohort, moduleName);
  };

  return (
    <VStack>
      <h1>{store.auth.user.firstName}</h1>
      <h2>{store.staticTime.Date.toLocaleDateString()}</h2>
      <Button onClick={handleSubmit}></Button>
    </VStack>
  );
};
export default TestUseQuery;
