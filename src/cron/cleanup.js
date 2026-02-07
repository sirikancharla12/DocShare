import cron from "node-cron";
import prisma from "../config/prisma";
import cloudinary from "../config/cloudinary";

export const startCleanup=()=>{
    cron.schedule("0 0 * * *", async () => {
        console.log("Running cleanup task...");

        const expiredTransfers=await prisma.transfer.findMany({
            where:{
                expiresAt:{ lt: new Date()},    
            },
            include:{ files: true },
        })

        for(let transfer of expiredTransfers){
            for(let file of transfer.files){
                await cloudinary.uploader.destroy(file.publicId);
                console.log(`Deleted file from Cloudinary: ${file.publicId}`); 
            }

            await prisma.transfer.delete({
                where:{ id: transfer.id },
            });

            console.log(`Deleted transfer record from db: ${transfer.id}`);

        }
    })
}