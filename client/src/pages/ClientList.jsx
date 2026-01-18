import { useState, useEffect } from "react";
import { Link } from "react-router";


function ClientList()   {
    const [clients, setClients] = useState([])

    useEffect(() => {
        async function fetchClients()   {
            const response = await fetch("https://client-tracker-1-juzl.onrender.com/clients");
            const data = await response.json();
            setClients(data)      
            }
            fetchClients();
        },  []);

        return (
            <>
            <h2>CLIENTS</h2>
            <ul>
                {clients.map(client => (
                    <li key={client.id}>
                        <Link to={`/clients/${client.id}`}>
                        {client.company_name}
                        </Link>
                    </li>
                ))}
            </ul>
            </>
        );
}
export default ClientList