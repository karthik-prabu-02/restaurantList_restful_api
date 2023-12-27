import dotenv from 'dotenv';
dotenv.config();
export const databaseConfig = {
    connectionString: process.env.DATABASE_CONNECTION_STRING,
    url : true,
};

