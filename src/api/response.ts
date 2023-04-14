import { IFAILURE_RESPONSE, ISUCCESS_RESPONSE } from '../intefaces/Apiresponse';

export const SUCCESS_RESPONSE = (payload: any = {}): ISUCCESS_RESPONSE => {
  return {
    status: 'success',
    data: payload
  };
};

export const FAILURE_RESPONSE = (errorMessage: any): IFAILURE_RESPONSE => {
  return {
    status: 'failed',
    errorMessage: errorMessage
  };
};
