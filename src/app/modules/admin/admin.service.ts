import status from "http-status";
import AppError from "../../errorHelper/AppError";
import { prisma } from "../../lib/prisma";
import { IUpdateAdminPayload } from "./admin.interface";
import { IRequestUser } from "../../interfaces/requestUser.interface";

const getAllAdmins=async()=>{
    const admins =await prisma.admin.findMany({
        include:{
            user:true,
        }
    })
    return admins ;
}

const getAdminById=async(id:string)=>{
    const admin=await prisma.admin.findUnique({
        where:{
            id,
        },
        include:{
            user:true,
        }
    })
    return admin
}

const updateAdmin= async(id:string,payload:IUpdateAdminPayload)=>{
    const isAsminExist=await prisma.admin.findUnique({
        where:{
            id,
        }

    })

    if(!isAsminExist){
        throw new AppError(status.NOT_FOUND,"Admin or Super Admin not found");
    }
    const {admin}=payload

    const updatedAdmin =await prisma.admin.update({
        where:{
            id,
        },
        data:{
            ...admin,
        }
    })
    return updateAdmin
}


const deleteAdmin=async(id:string,user:IRequestUser)=>{
    const isAminExist=await prisma.admin.findUnique({
        where:{
            id,
        }
    })

    if(!isAminExist){
        throw new AppError(status.NOT_FOUND,"Admin or super Admin not found");

    }

    if(isAminExist.id===user.userId){
     throw new AppError(status.BAD_REQUEST,"You cannot delete yourself");
    }

    const result = await prisma.$transaction(async(tx)=>{
        await tx.admin.update({
            where:{id},
            data:{
                isDeleted:true,
                deletedAt:new Date()

            },
        })

        await tx.session.deleteMany({
            where:{userId:isAminExist.userId}
        })
        await tx.account.deleteMany({
            where:{userId:isAminExist.userId}
        })

        const admin =await getAdminById(id);
        return admin
    })
    return result
}

export const AdminService={
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin

}