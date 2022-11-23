enum StatusCode {
  OK = 200,

  FOUND = 302,

  BAD_REQUEST = 400,

  // User is not authenticated
  UNAUTHORIZED = 401,

  // User is authenticated but does not have permission to access
  FORBIDDEN = 403,

  NOT_FOUND = 404,

  REQUEST_TIMEOUT = 408,

  INTERNAL_SERVER_ERROR = 500,
}

export default StatusCode;
