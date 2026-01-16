import express from "express";
import cors from "cors";

//initialize express
const app = express();

//use Json in our server(initialize Json)
app.use(express.json)

//config cors ()
app.use(cors())

//port
const PORT = 8080
// tell the server API to runs in this port
app.listen(PORT,  () =>    {
    console.info(`Server API is running in port ${PORT}`)
});

//root route
//routing system
//route --> htpp READ (GET)
