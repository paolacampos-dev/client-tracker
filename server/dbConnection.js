import dotenv from "dotenv";
import pg from "pg";

//config  dotenv for keep our secrets
dotenv.config();

//create a pool with pg (waiting room for requests)
const db = new pg.Pool({
    connectionString: process.env.DB_URL, 
})


