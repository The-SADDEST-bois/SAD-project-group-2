import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Login from "./pages/login/login";
import { RotatingLines } from "react-loader-spinner";
import { useStore } from "./contexts/storeProvider";
import { Roles } from "../types/roles";
import CustomError from "./components/CustomError";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
const TestUseQuery = lazy(() => import("./pages/testusequery/TestUseQuery"));
const NewSession = lazy(
  () => import("./pages/StudentDashboard/StudentDashboard")
);
const RegisterNewUser = lazy(() => import("./pages/register/register"));

const RouteHandler = () => {
  const store = useStore();

  const [routes, setRoutes] = useState<JSX.Element>();

  useEffect(() => {
    if (store.auth.user === null || store.auth.user === undefined) {
      setRoutes(
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterNewUser />} />
          <Route path="*" element={<CustomError errorMessage="first" />} />
        </Routes>
      );
      return;
    }
    if (store?.auth.user.role == Roles.Admin) {
      setRoutes(
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterNewUser />} />
          <Route path="/test" element={<TestUseQuery />} />
          <Route path="/newsession" element={<NewSession />} />
          <Route path="*" element={<CustomError errorMessage="second" />} />
        </Routes>
      );
    }
    if (store?.auth.user.role == Roles.CourseLeader) {
      setRoutes(
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterNewUser />} />
          <Route path="/test" element={<TestUseQuery />} />
          <Route path="/newsession" element={<NewSession />} />
          <Route path="*" element={<CustomError errorMessage="third" />} />
        </Routes>
      );
    }
    if (store?.auth.user.role == Roles.ModuleLeader) {
      setRoutes(
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterNewUser />} />
          <Route path="/test" element={<TestUseQuery />} />
          <Route path="/newsession" element={<NewSession />} />
          <Route path="*" element={<CustomError errorMessage="fourth" />} />
        </Routes>
      );
    }
    if (store?.auth.user.role == Roles.AcademicAdvisor) {
      setRoutes(
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterNewUser />} />
          <Route path="/test" element={<TestUseQuery />} />
          <Route path="/newsession" element={<NewSession />} />
          <Route path="*" element={<CustomError errorMessage="fifth" />} />
        </Routes>
      );
    }
    if (store?.auth.user.role == Roles.Tutor) {
      setRoutes(
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterNewUser />} />
          <Route path="/test" element={<TestUseQuery />} />
          <Route path="/newsession" element={<NewSession />} />
          <Route path="*" element={<CustomError errorMessage="sixth" />} />
        </Routes>
      );
    }
    if (store?.auth.user.role == Roles.Student) {
      setRoutes(
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterNewUser />} />
          <Route path="/test" element={<TestUseQuery />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />

          <Route path="*" element={<CustomError errorMessage="seventh" />} />
        </Routes>
      );
    }
  }, [store.auth.user]);

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

export default RouteHandler;
