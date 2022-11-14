import { Schema } from "mongoose";

enum Roles {
  Admin = "Admin",
  Student = "Student",
  Tutor = "Tutor",
  ModuleLeader = "ModuleLeader",
  AcademicAdvisor = "AcademicAdvisor",
  CourseLeader = "CourseLeader",
}

export interface IUser {
  email: string;
  password: string;
  role: Roles;
  name?: string;
}

export interface ISession {
  sessionName: string;
  date: string;
}

export const userSchema = new Schema<IUser>({
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export const sessionSchema = new Schema<ISession>({
  sessionName: { type: String, required: true },
  date: { type: String, required: true },
});
