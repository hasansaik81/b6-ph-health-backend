import {  Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { SpecialtyService } from "./specialty.service";
import AppError from "../../errorHelper/AppError";
import { uploadFileToCloudinary } from "../../config/cloudinary.config";

const createSpecialty=catchAsync(async(req:Request,res:Response)=>{
    console.log(req.body);
    console.log(req.file);
    const payload={
        ...req.body,
        icon:req.file?.path
    };
    
    const result=await SpecialtyService.createSpecialty(payload);
    sendResponse(res,{
        httpStatusCode:201,
        success:true,
        message:"Specialty created successfully",
        data:result
    });
});






// const createSpecialty = catchAsync(
//   async (req: Request, res: Response) => {
//     if (!req.file) {
//       throw new AppError(
//         status.BAD_REQUEST,
//         "Specialty icon is required"
//       );
//     }

//     const uploadedFile = await uploadFileToCloudinary(
//       req.file.buffer,
//       req.file.originalname
//     );

//     const payload = {
//       ...req.body,
//       icon: uploadedFile.secure_url,
//     };

//     const result = await SpecialtyService.createSpecialty(payload);

//     sendResponse(res, {
//       httpStatusCode: 201,
//       success: true,
//       message: "Specialty created successfully",
//       data: result,
//     });
//   }
// );




const getAllSpecialty=catchAsync(async(req:Request,res:Response)=>{
    const result=await SpecialtyService.getAllSpecialty();
    sendResponse(res,{
        httpStatusCode:200,
        success:true,
        message:"Specialty fetched successfully",
        data:result
    });
})


const deleteSpecialty=catchAsync(async(req:Request,res:Response)=>{
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