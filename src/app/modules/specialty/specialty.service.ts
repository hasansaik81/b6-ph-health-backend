import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpecialty = async (payload:Specialty): Promise<Specialty> => { 
    const specailty=await prisma.specialty.create({
        data:payload
    })
    return specailty;
}

const getAllSpecialty=async():Promise<Specialty[]>=>{
    const specialties=await prisma.specialty.findMany();
    return specialties;
}

const deleteSpecilty=async(id:string):Promise<Specialty>=>{
    const specialties=await prisma.specialty.delete({
        where:{id}
    })
    return specialties;
}

export const SpecialtyService={
    createSpecialty,
    getAllSpecialty,
    deleteSpecilty
}