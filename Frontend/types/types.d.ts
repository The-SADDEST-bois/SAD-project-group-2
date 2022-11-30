export interface IUser {
  email: string;
  password: string;
  role: Roles;
  firstName?: string;
  lastName?: string;
  _id?: string;
}

export interface ICredentials {
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
  startDate: Date;
  startTime: Date;
  duration?: number;
  isOpen: boolean;
  _id: string;
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
  cohorts: [ICohorts];
  _id?: string;
}

export interface ICohorts {
  cohortId: string;
  cohortName: string;
  courseName: string;
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

export interface IAttendanceUser {
  firstName: string;
  lastName: string;
  status: number;
  _id: string;
}

export interface IAttendance {
  attendance: IAttendanceUser[];
  _id?: string;
}

export interface IData {
  sessionCode: string;
  userId: string;
}

export interface IUserDetails {
  email: string;
  role: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
  message: string;
  user: IUserDetails;
}

export interface NavbarItems {
  label: string;
  icon: ReactNode;
  url: string;
}
export interface INavBarIcons {
  NavBarType: NavbarItems[];
  handleNavigate: (url: string) => void;
}

export interface ISessionModal {
  isOpen: boolean;
  onClose: () => void;
  session: ISession;
}
