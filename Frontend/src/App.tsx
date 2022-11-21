import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Home from "./pages/home/Home";
import { RotatingLines } from "react-loader-spinner";
import { useStore } from "./contexts/storeProvider";
import { IUser } from "../types/types";
import { Roles } from "../types/roles";
import CustomError from "./components/CustomError";
const TestUseQuery = lazy(() => import("./pages/testusequery/TestUseQuery"));
const NewSession = lazy(() => import("./pages/newsession/newSession"));
const RegisterNewUser = lazy(() => import("./pages/register/register"));

const App = () => {

  const authStore = useStore();

  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  
  const [routes, setRoutes] = useState<JSX.Element>();

  useEffect(() => {
    setCurrentUser(authStore.auth.user);

    if (currentUser === null) {
      setRoutes(
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterNewUser />} />
          <Route path="*" element={<CustomError errorMessage='first'/>} />
        </Routes>
      );
    } else {
    switch (currentUser?.role) {
      case Roles.Admin:
        setRoutes(
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterNewUser />} />
            <Route path="/test" element={<TestUseQuery />} />
            <Route path="/newsession" element={<NewSession />} />
            <Route path="*" element={<CustomError errorMessage='second'/>} />
          </Routes>
        );
      case Roles.CourseLeader:
        setRoutes(
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterNewUser />} />
            <Route path="/test" element={<TestUseQuery />} />
            <Route path="/newsession" element={<NewSession />} />
            <Route path="*" element={<CustomError errorMessage='third'/>} />
          </Routes>
        );
      case Roles.ModuleLeader:
        setRoutes(
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterNewUser />} />
            <Route path="/test" element={<TestUseQuery />} />
            <Route path="/newsession" element={<NewSession />} />
            <Route path="*" element={<CustomError errorMessage='fourth'/>} />
          </Routes>
        );
      case Roles.AcademicAdvisor:
        setRoutes(
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterNewUser />} />
            <Route path="/test" element={<TestUseQuery />} />
            <Route path="/newsession" element={<NewSession />} />
            <Route path="*" element={<CustomError errorMessage='fifth'/>} />
          </Routes>
        );
      case Roles.Tutor:
        setRoutes(
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterNewUser />} />
            <Route path="/test" element={<TestUseQuery />} />
            <Route path="/newsession" element={<NewSession />} />
            <Route path="*" element={<CustomError errorMessage='sixth'/>} />
          </Routes>
        );
      case Roles.Student:
        setRoutes(
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterNewUser />} />
            <Route path="/test" element={<TestUseQuery />} />
            <Route path="/newsession" element={<NewSession />} />
            <Route path="*" element={<CustomError errorMessage='seventh'/>} />
          </Routes>
        );
    }
    }
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
        {routes}
    </Suspense>
  );
};

export default App;
