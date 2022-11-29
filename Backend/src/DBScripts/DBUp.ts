import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Roles } from "../Types/Roles";
import { SessionTypes } from "../Utils/SessionTypes";
import { IUser } from "../Interfaces/IUser";
import Users from "../Models/User";
import AcademicAdvisor from "../Models/AcademicAdvisor";
import Cohorts from "../Models/Cohort";
import Sessions from "../Models/Session";
import Modules from "../Models/Module";
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
      firstName: "Mike",
      lastName: "Wazowski",
      email: "mike@uni.com",
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
      firstName: "Gary",
      lastName: "Busey",
      email: "garyb@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.ModuleLeader,
    },
    {
      firstName: "Moddy",
      lastName: "Mod",
      email: "moddy@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.ModuleLeader,
    },
    {
      firstName: "Irene",
      lastName: "Graham",
      email: "irene@uni.com",
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
    {
      firstName: "Percy",
      lastName: "Pig",
      email: "percy@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "David",
      lastName: "Ruffin",
      email: "david@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Sally",
      lastName: "Zimmerman",
      email: "sally@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Ricky",
      lastName: "Martin",
      email: "ricky@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Amanda",
      lastName: "Fernandez",
      email: "amanda@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Oliver",
      lastName: "Kahn",
      email: "oliver@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Yvonne",
      lastName: "Ivanova",
      email: "yvonne@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Greg",
      lastName: "Rutherford",
      email: "greg@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Quentin",
      lastName: "Parker",
      email: "quentin@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Hannah",
      lastName: "Smith",
      email: "hannah@uni.com",
      password: await bcrypt.hash("password", salt),
      role: Roles.Student,
    },
    {
      firstName: "Terrance",
      lastName: "Avery",
      email: "terrance@uni.com",
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

const CreateCourses = async () => {
  // Create Courses to be added to the database
  const students = await Users.find({ role: Roles.Student }).select(
    "_id firstName lastName"
  );

  const firstHalf = students.slice(0, 10);
  const secondHalf = students.slice(10, 20);

  const courseLeaders = await Users.find({ role: Roles.CourseLeader });

  const courses = [
    {
      courseName: "Software Engineering",
      courseLeader: {
        firstName: courseLeaders[0].firstName,
        lastName: courseLeaders[0].lastName,
        _id: courseLeaders[0]._id,
      },
      students: firstHalf,
    },
    {
      courseName: "Computer Science",
      courseLeader: {
        firstName: courseLeaders[1].firstName,
        lastName: courseLeaders[1].lastName,
        _id: courseLeaders[1]._id,
      },
      students: secondHalf,
    },
  ];

  // add each Course to the database
  await Courses.create(courses);
  console.log("Courses created");
};
const CreateCohorts = async () => {
  // Create Cohorts to be added to the database
  const studentsFromCourses = await Courses.find().select("students");
  const courseIds = await Courses.find().select("_id");

  const cohorts = [
    {
      courseId: courseIds[0]._id,
      students: studentsFromCourses[0].students,
    },
    {
      courseId: courseIds[1]._id,
      students: studentsFromCourses[1].students,
    },
  ];

  // add each Cohort to the database
  await Cohorts.create(cohorts);
  console.log("Cohorts created");
};
const CreateModules = async () => {
  // Create Modules to be added to the database
  const moduleLeader = await Users.find({ role: Roles.ModuleLeader });
  const tutor = await Users.findOne({ role: Roles.Tutor });
  const softwareEngineeringCourse = await Courses.findOne({
    courseName: "Software Engineering",
  });
  const softwareEngineeringCohortId = await Cohorts.findOne({
    courseId: softwareEngineeringCourse._id,
  }).select("_id");
  const computerScienceCourse = await Courses.findOne({
    courseName: "Computer Science",
  });
  const computerScienceCohortId = await Cohorts.findOne({
    courseId: computerScienceCourse._id,
  }).select("_id");

  const compSciCourseLeader = await Users.findById(
    computerScienceCourse.courseLeader._id
  );

  const modules = [
    {
      moduleName: "Software Architecture",
      moduleLeader: {
        firstName: moduleLeader[0].firstName,
        lastName: moduleLeader[0].lastName,
        moduleLeaderId: moduleLeader[0]._id,
      },
      tutors: [
        {
          firstName: tutor.firstName,
          lastName: tutor.lastName,
          tutorId: tutor._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohortId._id,
          courseName: softwareEngineeringCourse.courseName,
        },
      ],
    },
    {
      moduleName: "Data Structures",
      moduleLeader: {
        firstName: moduleLeader[1].firstName,
        lastName: moduleLeader[1].lastName,
        moduleLeaderId: moduleLeader[1]._id,
      },
      tutors: [
        {
          firstName: compSciCourseLeader.firstName,
          lastName: compSciCourseLeader.lastName,
          tutorId: compSciCourseLeader._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohortId._id,
          courseName: computerScienceCourse.courseName,
        },
      ],
    },
    {
      moduleName: "Human Factors",
      moduleLeader: {
        firstName: moduleLeader[2].firstName,
        lastName: moduleLeader[2].lastName,
        moduleLeaderId: moduleLeader[2]._id,
      },
      tutors: [
        {
          firstName: tutor.firstName,
          lastName: tutor.lastName,
          tutorId: tutor._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohortId._id,
          courseName: softwareEngineeringCourse.courseName,
        },
        {
          cohortId: computerScienceCohortId._id,
          courseName: computerScienceCourse.courseName,
        },
      ],
    },
    {
      moduleName: "Systems Analysis",
      moduleLeader: {
        firstName: moduleLeader[3].firstName,
        lastName: moduleLeader[3].lastName,
        moduleLeaderId: moduleLeader[3]._id,
      },
      tutors: [
        {
          firstName: moduleLeader[3].firstName,
          lastName: moduleLeader[3].lastName,
          tutorId: moduleLeader[3]._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohortId._id,
          courseName: softwareEngineeringCourse.courseName,
        },
        {
          cohortId: computerScienceCohortId._id,
          courseName: computerScienceCourse.courseName,
        },
      ],
    },
  ];

  // add each Module to the database
  await Modules.create(modules);
  console.log("Modules created");

  var modulesForSoftwareEngineering = await Modules.find({
    "cohorts.courseName": "Software Engineering",
  }).select("moduleName _id");

  var modulesForComputerScience = await Modules.find({
    "cohorts.courseName": "Computer Science",
  }).select("moduleName _id");

  // add eache Module to courses
  await Courses.findOneAndUpdate(
    { courseName: "Software Engineering" },
    {
      $set: {
        modules: modulesForSoftwareEngineering,
      },
    }
  );
  await Courses.findOneAndUpdate(
    { courseName: "Computer Science" },
    {
      $set: {
        modules: modulesForComputerScience,
      },
    }
  );

  console.log("Modules added to courses");
};

const CreateSessions = async () => {
  // Create Sessions to be added to the database
  const softwareEng = await Courses.findOne({
    courseName: "Software Engineering",
  });
  const computerScience = await Courses.findOne({
    courseName: "Computer Science",
  });
  const softwareEngineeringCohort = await Cohorts.findOne({
    courseId: softwareEng._id,
  });
  const computerScienceCohort = await Cohorts.findOne({
    courseId: computerScience._id,
  });
  const softwareEngStudents = softwareEngineeringCohort.students;
  const computerScienceStudents = computerScienceCohort.students;
  const firstHalfOfSoftwareEngStudents = softwareEngStudents.slice(0, 5);
  const secondHalfOfComputerScienceStudents = computerScienceStudents.slice(5);
  const mixedGroupOfStudents = firstHalfOfSoftwareEngStudents.concat(
    secondHalfOfComputerScienceStudents
  );
  const dataStructures = await Modules.findOne({
    moduleName: "Data Structures",
  });
  const humanFactors = await Modules.findOne({
    moduleName: "Human Factors",
  });
  const systemsAnalysis = await Modules.findOne({
    moduleName: "Systems Analysis",
  });
  const softwareArchitecture = await Modules.findOne({
    moduleName: "Software Architecture",
  });

  const sessions = [
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "324512",
      moduleName: "Software Architecture",
      tutor: {
        firstName: softwareArchitecture.tutors[0].firstName,
        lastName: softwareArchitecture.tutors[0].lastName,
        tutorId: softwareArchitecture.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: softwareEngStudents,
      startDate: new Date("2022/09/25"),
      startTime: new Date("2022/09/25 14:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "594212",
      moduleName: "Software Architecture",
      tutor: {
        firstName: softwareArchitecture.tutors[0].firstName,
        lastName: softwareArchitecture.tutors[0].lastName,
        tutorId: softwareArchitecture.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: softwareEngStudents,
      startDate: new Date("2022/10/02"),
      startTime: new Date("2022/10/02 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "974231",
      moduleName: "Software Architecture",
      tutor: {
        firstName: softwareArchitecture.tutors[0].firstName,
        lastName: softwareArchitecture.tutors[0].lastName,
        tutorId: softwareArchitecture.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: softwareEngStudents,
      startDate: new Date("2022/10/09"),
      startTime: new Date("2022/10/09 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "092347",
      moduleName: "Software Architecture",
      tutor: {
        firstName: softwareArchitecture.tutors[0].firstName,
        lastName: softwareArchitecture.tutors[0].lastName,
        tutorId: softwareArchitecture.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: softwareEngStudents,
      startDate: new Date("2022/10/16"),
      startTime: new Date("2022/10/16 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "980129",
      moduleName: "Software Architecture",
      tutor: {
        firstName: softwareArchitecture.tutors[0].firstName,
        lastName: softwareArchitecture.tutors[0].lastName,
        tutorId: softwareArchitecture.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: softwareEngStudents,
      startDate: new Date("2022/10/16"),
      startTime: new Date("2022/10/16 09:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "409328",
      moduleName: "Software Architecture",
      tutor: {
        firstName: softwareArchitecture.tutors[0].firstName,
        lastName: softwareArchitecture.tutors[0].lastName,
        tutorId: softwareArchitecture.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: softwareEngStudents,
      startDate: new Date("2022/10/30"),
      startTime: new Date("2022/10/30 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "230498",
      moduleName: "Software Architecture",
      tutor: {
        firstName: softwareArchitecture.tutors[0].firstName,
        lastName: softwareArchitecture.tutors[0].lastName,
        tutorId: softwareArchitecture.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: softwareEngStudents,
      startDate: new Date("2022/11/06"),
      startTime: new Date("2022/11/06 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "473289",
      moduleName: "Software Architecture",
      tutor: {
        firstName: softwareArchitecture.tutors[0].firstName,
        lastName: softwareArchitecture.tutors[0].lastName,
        tutorId: softwareArchitecture.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: softwareEngStudents,
      startDate: new Date("2022/11/13"),
      startTime: new Date("2022/11/13 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "120932",
      moduleName: "Software Architecture",
      tutor: {
        firstName: softwareArchitecture.tutors[0].firstName,
        lastName: softwareArchitecture.tutors[0].lastName,
        tutorId: softwareArchitecture.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: softwareEngStudents,
      startDate: new Date("2022/11/20"),
      startTime: new Date("2022/11/20 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "123892",
      moduleName: "Software Architecture",
      tutor: {
        firstName: softwareArchitecture.tutors[0].firstName,
        lastName: softwareArchitecture.tutors[0].lastName,
        tutorId: softwareArchitecture.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: softwareEngStudents,
      startDate: new Date("2022/11/27"),
      startTime: new Date("2022/11/27 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "984523",
      moduleName: "Software Architecture",
      tutor: {
        firstName: softwareArchitecture.tutors[0].firstName,
        lastName: softwareArchitecture.tutors[0].lastName,
        tutorId: softwareArchitecture.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: softwareEngStudents,
      startDate: new Date("2022/12/01"),
      startTime: new Date("2022/12/01 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "120398",
      moduleName: "Software Architecture",
      tutor: {
        firstName: softwareArchitecture.tutors[0].firstName,
        lastName: softwareArchitecture.tutors[0].lastName,
        tutorId: softwareArchitecture.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: softwareEngStudents,
      startDate: new Date("2022/12/08"),
      startTime: new Date("2022/12/08 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "327894",
      moduleName: "Data Structures",
      tutor: {
        firstName: dataStructures.tutors[0].firstName,
        lastName: dataStructures.tutors[0].lastName,
        tutorId: dataStructures.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
      ],
      attendance: computerScienceStudents,
      startDate: new Date("2022/11/01"),
      startTime: new Date("2022/11/01 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "987432",
      moduleName: "Data Structures",
      tutor: {
        firstName: dataStructures.tutors[0].firstName,
        lastName: dataStructures.tutors[0].lastName,
        tutorId: dataStructures.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
      ],
      attendance: computerScienceStudents,
      startDate: new Date("2022/11/08"),
      startTime: new Date("2022/11/08 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "587921",
      moduleName: "Data Structures",
      tutor: {
        firstName: dataStructures.tutors[0].firstName,
        lastName: dataStructures.tutors[0].lastName,
        tutorId: dataStructures.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
      ],
      attendance: computerScienceStudents,
      startDate: new Date("2022/11/15"),
      startTime: new Date("2022/11/15 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "043587",
      moduleName: "Data Structures",
      tutor: {
        firstName: dataStructures.tutors[0].firstName,
        lastName: dataStructures.tutors[0].lastName,
        tutorId: dataStructures.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
      ],
      attendance: computerScienceStudents,
      startDate: new Date("2022/11/22"),
      startTime: new Date("2022/11/22 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "609841",
      moduleName: "Data Structures",
      tutor: {
        firstName: dataStructures.tutors[0].firstName,
        lastName: dataStructures.tutors[0].lastName,
        tutorId: dataStructures.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
      ],
      attendance: computerScienceStudents,
      startDate: new Date("2022/11/29"),
      startTime: new Date("2022/11/29 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "493829",
      moduleName: "Data Structures",
      tutor: {
        firstName: dataStructures.tutors[0].firstName,
        lastName: dataStructures.tutors[0].lastName,
        tutorId: dataStructures.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
      ],
      attendance: computerScienceStudents,
      startDate: new Date("2022/12/06"),
      startTime: new Date("2022/12/06 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "508943",
      moduleName: "Data Structures",
      tutor: {
        firstName: dataStructures.tutors[0].firstName,
        lastName: dataStructures.tutors[0].lastName,
        tutorId: dataStructures.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
      ],
      attendance: computerScienceStudents,
      startDate: new Date("2022/12/13"),
      startTime: new Date("2022/12/13 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "213094",
      moduleName: "Data Structures",
      tutor: {
        firstName: dataStructures.tutors[0].firstName,
        lastName: dataStructures.tutors[0].lastName,
        tutorId: dataStructures.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
      ],
      attendance: computerScienceStudents,
      startDate: new Date("2022/12/20"),
      startTime: new Date("2022/12/20 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "089921",
      moduleName: "Data Structures",
      tutor: {
        firstName: dataStructures.tutors[0].firstName,
        lastName: dataStructures.tutors[0].lastName,
        tutorId: dataStructures.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
      ],
      attendance: computerScienceStudents,
      startDate: new Date("2022/12/27"),
      startTime: new Date("2022/12/27 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "578921",
      moduleName: "Data Structures",
      tutor: {
        firstName: dataStructures.tutors[0].firstName,
        lastName: dataStructures.tutors[0].lastName,
        tutorId: dataStructures.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
      ],
      attendance: computerScienceStudents,
      startDate: new Date("2023/01/03"),
      startTime: new Date("2023/01/03 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "487398",
      moduleName: "Human Factors",
      tutor: {
        firstName: humanFactors.tutors[0].firstName,
        lastName: humanFactors.tutors[0].lastName,
        tutorId: humanFactors.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2022/11/29"),
      startTime: new Date("2022/11/29 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "377592",
      moduleName: "Human Factors",
      tutor: {
        firstName: humanFactors.tutors[0].firstName,
        lastName: humanFactors.tutors[0].lastName,
        tutorId: humanFactors.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2022/12/06"),
      startTime: new Date("2022/12/06 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "093824",
      moduleName: "Human Factors",
      tutor: {
        firstName: humanFactors.tutors[0].firstName,
        lastName: humanFactors.tutors[0].lastName,
        tutorId: humanFactors.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2022/12/13"),
      startTime: new Date("2022/12/13 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "896437",
      moduleName: "Human Factors",
      tutor: {
        firstName: humanFactors.tutors[0].firstName,
        lastName: humanFactors.tutors[0].lastName,
        tutorId: humanFactors.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2022/12/20"),
      startTime: new Date("2022/12/20 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "912821",
      moduleName: "Human Factors",
      tutor: {
        firstName: humanFactors.tutors[0].firstName,
        lastName: humanFactors.tutors[0].lastName,
        tutorId: humanFactors.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2022/12/27"),
      startTime: new Date("2022/12/27 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "908329",
      moduleName: "Human Factors",
      tutor: {
        firstName: humanFactors.tutors[0].firstName,
        lastName: humanFactors.tutors[0].lastName,
        tutorId: humanFactors.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2023/01/03"),
      startTime: new Date("2023/01/03 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "821762",
      moduleName: "Human Factors",
      tutor: {
        firstName: humanFactors.tutors[0].firstName,
        lastName: humanFactors.tutors[0].lastName,
        tutorId: humanFactors.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2023/01/10"),
      startTime: new Date("2023/01/10 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "182371",
      moduleName: "Human Factors",
      tutor: {
        firstName: humanFactors.tutors[0].firstName,
        lastName: humanFactors.tutors[0].lastName,
        tutorId: humanFactors.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2023/01/17"),
      startTime: new Date("2023/01/17 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "519082",
      moduleName: "Human Factors",
      tutor: {
        firstName: humanFactors.tutors[0].firstName,
        lastName: humanFactors.tutors[0].lastName,
        tutorId: humanFactors.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2023/01/24"),
      startTime: new Date("2023/01/24 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "658190",
      moduleName: "Systems Analysis",
      tutor: {
        firstName: systemsAnalysis.tutors[0].firstName,
        lastName: systemsAnalysis.tutors[0].lastName,
        tutorId: systemsAnalysis.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2023/01/31"),
      startTime: new Date("2023/01/31 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "321894",
      moduleName: "Systems Analysis",
      tutor: {
        firstName: systemsAnalysis.tutors[0].firstName,
        lastName: systemsAnalysis.tutors[0].lastName,
        tutorId: systemsAnalysis.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2023/02/07"),
      startTime: new Date("2023/02/07 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "120929",
      moduleName: "Systems Analysis",
      tutor: {
        firstName: systemsAnalysis.tutors[0].firstName,
        lastName: systemsAnalysis.tutors[0].lastName,
        tutorId: systemsAnalysis.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2023/02/14"),
      startTime: new Date("2023/02/14 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "432708",
      moduleName: "Systems Analysis",
      tutor: {
        firstName: systemsAnalysis.tutors[0].firstName,
        lastName: systemsAnalysis.tutors[0].lastName,
        tutorId: systemsAnalysis.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2023/02/21"),
      startTime: new Date("2023/02/21 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "212271",
      moduleName: "Systems Analysis",
      tutor: {
        firstName: systemsAnalysis.tutors[0].firstName,
        lastName: systemsAnalysis.tutors[0].lastName,
        tutorId: systemsAnalysis.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2023/02/28"),
      startTime: new Date("2023/02/28 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "758934",
      moduleName: "Systems Analysis",
      tutor: {
        firstName: systemsAnalysis.tutors[0].firstName,
        lastName: systemsAnalysis.tutors[0].lastName,
        tutorId: systemsAnalysis.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2023/03/07"),
      startTime: new Date("2023/03/07 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "230947",
      moduleName: "Systems Analysis",
      tutor: {
        firstName: systemsAnalysis.tutors[0].firstName,
        lastName: systemsAnalysis.tutors[0].lastName,
        tutorId: systemsAnalysis.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2023/03/14"),
      startTime: new Date("2023/03/14 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "237842",
      moduleName: "Systems Analysis",
      tutor: {
        firstName: systemsAnalysis.tutors[0].firstName,
        lastName: systemsAnalysis.tutors[0].lastName,
        tutorId: systemsAnalysis.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2023/03/21"),
      startTime: new Date("2023/03/21 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "208934",
      moduleName: "Systems Analysis",
      tutor: {
        firstName: systemsAnalysis.tutors[0].firstName,
        lastName: systemsAnalysis.tutors[0].lastName,
        tutorId: systemsAnalysis.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2023/03/28"),
      startTime: new Date("2023/03/28 16:00"),
      duration: 120,
      isOpen: false,
    },
    {
      sessionType: SessionTypes.Lecture,
      sessionCode: "093284",
      moduleName: "Systems Analysis",
      tutor: {
        firstName: systemsAnalysis.tutors[0].firstName,
        lastName: systemsAnalysis.tutors[0].lastName,
        tutorId: systemsAnalysis.tutors[0].tutorId,
      },
      courses: [
        {
          courseName: computerScience.courseName,
          courseId: computerScience._id,
        },
        {
          courseName: softwareEng.courseName,
          courseId: softwareEng._id,
        },
      ],
      cohorts: [
        {
          cohortId: computerScienceCohort._id,
          cohortName: computerScience.courseName,
        },
        {
          cohortId: softwareEngineeringCohort._id,
          cohortName: softwareEng.courseName,
        },
      ],
      attendance: mixedGroupOfStudents,
      startDate: new Date("2023/04/04"),
      startTime: new Date("2023/04/04 16:00"),
      duration: 120,
      isOpen: false,
    },
  ];
  // add each Session to the database
  await Sessions.create(sessions);
  console.log("Sessions created");
};

const main = async () => {
  await SetUp();
  await DropCollections();
  await CreateUsers();
  await Break();
  await CreateAcademicAdvisors();
  await Break();
  await CreateCourses();
  await Break();
  await CreateCohorts();
  await Break();
  await CreateModules();
  await Break();
  await CreateSessions();
  await Break().then(process.exit());
  console.log("Database seeded");
};

//await CreateSessions();
main();
