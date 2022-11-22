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

export interface IAttendanceRegister {
  attendance: [
    {
      firstName: string;
      lastName: string;
      attendend: number;
      _id?: string;
    }
  ];
  sessionID: string;
  _id?: string;
}
