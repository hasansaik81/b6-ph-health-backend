// import app from './app';
// import config from './config';

// const PORT = process.env.PORT;

// async function main() {
//   try {
//     app.listen(config.port, () => {
//       console.log(`Example app listening on port <%= config.port %>`);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// main();



// // import "dotenv/config"
// import app from "./app"
// import { prisma } from "./app/lib/prisma";

// const PORT = process.env.PORT;

// async function main() {
//     try {
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




import dotenv from "dotenv";
import app from "./app";
import { prisma } from "./app/lib/prisma";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log("DB connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
