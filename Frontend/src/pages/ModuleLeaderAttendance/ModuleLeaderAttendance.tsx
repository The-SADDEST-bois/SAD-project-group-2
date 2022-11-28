import React from "react";
import { DynamicNavBar } from "../../components/DynamicNavbar/DynamicNavBar";
import { PageWithSideBar } from "../../components/PageWithSideBar/PageWithSideBar";
import { useStore } from "../../contexts/storeProvider";

export const ModuleLeaderAttendance = () => {
  const store = useStore();

  return (
    <PageWithSideBar
      leftSection={<DynamicNavBar role={store?.auth?.user?.role as string} />}
      rightSection={<>MODULE</>}
    />
  );
};
