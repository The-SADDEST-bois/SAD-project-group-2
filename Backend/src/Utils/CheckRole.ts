import { Roles } from "../Types/Roles";
import { GetRoleFromRequest } from "./RequestFormatter";

export const IsStudentRole = (request: string) => {
  const role = GetRoleFromRequest(request);
  return role === Roles.Student;
};

export const IsAdminRole = (request: string) => {
  const role = GetRoleFromRequest(request);
  return role === Roles.Admin;
};

export const IsAdvisorRole = (request: string) => {
  const role = GetRoleFromRequest(request);
  return role === Roles.AcademicAdvisor;
};

export const IsTutorRole = (request: string) => {
  const role = GetRoleFromRequest(request);
  return role === Roles.Tutor || role === Roles.ModuleLeader || role === Roles.CourseLeader || role === Roles.AcademicAdvisor;
};

export const IsModuleLeaderRole = (request: string) => {
  const role = GetRoleFromRequest(request);
  return role === Roles.ModuleLeader || role === Roles.CourseLeader;
};

export const IsCourseLeaderRole = (request: string) => {
  const role = GetRoleFromRequest(request);
  return role === Roles.CourseLeader;
}