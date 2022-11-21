import Users from "../Models/User";
import { IUser } from "../Interfaces/IUser";
import bcrypt from "bcrypt";
import { Roles } from "../Types/Roles";
import AcademicAdvisor from "../Models/AcademicAdvisor";
import Cohorts from "../Models/Cohort";
import Sessions from "../Models/Session";
import { SessionTypes } from "../Utils/SessionTypes";
import Modules from "../Models/Module";
import AttendanceRegisters from "../Models/AttendanceRegister";
import mongoose from "mongoose";
import AttendanceRegister from "../Models/AttendanceRegister";
import Courses from "../Models/Course";

const DropCollections = async () => {
  await Users.collection.drop().catch((err) => {
    console.log("Users collection does not exist");
  });
  console.log("Users collection dropped");
  await AcademicAdvisor.collection.drop().catch((err) => {
    console.log("AcademicAdvisor collection does not exist");
  });
  console.log("AcademicAdvisor collection dropped");
  await Sessions.collection.drop().catch((err) => {
    console.log("Sessions collection does not exist");
  });
  console.log("Sessions collection dropped");
  await Modules.collection.drop().catch((err) => {
    console.log("Modules collection does not exist");
  });
  console.log("Modules collection dropped");
  await AttendanceRegisters.collection.drop().catch((err) => {
    console.log("AttendanceRegisters collection does not exist");
  });
  console.log("AttendanceRegisters collection dropped");
  await Courses.collection.drop().catch((err) => {
    console.log("Courses collection does not exist");
  });
  console.log("Courses collection dropped");
  await Cohorts.collection.drop().catch((err) => {
    console.log("Cohorts collection does not exist");
  });
  console.log("Cohorts collection dropped");
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
  const students = await Users.find({ role: Roles.Student })
    .select("_id firstName lastName")
    .limit(5);

  const advisorId = await Users.findOne({ role: Roles.AcademicAdvisor }).select(
    "_id"
  );

  const academicAdvisors = [
    {
      advisees: students,
      advisorId: advisorId,
    },
  ];
  // add each AcademicAdvisor document to the database
  academicAdvisors.forEach(async (academicAdvisor) => {
    await AcademicAdvisor.create(academicAdvisor);
  });

  console.log("AcademicAdvisors created");
};

const CreateSessions = async () => {
  // Create Sessions to be added to the database
  const tutor = await Users.findOne({ role: Roles.Tutor });

  const sessions = [
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "324512",
      tutor: {
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        tutorId: tutor._id,
      },
      startTime: new Date("2022/09/25 14:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "594212",
      tutor: {
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        tutorId: tutor._id,
      },
      startTime: new Date("2022/10/02 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "974231",
      tutor: {
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        tutorId: tutor._id,
      },
      startTime: new Date("2022/10/09 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "092347",
      tutor: {
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        tutorId: tutor._id,
      },
      startTime: new Date("2022/10/16 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "980129",
      tutor: {
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        tutorId: tutor._id,
      },
      startTime: new Date("2022/10/23 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "409328",
      tutor: {
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        tutorId: tutor._id,
      },
      startTime: new Date("2022/10/30 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "230498",
      tutor: {
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        tutorId: tutor._id,
      },
      startTime: new Date("2022/11/06 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "473289",
      tutor: {
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        tutorId: tutor._id,
      },
      startTime: new Date("2022/11/13 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "120932",
      tutor: {
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        tutorId: tutor._id,
      },
      startTime: new Date("2022/11/20 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "123892",
      tutor: {
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        tutorId: tutor._id,
      },
      startTime: new Date("2022/11/27 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "984523",
      tutor: {
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        tutorId: tutor._id,
      },
      startTime: new Date("2022/12/01 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "120398",
      tutor: {
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        tutorId: tutor._id,
      },
      startTime: new Date("2022/12/8 16:00"),
      duration: 120,
      isOpen: false,
    },
  ];
  // add each Session to the database
  await Sessions.create(sessions);
  console.log("Sessions created");
};

const CreateModules = async () => {
  // Create Modules to be added to the database
  const moduleLeader = await Users.findOne({ role: Roles.ModuleLeader });
  const tutor = await Users.findOne({ role: Roles.Tutor });
  const sessionIds = await Sessions.find().select("_id");

  const modules = [
    {
      moduleName: "Software Architecture",
      moduleLeader: {
        firstName: moduleLeader.firstName,
        lastName: moduleLeader.lastName,
        moduleLeaderId: moduleLeader._id,
      },
      tutors: [
        {
          firstName: tutor.firstName,
          lastName: tutor.lastName,
          tutorId: tutor._id,
        },
      ],
      sessions: sessionIds,
    },
  ];

  // add each Module to the database
  await Modules.create(modules);
};

const CreateAttendanceRegister = async () => {
  // Create AttendanceRegister to be added to the database
  const sessionIds = await Sessions.find().select("_id");

  const students = await Users.find({ role: Roles.Student }).select(
    "_id firstName lastName"
  );

  const registers = CreateRegisterSessions(sessionIds, students);

  // add each AttendanceRegister to the database
  await AttendanceRegister.create(registers);

  console.log("AttendanceRegister created");
};

const CreateRegisterSessions = (sessionIds: any, students: any) => {
  var registers: { sessionID: any; attendance: any }[] = [];
  sessionIds.forEach((id: any) => {
    registers.push({
      sessionID: id,
      attendance: students,
    });
  });
  return registers;
};

const CreateCohorts = async () => {
  // Create Cohorts to be added to the database
  const studentsInSoftwareEngineering = await Courses.find({
    courseName: "Software Engineering",
  }).select("students");

  const courseIdForSoftwareEngineering = await Courses.findOne({
    courseName: "Software Engineering",
  }).select("_id");

  const cohorts = [
    {
      courseId: courseIdForSoftwareEngineering._id,
      students: studentsInSoftwareEngineering[0].students,
    },
  ];

  // add each Cohort to the database
  await Cohorts.create(cohorts);
  console.log("Cohorts created");
};

const CreateCourses = async () => {
  // Create Courses to be added to the database
  const modules = await Modules.find({
    moduleName: "Software Architecture",
  }).select("_id moduleName");

  const students = await Users.find({ role: Roles.Student }).select(
    "_id firstName lastName"
  );

  const courseLeader = await Users.findOne({ role: Roles.CourseLeader });

  const courses = [
    {
      courseName: "Software Engineering",
      courseLeader: {
        firstName: courseLeader.firstName,
        lastName: courseLeader.lastName,
        _id: courseLeader._id,
      },
      students: students,
      modules: modules,
    },
  ];

  // add each Course to the database
  await Courses.create(courses);
  console.log("Courses created");
};

const main = async () => {
  await SetUp();
  await DropCollections();
  await CreateUsers();
  await Break();
  await CreateAcademicAdvisors();
  await CreateSessions();
  await Break();
  await CreateModules();
  await Break();
  await CreateAttendanceRegister();
  await Break();
  await CreateCourses();
  await Break();
  await CreateCohorts();
  await Break().then(process.exit());
  console.log("Database seeded");
};

main();
