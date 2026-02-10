https://client-tracker-1-juzl.onrender.com
(connection between the client and the server)

Client Tracker Server API

This project implements core CRUD functionality (Create, Read) in a full-stack React + Express + PostgreSQL application. Delete & Update functionality is planned for a future iteration.
This repository contains the backend (server) layer for the Client Tracker application.
It provides a RESTful API built with Node.js, Express, and PostgreSQL, responsible for handling data persistence and business logic.

What I learnt:
formData is the template object which we place the data collected from the form to pass it to the server, then this object can be sent as it is or if we give it a name as a formValues we need to pass it as {formValues:formData} which afterwards in the server instead of just calling the newData entered in this case NewClient as req.body we need to ad the name of the object as we called formValues. Also, we need to pass it with { because we are creating a new object with a key called formValues whose value is formData}
