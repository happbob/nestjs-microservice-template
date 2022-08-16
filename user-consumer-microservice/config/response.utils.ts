export const RESPONSE = {
  SUCCESS: {
    isSuccess: true,
    code: 1000,
    message: 'Success',
  },
  CHECK_JWT_TOKEN: {
    isSuccess: false,
    code: 2000,
    message: 'Please Check JWT Token',
  },
  USER_ID_EMPTY: {
    isSuccess: false,
    code: 2001,
    message: 'Please Input User Id',
  },
  NON_EXIST_EMAIL: {
    isSuccess: false,
    code: 2002,
    message: 'Please Check Email',
  },
  NON_MATCH_PASSWORD: {
    isSuccess: false,
    code: 2003,
    message: 'Password Do Not Match',
  },
  EMPTY_EMAIL: {
    isSuccess: false,
    code: 2004,
    message: 'Please Input Email',
  },
  INVALID_EMAIL: {
    isSuccess: false,
    code: 2005,
    message: 'Invalid Email',
  },
  EMPTY_PASSWORD: {
    isSuccess: false,
    code: 2006,
    message: 'Please Input Password',
  },
  INVALID_PASSWORD: {
    isSuccess: false,
    code: 2007,
    message: 'Invalid Password',
  },
  EMPTY_CONFIRM_PASSWORD: {
    isSuccess: false,
    code: 2008,
    message: 'Please Input Confirm Password',
  },
  INVALID_CONFIRM_PASSWORD: {
    isSuccess: false,
    code: 2009,
    message: 'Invalid Confirm Password',
  },
  NOT_MATCH_CONFIRM_PASSWORD: {
    isSuccess: false,
    code: 2010,
    message: 'The Confirm Password Does Not Match',
  },
  EMPTY_NICKNAME: {
    isSuccess: false,
    code: 2011,
    message: 'Please Input Nickname',
  },
  EXIST_EMAIL: {
    isSuccess: false,
    code: 2012,
    message: 'This Email Is Alrealdy In Use',
  },
  NON_EXIST_USER: {
    isSuccess: false,
    code: 2013,
    message: 'This User Dose Not Exist',
  },
  EMPTY_AUTHORITY: {
    isSuccess: false,
    code: 2014,
    message: 'Please Input Authority',
  },
  INVALID_AUTHORITY: {
    isSuccess: false,
    code: 2015,
    message: 'Invalid Authority',
  },
  CANNOT_ACCESS_BY_AUTHORITY: {
    isSuccess: false,
    code: 2016,
    message: 'Inaccessible Authority',
  },
  INVALID_NICKNAME: {
    isSuccess: false,
    code: 2017,
    message: 'Nickname exceeds 20 Characters',
  },
  ERROR: {
    isSuccess: false,
    code: 4000,
    message: 'Server Error',
  },
};
