import dotenv from 'dotenv';
dotenv.config();

export const CLOUDINARY_API_KEY: string = process.env.CLOUDINARY_API_KEY || "";
export const CLOUDINARY_API_SECRET: string = process.env.CLOUDINARY_API_SECRET || "";
export const CLOUDINARY_CLOUD_NAME: string = process.env.CLOUDINARY_CLOUD_NAME || "";
export const DATABASE_URL: string = process.env.DATABASE_URL || "mongodb://takaserve:Takasrv@ac-iied6yg-shard-00-00.x81l1al.mongodb.net:27017,ac-iied6yg-shard-00-01.x81l1al.mongodb.net:27017,ac-iied6yg-shard-00-02.x81l1al.mongodb.net:27017/?ssl=true&replicaSet=atlas-vyzi3k-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
export const SECRET: string = process.env.SECRET || "12345678901234567890123456789012";
