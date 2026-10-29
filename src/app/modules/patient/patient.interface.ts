import { BloodGroup, Gender } from "../../../generated/prisma/enums";

export interface IUpdatePatientInfoPayload{
    name?:string;
    profilePhoto?:string;
    contactNumber?:string;
    adress?:string;
}


export interface IUpdatePatientHealthDataPayload{
    gender:Gender;
    dateOfBirth:Date;
    bloodGroup:BloodGroup;
    hasAllergies:boolean;
    hasDiabetes:boolean;
    height:string;
    weight:string;
    smokingStatus:boolean;
    dietaryPreference?:string;
    pregnancyStatus:boolean;
    mentalHealthHistory?:string;
    immunizationStatus?:string;
    hasPastSurgeries:boolean;
    recentAnxiety:boolean;
    recentDerpression:boolean;
    maritalStatus?:string;
}

export interface IUpdatePatientMedicalReportPayload{
    reportName ?: string;
    reportLink ?: string;
    shouldDelete ?: boolean;
    reportId ?: string;
}

export interface IUpdatePatientProfilePayload{
    patientInfo ?: IUpdatePatientInfoPayload;
    patientHealthData ?: IUpdatePatientHealthDataPayload;
    medicalReports ?: IUpdatePatientMedicalReportPayload[];
}
