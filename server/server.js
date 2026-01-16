import express, { request } from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

//initialize express
const app = express();

//use Json in our server(initialize Json)
app.use(express.json());

//config cors ()
app.use(cors());

//port
const PORT = 8080;
// tell the server API to runs in this port
app.listen(PORT,  () =>    {
    console.info(`Server API is running in port ${PORT}`)
});

//root route
//routing system
//route --> htpp READ (GET) (just worry about the resp)
app.get("/", (req, res) => {
    res.json({message:"wellcome to the server API. Get comfy!!"})
    })

//Read clients data (GET)
app.get("/clients",  async (req, res) =>  {
    try{
    const query = await db.query (
        `SELECT company_name AS "Company", url AS "Website", pages AS "Number of pages", sector, contact_name AS "Contact Name",  role, address, mobile, email FROM clients `
    );
    console.log(query.rows)
    res.json(query.rows)
} catch (error) {
    console.log(error, "Response failed")
    res.status(500).json({renpose: "fail"});
}
});

// Create (POST)
app.post("/new-client", (req, res) =>   {
    try{
        const data = req.body;
        const { companyName, url, pages, sector, contactName,  role, address, mobile, email } = req.body;
        const query = db.query(
            `INSERT INTO clients (company_name, url, pages, sector, contact_name,  role, address, mobile, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [
                data.companyName, 
                data.url,
                data.pages, 
                data.sector, 
                data.contactName, 
                data.role, 
                data.address, 
                data.mobile, 
                data.email,
            ]
        );
        res.status(200).json({ request: "success" });
    } catch {
        console.error(error, "Request failed.");
        res.status(500).json({ request: "fail" });
    }
});

//Delete one entry from clients
app.delete("/delete-client/:id", (req, res) =>  {
    try{
        const idParams = req.params.id
        const query = db.query(`DELETE FROM clients WHERE id = $1 RETURNING *`, [
            idParams,
        ]);
        res.status(200).json({request: "success "});
    } catch (error) {
        console.erroe(error, "Request failed")
        res.status(500).json({ request: "fail" })
    }
});

