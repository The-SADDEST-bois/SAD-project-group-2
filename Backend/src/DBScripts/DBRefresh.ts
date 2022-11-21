import Users from "../Models/User";
import { IUser } from "../Interfaces/IUser";
import bcrypt from "bcrypt";
import { Roles } from "../Types/Roles";
import AcademicAdvisor from "../Models/AcademicAdvisor";
import Cohorts from "../Models/Cohort";
import { ICohort } from "../Interfaces/ICohort";
import Sessions from "../Models/Session";
import { ISession } from "../Interfaces/ISession";
import mongoose from "mongoose";

const DropCollections = async () => {
  await Users.collection.drop().catch((err) => {
    console.log("Users collection does not exist");
  });
  console.log("Users collection dropped");
  await AcademicAdvisor.collection.drop().catch((err) => {
    console.log("AcademicAdvisor collection does not exist");
  });
  console.log("AcademicAdvisor collection dropped");
};

const SetUp = async () => {
  console.log("Connecting to database");
  await mongoose.connect("mongodb://localhost:27017/data");
  console.log("Connected to database");
};

const CreateUsers = async () => {
  const salt = await bcrypt.genSalt(10);
  // Create Users to be added to the database
  const users: IUser[] = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.CourseLeader,
    },
    {
      firstName: "Jane",
      lastName: "Kane",
      email: "janekane@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.ModuleLeader,
    },
    {
      firstName: "George",
      lastName: " Porgy",
      email: "georgeporgy@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Tutor,
    },
    {
      firstName: "Petrucia",
      lastName: "Petrova",
      email: "petrucia@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.AcademicAdvisor,
    },
    {
      firstName: "Joe",
      lastName: "Bloggs",
      email: "joebloggs@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Toby",
      lastName: "Larone",
      email: "tobylarone@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Jeff",
      lastName: "Moon",
      email: "jeffmoon@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Chris",
      lastName: "Bacon",
      email: "chrisbacon@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Igor",
      lastName: "Karkaroff",
      email: "igor@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Fiona",
      lastName: "Apple",
      email: "fionaapple@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Liam",
      lastName: "Lennon",
      email: "liamlennon@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Paul",
      lastName: "Blart",
      email: "paulblart@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Darcy",
      lastName: "Doe",
      email: "darcydoe@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
  ];
  // add each user to the database
  users.forEach(async (user) => {
    await Users.create(user);
  });
  console.log("Users created");
};

const Break = async () => {
  await delay(1000);
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const CreateAcademicAdvisors = async () => {
  // Create AcademicAdvisor document to be added to the database
  const studentIds = await Users.find({ role: Roles.Student })
    .select("_id")
    .limit(5);

  const advisorId = await Users.findOne({ role: Roles.AcademicAdvisor }).select(
    "_id"
  );

  const academicAdvisors = [
    {
      advisees: studentIds,
      advisorId: advisorId,
    },
  ];
  // add each AcademicAdvisor document to the database
  academicAdvisors.forEach(async (academicAdvisor) => {
    await AcademicAdvisor.create(academicAdvisor);
  });

  console.log("AcademicAdvisors created");
};

const main = async () => {
  await SetUp();
  await DropCollections();
  await CreateUsers();
  await Break();
  await CreateAcademicAdvisors();
  console.log("Database seeded");
};

main();
