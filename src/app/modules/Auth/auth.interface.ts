export interface IloginUserPayload{
    email:string;
    password:string;
}

export interface IRegisterPatientPayload{
    name:string;
    email:string;
    password:string;
}
export interface IchangePasswordPayload{
    currentPassword:string;
    newPassword:string;
}