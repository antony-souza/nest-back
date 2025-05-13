import * as dotenv from 'dotenv';
dotenv.config();

export const environment = {
  host: process.env.HOST,
  port: Number(process.env.PORT),
  api_key: process.env.API_KEY,
};
