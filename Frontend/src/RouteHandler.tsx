import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Login from "./pages/login/login";
import { RotatingLines } from "react-loader-spinner";
import { useStore } from "./contexts/storeProvider";
import { Roles } from "../types/roles";
import CustomError from "./components/CustomError";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard/TutorDashboard";
import TutorViewAttendance from "./pages/TutorViewAttendance/TutorViewAttendance";
const TestUseQuery = lazy(() => import("./pages/testusequery/TestUseQuery"));
const NewSession = lazy(
  () => import("./pages/StudentDashboard/StudentDashboard")
);
const RegisterNewUser = lazy(() => import("./pages/register/register"));

const RouteHandler = () => {
  const store = useStore();

  const [routes, setRoutes] = useState<JSX.Element>(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RegisterNewUser />} />
      <Route path="*" element={<CustomError errorMessage="Please Log In" />} />
    </Routes>
  );

  useEffect(() => {
    if (store?.auth.user.role === Roles.CourseLeader) {
      setRoutes(
        <Routes>
          <Route path="/" element={<h1>Not Implemented</h1>} />
          <Route path="/courseLeaderViewAttendance" element={<h1>Not Implemented</h1>} />
          <Route
            path="*"
            element={
              <CustomError errorMessage="This route does not exist or you do not have permissions" />
            }
          />
        </Routes>
      );
    }
    if (store?.auth.user.role === Roles.ModuleLeader) {
      setRoutes(
        <Routes>
          <Route path="/" element={<h1>Not Implemented</h1>} />
          <Route path="/moduleLeaderViewAttendance" element={<h1>Not Implemented</h1>} />
          <Route
            path="*"
            element={
              <CustomError errorMessage="This route does not exist or you do not have permissions" />
            }
          />
        </Routes>
      );
    }
    if (store?.auth.user.role === Roles.AcademicAdvisor) {
      setRoutes(
        <Routes>
          <Route path="/" element={<h1>Not Implemented</h1>} />
          <Route path="/academicAdvisorViewAttendance" element={<h1>Not Implemented</h1>} />
          <Route
            path="*"
            element={
              <CustomError errorMessage="This route does not exist or you do not have permissions" />
            }
          />
        </Routes>
      );
    }
    if (store?.auth.user.role === Roles.Tutor) {
      setRoutes(
        <Routes>
          <Route path="/" element={<TutorDashboard />} />
          <Route
            path="/tutorviewattendance"
            element={<TutorViewAttendance />}
          />
          <Route
            path="*"
            element={
              <CustomError errorMessage="This route does not exist or you do not have permissions" />
            }
          />
        </Routes>
      );
    }
    if (store?.auth.user.role === Roles.Student) {
      setRoutes(
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/studentattendance" element={<h1>Not Implemented</h1>} />

          <Route
            path="*"
            element={
              <CustomError errorMessage="This route does not exist or you do not have permissions" />
            }
          />
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
