export interface ISUCCESS_RESPONSE {
  status: 'success';
  data: any;
}
export interface IFAILURE_RESPONSE {
  status: 'failed';
  errorMessage: string;
}
