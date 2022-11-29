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

export const IsTutorRole = (request: string) => {
  const role = GetRoleFromRequest(request);
  return role === Roles.Tutor;
};

export const IsAdvisorRole = (request: string) => {
  const role = GetRoleFromRequest(request);
  return role === Roles.AcademicAdvisor;
};

export const IsCourseLeaderRole = (request: string) => {
  const role = GetRoleFromRequest(request);
  return role === Roles.CourseLeader;
};

export const IsModuleLeaderRole = (request: string) => {
  const role = GetRoleFromRequest(request);
  return role === Roles.ModuleLeader;
};

export const HighPriviledgesRole = (request: string) => {
  const role = GetRoleFromRequest(request);
  return role === Roles.Tutor || role === Roles.CourseLeader || role === Roles.ModuleLeader;
};

export const MediumPriviledgesRole = (request: string) => {
  const role = GetRoleFromRequest(request);
  return role === Roles.Tutor || role === Roles.ModuleLeader;
};

export const LowPriviledgesRole = (request: string) => {
  const role = GetRoleFromRequest(request);
  return role === Roles.Tutor;
}