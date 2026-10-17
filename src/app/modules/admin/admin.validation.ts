import z from "zod";

export const updatedAdminZodSchema=z.object({
    admin:z.object({
        name:z.string("Name must be a string").optional(),
        profilePhoto:z.url("Profile photo must be a valid url").optional(),
        contactNumber:z.string("Contact Number must be a string").min(11,"Contact number must be at least 11 charaters").max(14,"Contact number must be at most 15 characters ").optional(),

        
    }).optional()
})