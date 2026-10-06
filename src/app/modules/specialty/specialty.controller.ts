import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { SpecialtyService } from "./specialty.service";

const createSpecialty=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const specialtyData=req.body;
    const result=await SpecialtyService.createSpecialty(specialtyData);
    sendResponse(res,{
        httpStatusCode:201,
        success:true,
        message:"Specialty created successfully",
        data:result
    });
});


const getAllSpecialty=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const result=await SpecialtyService.getAllSpecialty();
    sendResponse(res,{
        httpStatusCode:200,
        success:true,
        message:"Specialty fetched successfully",
        data:result
    });
})


const deleteSpecialty=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const id=req.params.id;
    const result=await SpecialtyService.deleteSpecilty(id as string);
    sendResponse(res,{
        httpStatusCode:200,
        success:true,
        message:"Specialty deleted successfully",
        data:result
    });
})


export const SpecialtyController={
    createSpecialty,
    getAllSpecialty,
    deleteSpecialty
}