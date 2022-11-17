export interface IUser {
  _id?: string;
  email: string;
  password: string;
  role: Roles;
  name?: string;
}

export interface ISession {
  _id?: string;
  sessionType: SessionTypes;
  tutor: {
    _id?: string,
    firstName: string,
    lastName: string
  };
  startTime: Date;
  duration?: number;
  isOpen: boolean;
}

export interface ICourse {
  _id?: string;
  courseName: string;
  courseLeader: {
    _id?: string,
    firstName: string,
    lastName: string
  };
  studentID: string[];
  modules:
  [
    {
      _id?: string,
      moduleName: string,
      moduleLeader: string
    }
  ];  
}

export interface IModule {
  _id?: string;
  moduleName: string;
  moduleLeader: {
    _id?: string,
    firstName: string,
    lastName: string
  };
  tutors:
  [
    {
      _id?: string,
      firstName: string,
      lastName: string
    }
  ];
  sessionID: [string]
}

export interface ICohort {
  _id?: string;
  module: {
    _id?: string,
    moduleName: string,
    moduleLeader: string
  };
  students:
  [
    {
      _id?: string,
      firstName: string,
      lastName: string
    }
  ];
}