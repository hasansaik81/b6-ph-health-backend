


// // import "dotenv/config"
// import app from "./app"
// import { prisma } from "./app/lib/prisma";
// import { seedSuperAdmin } from "./app/utils/seed";

// const PORT = process.env.PORT;

// async function main() {
//     try {
//       await seedSuperAdmin
//         await prisma.$connect();
//         console.log("DB connected successfully.")

//         app.listen(PORT, () => {
//             console.log(`Server is running at http://localhost:${PORT}`)
//         });

//     } catch (error) {
//         console.error(error);
//         await prisma.$disconnect();
//         process.exit(1);
//     }
// }

// main();






import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seed";

const bootstrap = async() => {
    try {
        await seedSuperAdmin();
        app.listen(envVars.PORT, () => {
            console.log(`Server is running on http://localhost:${envVars.PORT}`);
        });
    } catch 
(error) {
        console.error('Failed to start server:', error);
    }
}

bootstrap();