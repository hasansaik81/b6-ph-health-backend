



// import multer from "multer";

// const storage = multer.memoryStorage();

// const fileFilter: multer.Options["fileFilter"] = (
//   _req,
//   file,
//   callback
// ) => {
//   const isImage = file.mimetype.startsWith("image/");
//   const isPdf = file.mimetype === "application/pdf";

//   if (isImage || isPdf) {
//     return callback(null, true);
//   }

//   return callback(new Error("Only image and PDF files are allowed"));
// };

// export const multerUpload = multer({
//   storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5 MB
//   },
//   fileFilter,
// });






import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";
import { CloudinaryStorage } from "multer-storage-cloudinary-v2";

const storage = new CloudinaryStorage({
    cloudinary: cloudinaryUpload as  any,
    params: async (req, file) => {
        const originalName = file.originalname;
        const extension = originalName.split(".").pop()?.toLocaleLowerCase();

        const fileNameWithoutExtension = originalName
            .split(".")
            .slice(0, -1)
            .join(".")
            .toLowerCase()
            .replace(/\s+/g, "-")
            // eslint-disable-next-line no-useless-escape
            .replace(/[^a-z0-9\-]/g, "");

        const uniqueName =
            Math.random().toString(36).substring(2)+
            "-"+
            Date.now()+
            "-"+
            fileNameWithoutExtension;

        const folder = extension === "pdf" ? "pdfs" : "images";


        return {
            folder : `ph-healthcare/${folder}`,
            public_id: uniqueName,
            resource_type : "auto"
        }
    }

})

export const multerUpload = multer({storage})