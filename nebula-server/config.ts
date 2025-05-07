import * as dotenv from 'dotenv';
dotenv.config();

export const IS_READONLY = process.env.IS_READONLY ?? false;

export const PORT = process.env.PORT ?? 3816;
