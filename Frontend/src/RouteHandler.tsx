import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Login from "./pages/login/login";
import { RotatingLines } from "react-loader-spinner";
import { useStore } from "./contexts/storeProvider";
import { Roles } from "../types/roles";
import CustomError from "./components/CustomError";
import TutorDashboard from "./pages/TutorDashboard/TutorDashboard";
const TutorViewAttendance = lazy(
  () => import("./pages/TutorViewAttendance/TutorViewAttendance")
);
const ModuleLeaderAttendance = lazy(
  () => import("./pages/ModuleLeaderAttendance/ModuleLeaderAttendance")
);
const CourseLeaderAttendance = lazy(
  () => import("./pages/CourseLeaderAttendance/CourseLeaderAttendance")
);
const StudentDashboard = lazy(
  () => import("./pages/StudentDashboard/StudentDashboard")
);
const RegisterNewUser = lazy(() => import("./pages/register/register"));
const AcademicAdvisorAttendance = lazy(
  () => import("./pages/AcademicAdvisor/AcademicAdvisorAttendance")
);

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
          <Route path="/" element={<TutorDashboard />} />
          <Route
            path="/tutorviewattendance"
            element={<TutorViewAttendance />}
          />
          <Route
            path="/moduleLeaderAttendance"
            element={<ModuleLeaderAttendance />}
          />
          <Route
            path="/courseleaderattendance"
            element={<CourseLeaderAttendance />}
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
    if (store?.auth.user.role === Roles.ModuleLeader) {
      setRoutes(
        <Routes>
          <Route path="/" element={<TutorDashboard />} />
          <Route
            path="/tutorviewattendance"
            element={<TutorViewAttendance />}
          />
          <Route
            path="/moduleLeaderAttendance"
            element={<ModuleLeaderAttendance />}
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
    if (store?.auth.user.role === Roles.AcademicAdvisor) {
      setRoutes(
        <Routes>
          <Route path="/" element={<TutorDashboard />} />
          <Route
            path="/tutorviewattendance"
            element={<TutorViewAttendance />}
          />
          <Route
            path="/academicAdvisorViewAttendance"
            element={<AcademicAdvisorAttendance />}
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
          <Route
            path="*"
            element={
              <CustomError errorMessage="This route does not exist or you do not have permissions" />
            }
          />
        </Routes>
      );
    }

    if (!store?.auth.user.role) {
      setRoutes(
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterNewUser />} />
          <Route
            path="*"
            element={<CustomError errorMessage="Please Log In" />}
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
