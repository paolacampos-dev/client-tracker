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

//root route (testing)
app.get("/", (req, res) => {
    res.json({message:"wellcome to the server API. Get comfy!!"})
    })

//routing system
//route --> htpp READ (GET) (just worry about the resp)
app.get("/clients",  async (req, res) =>  {
    try{
    //query the db
    const query = await db.query (
        `SELECT id, company_name, url, pages, sector, contact_name,  role, address, mobile, email, date FROM clients `
    );
    console.log(query.rows)
    res.json(query.rows)
} catch (error) {
    console.log(error, "Response failed")
    res.status(500).json({renpose: "fail"});
}
});

//get one client details in particular
app.get("/clients/:id", async (req, res) =>   {
    const { id } = req.params;
    const query = await db.query(
        `SELECT * FROM clients WHERE id = $1`, 
        [id]
    );
    res.json(query.rows[0])
})


// Create (POST)
app.post("/new-client", (req, res) =>   {
    try {
        //const data = req.body;
        const { companyName, url, pages, sector, contactName,  role, address, mobile, email, date } = req.body;

        const safePages = pages === "" ? null : pages;
        const safeMobile = mobile === "" ? null : mobile;
        const safeDate = date === "" ? null : date;

        const query = db.query(
            `INSERT INTO clients (company_name, url, pages, sector, contact_name,  role, address, mobile, email, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [
                /*data.companyName,*/ companyName,
                url,
                safePages, 
                sector, 
                contactName, 
                role, 
                address, 
                safeMobile, 
                email,
                safeDate
            ]
        );
        res.status(201).json({ request: "success" });
    } catch (error) {
        console.error(error, "Request failed.");
        res.status(500).json({ request: "fail" });
    }
});

//Delete one entry from clients
app.delete("/delete-client/:id", (req, res) =>  {
    try{
        //const idParams = req.params.id
        const { id } = req.params
        const query = db.query(`DELETE FROM clients WHERE id = $1 RETURNING *`, [
            /*idparams*/ id,
        ]);
        res.status(200).json({request: "success "});
    } catch (error) {
        console.error(error, "Request failed");
        res.status(500).json({ request: "fail" });
    }
});

/*update (nned the content of each value if not will be null)
app.put("/update-client/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { companyName, url, pages, sector, contactName,  role, address, mobile, email } = req.body;
        const query = db.query(
        `UPDATE clients SET company_name = $1, url = $2, pages = $3, sector = $4, contact_name = $5, role = $6, address = $7, mobile = $8, email = $9 WHERE id = $10`,
        [companyName, url, pages, sector, contactName,  role, address, mobile, email, id]
    );
    res.status(200).json({ request: "success" });
    } catch (error) {
    console.error(error, "Request failed. Turn off and on");
    res.status(500).json({ request: "fail" });
    }
});*/

