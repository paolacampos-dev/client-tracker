import dotenv from "dotenv";
import pg from "pg";

//config  dotenv for keep our secrets
dotenv.config();

//create a pool with pg (waiting room for requests)
export const db = new pg.Pool({
  // process.env is for the server
    connectionString: process.env.DB_URL, 
    ssl: {
    rejectUnauthorized: false
  }
});


