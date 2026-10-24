import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { ScheduleService } from "./schedule.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { IQueryParams } from "../../interfaces/query.interface";

const createSchudule=catchAsync(async(req:Request,res:Response)=>{
    const payload=req.body;
    const schedule=await ScheduleService.createSchedule(payload);
    sendResponse(res,{
        success:true,
        httpStatusCode:status.CREATED,
        message:'Schedule created successfully',
        data:schedule
    });
});

const getAllSchedules=catchAsync(async(req:Request,res:Response)=>{
    const query=req.query;
    const result=await ScheduleService.getAllSchedules(query as IQueryParams);
    sendResponse(res,{
        success:true,
        httpStatusCode:status.OK,
        message:"Schedules retrived successfully",
        data:result.data,
        meta:result.meta
    })
})

const getScheduleById=catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params;
    const schedule=await ScheduleService.getScheduleById(id as string);
    sendResponse(res,{
        success:true,
        httpStatusCode:status.OK,
        message:'Schedule retrived successfully',
        data:schedule
    });
});

const updateSchedule=catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params;
    const payload=req.body;
    const updatedSchedule= await ScheduleService.updateSchedule(id as string,payload);
    sendResponse(res,{
        success:true,
        httpStatusCode:status.OK,
        message:'Schedule updated successfully',
        data:updateSchedule
    });
});

const deleteSchedule=catchAsync(async(req:Request,res:Response)=>{
    const {id}=req.params;
    await ScheduleService.deletSchedule(id as string);
    sendResponse(res,{
        success:true,
        httpStatusCode:status.OK,
        message:'Schedule deleted successfully'
    })
})

export const ScheduleController={
    createSchudule,
    getAllSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
}