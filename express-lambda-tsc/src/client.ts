
import { LambdaClient, paginateListFunctions } from "@aws-sdk/client-lambda";
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.ACCESS_KEY_ID || !process.env.SECRET_ACCESS_KEY || !process.env.REGION) {
  throw new Error("Missing required environment variables: ACCESS_KEY_ID, SECRET_ACCESS_KEY, or REGION");
}

const client = new LambdaClient({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

export { client }