import { Roles } from "../Types/Roles";

export const IsStudentRole = (actualRole: string) => {
  return actualRole === Roles.Student;
};

export const IsAdminRole = (actualRole: string) => {
  return actualRole === Roles.Admin;
};

export const IsTutorRole = (actualRole: string) => {
  return actualRole === Roles.Tutor;
};

export const IsAdvisorRole = (actualRole: string) => {
  return actualRole === Roles.AcademicAdvisor;
};

export const IsCourseLeaderRole = (actualRole: string) => {
  return actualRole === Roles.CourseLeader;
};

export const IsModuleLeaderRole = (actualRole: string) => {
  return actualRole === Roles.ModuleLeader;
};
