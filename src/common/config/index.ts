import { config} from 'dotenv';

config();

export const RABBIT_USERNAME = process.env.RABBIT_USERNAME || "guest";
export const RABBIT_PASSWORD = process.env.RABBIT_PASSWORD || "guest";  
export const RABBIT_PORT = process.env.RABBIT_PORT || "5672";
export const RABBIT_HOST = process.env.RABBIT_HOST || "localhost";
export const PORT = parseInt(process.env.PORT || "3000");