import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";


function ClientList()   {
    
    const [clients, setClients] = useState([])
    const [searchParams] = useSearchParams();
    const sort = searchParams.get("sort")

    useEffect(() => {
        async function fetchClients()   {
            // console.log("API URL =", import.meta.env.VITE_API_URL);
            // import.meta is a native  JS module feature
            const response = await fetch(
                // `http://localhost:8080/clients`)
                `${import.meta.env.VITE_API_URL}/clients`);
            // console.log("Status:", response.status)
            const data = await response.json();
            // console.log("DATA", data)
            setClients(data);      
            } /*catch (error) {
                console.log("FETCH ERROR:", error)
            }*/
            fetchClients();
            console.log(clients)
        }, []);

        if(sort==="desc")  {
            clients.sort((a, b) =>  
                b.company_name.localeCompare(a.company_name)
            );
        } else if (sort==="asc")   {
                    clients.sort((a, b) =>  
                    a.company_name.localeCompare(b.company_name)
                );
            }

        return (
            <>
            <nav className="client-sort">
                <Link to="/clients/?sort=asc">Asc</Link>
                <Link to="/clients/?sort=desc">Desc</Link>
            </nav>

            <ul className="clients">
                {clients.map((client, index) => (
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