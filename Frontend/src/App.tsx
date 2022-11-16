import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, ReactNode, Suspense, useEffect, useState } from "react";
import Home from "./pages/home/Home";
import { RotatingLines } from "react-loader-spinner";
import { useStore } from "./contexts/storeProvider";
import { IUser } from '../types/types';
import { Roles } from '../types/roles';
const TestUseQuery = lazy(() => import("./pages/testusequery/TestUseQuery"));
const NewSession = lazy(() => import("./pages/newsession/newSession"));
const RegisterNewUser = lazy(() => import("./pages/register/register"));

const App = () => {

  const authStore = useStore();

  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    setCurrentUser(authStore.auth.user);
  }, [authStore.auth.user]);

  return (
      <Suspense
        fallback={
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterNewUser />} />
          <Route path="/TestUseQuery" element={<TestUseQuery/>} />
          <Route path="/NewSession" element={<NewSession />} />
        </Routes>
      </Suspense>
  );
};

export default App;
