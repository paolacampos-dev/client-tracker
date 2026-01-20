import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";


function ClientList()   {
    const [clients, setClients] = useState([])
    const [searchParams] = useSearchParams();
    const sort = searchParams.get("sort")

    useEffect(() => {
        async function fetchClients()   {
            const response = await fetch("http://localhost:8080/clients");
            const data = await response.json();
        
            setClients(data)      
            }
            fetchClients();
            console.log(clients)
        },  []);

        let sortedClients= [...clients]

        if(sort==="desc")  {
            sortedClients.sort((a, b) =>  
                b.company_name.localeCompare(a.company_name)
            );
        } else if (sort==="asc")   {
                    sortedClients.sort((a, b) =>  
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
                {sortedClients.map(client => (
                    <li key={client.id}>
                        {/* {JSON.stringify(client)} */}
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