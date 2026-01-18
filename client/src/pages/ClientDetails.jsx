import { useState, useEffect } from "react";
import { useParams} from "react-router";

//import PerformButton from "../components/button";
// import HandleDelete from "../components/DeleteClient";

function ClientDetails()    {
    const { id } = useParams()
    const [client, setClient] = useState(null);

    useEffect(() => {
        async function fecthClient()    {
            const response = await fetch(`https://client-tracker-1-juzl.onrender.com/${id}`);

            const data = await response.json();
            setClient(data);
        }
        fecthClient();
    }, [id]);

    if(!client) {
        return <p>Loading client...</p>
    }

    const { company_name, url, pages, sector, contact_name, role, address, mobile, email, date } = client;

    return  (
        <>
            <h2>{company_name}</h2>
            <p>Website: {url}</p>
            <p>Number of pages: {pages}</p>
            <p>Sector: {sector}</p>
            <p>Contact: {contact_name}</p>
            <p>Role: {role}</p>
            <p>Address: {address}</p>
            <p>Mobile: {mobile}</p>
            <p>Email: {email}</p>
            <p>Date: {date}</p>
            
            {/* <PerformButton */}
                {/* label="Delete Client"  */}
                {/* onClick={HandleDelete}    */}
                {/* type="button"   */}
            {/* /> */}
        </>

    );
}
export default ClientDetails;