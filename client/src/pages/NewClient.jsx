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

        await fetch("https://client-tracker-1-juzl.onrender.com/new-client", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(formData)
        });
    }

    return  (
        <>
            <h2>New client</h2>
            <ClientForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitLabel="Create a new client"
            />
        </>
        
    )
}
export default NewClient;