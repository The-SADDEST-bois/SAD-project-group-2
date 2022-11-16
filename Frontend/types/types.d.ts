export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: Roles;
  name?: string;
}

export interface ISession {
  _id: string;
  sessionName: string;
  date: string;
}

export interface ICourse {
  _id: string;
  courseName: string;
  courseLeader: {
    _id: Schema.Types.ObjectId,
    firstName: string,
    lastName: string
  };
  studentID: string[];
  modules:
  [
    {
      _id: string,
      moduleName: string,
      moduleLeader: string
    }
  ];  
}

export interface IModule {
  _id: string;
  moduleName: string;
  moduleLeader: {
    _id: string,
    firstName: string,
    lastName: string
  };
  tutors:
  [
    {
      _id: string,
      firstName: string,
      lastName: string
    }
  ];
  sessionID: [string]
}