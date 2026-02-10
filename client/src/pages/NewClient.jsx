import { useState } from "react";
import ClientForm from "../components/ClientForm.jsx";

function NewClient() {
const [formData, setFormData] = useState({
        company_name: "",
        url: "",
        pages: "",
        sector: "",
        contact_name: "",
        role: "", 
        address: "", 
        mobile: "", 
        email: "", 
        date: ""
});

    //event.target.value gives you the element that triggered then event (so retrieves the value of the element(input))
    function handleChange(event)   {
        setFormData({
            ...formData, 
            [event.target.name]: event.target.value,
        });
    }

    async function handleSubmit(event)  {
        event.preventDefault();

        const response = await fetch (
            `http://localhost:8080/new-client`,
            //`${import.meta.env.VITE_API_URL}/new-client`, 
            {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            //body: JSON.stringify({ formValues:formData })
            //the template object is formData that we need (formValues is just the name we are giving to this empty object, it is not needed  but if we use it needs to match in the server)
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        console.log("Server response", result)

        setFormData({
            company_name: "",
            url: "",
            pages:"",
            sector: "",
            contact_name: "" ,
            role: "",
            address: "",
            mobile: "",
            email: "",
            date: "",
        });
    }""

    
    return  (
        <>
            <h2>New client</h2>
            <div className="newClient">
                <ClientForm 
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    submitLabel="Create a new client"
                />
            </div>
        </>
        
    )
}
export default NewClient;