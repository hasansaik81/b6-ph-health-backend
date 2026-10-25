export interface ICreateDoctorSchedulePyload{
    scheduleIds:string[];
}


export interface IUpdateDoctorSchedulePyload{
    scheduleIds:{
        schouldDelete:boolean;
        id:string

    }[]
}