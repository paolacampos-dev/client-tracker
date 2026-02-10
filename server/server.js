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
        // "id" is not need it
        // SELECT * FROM clientes
        `SELECT company_name, url, pages, sector, contact_name, role, address, mobile, email, date FROM clients `
        );
    console.log(query)
    //parse the response into JSON 
    //but we just need .rows not all the object then we need to wrangle the data query.rows  
    res.json(query.rows)
    //console.log(query.rows)    
    } catch (error) {
    console.log("DB error", error)
    res.status(500).json({ response: "fail", error: error.message });
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
app.post("/new-client", async (req, res) =>   {
    try {
        //receive the data from the client
        //const newClient = req.body.formValues
        const newClient = req.body
        const pages = newClient.pages === "" ? null : Number(newClient.pages);
        const mobile = newClient.mobile === "" ? null : Number(newClient.mobile);
        const date = newClient.date === "" ? null : Number(newClient.date);

        console.log(newClient)
        //const data = req.body;
        //const { companyName, url, pages, sector, contactName,  role, address, mobile, email, date } = req.body;

        const query = await db.query(
            //because we have the parameters we will have to filled with the arguments for those parameters in the array in the second arg
            //same properties as the ones we collect from the form in the client as name=""
            `INSERT INTO clients (company_name, url, pages, sector, contact_name,  role, address, mobile, email, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [
                newClient.company_name,
                newClient.url,
                pages, 
                newClient.sector, 
                newClient.contact_name, 
                newClient.role, 
                newClient.address, 
                mobile, 
                newClient.email,
                date
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

