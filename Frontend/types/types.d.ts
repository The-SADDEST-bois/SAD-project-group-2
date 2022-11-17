export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  password: string;
  role: Roles;
  accessToken?: string;
}

export interface ISession {
  sessionType: SessionTypes;
  tutor: {
    firstName: string,
    lastName: string
    _id?: string,
  };
  startTime: Date;
  duration?: number;
  isOpen: boolean;
  _id?: string;
}

export interface ICourse {
  courseName: string;
  courseLeader: {
    firstName: string,
    lastName: string
    _id?: string,
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
  _id?: string;
}

export interface IModule {
  moduleName: string;
  moduleLeader: {
    firstName: string,
    lastName: string
    _id?: string,
  };
  tutors:
  [
    {
      firstName: string,
      lastName: string
      _id?: string,
    }
  ];
  sessionID: [string]
  _id?: string;
}

export interface ICohort {
  module: {
    moduleName: string,
    moduleLeader: string
    _id?: string,
  };
  students:
  [
    {
      firstName: string,
      lastName: string
      _id?: string,
    }
  ];
  _id?: string;
}

export interface IAttendanceRegister {
  attendance:
  [
    {
      firstName: string,
      lastName: string,
      attendend: number
      _id?: string,
    }
  ];
  _id?: string;
}