export interface IUser {
  email: string;
  password: string;
  role: Roles;
  firstName?: string;
  lastName?: string;
  _id?: string;
}

interface ICredentials {
  email: string;
  password: string;
  role: Roles;
  firstName?: string;
  lastName?: string;
}

export interface ISession {
  sessionType: SessionTypes;
  sessionCode: string;
  tutor: {
    firstName: string;
    lastName: string;
    _id?: string;
  };
  courses: [
    {
      courseName: string;
      _id?: string;
    }
  ];
  cohorts: [
    {
      _id: string;
      cohortName: string;
    }
  ];
  attendance: [
    {
      firstName: string;
      lastName: string;
      status: number;
      _id: string;
    }
  ];
  moduleName: string;
  startTime: Date;
  duration?: number;
  isOpen: boolean;
  _id?: string;
}

export interface ICourse {
  courseName: string;
  courseLeader: {
    firstName: string;
    lastName: string;
    _id?: string;
  };
  studentID: string[];
  modules: [
    {
      _id?: string;
      moduleName: string;
      moduleLeader: string;
    }
  ];
  _id?: string;
}

export interface IModule {
  moduleName: string;
  moduleLeader: {
    firstName: string;
    lastName: string;
    _id?: string;
  };
  tutors: [
    {
      firstName: string;
      lastName: string;
      _id?: string;
    }
  ];
  cohorts: [
    {
      cohortId: string;
      courseName: string;
      cohortAttendance: number;
    }
  ];
  _id?: string;
}

export interface ICohort {
  module: {
    moduleName: string;
    moduleLeader: string;
    _id?: string;
  };
  students: [
    {
      firstName: string;
      lastName: string;
      _id?: string;
    }
  ];
  _id?: string;
}
