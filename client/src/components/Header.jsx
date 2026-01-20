import { Link } from "react-router";

function Header ()  {
    return (
        <>
            <header className="header">
                <nav className="nav">
                        <Link to={"/clients"}>Clients</Link>
                        <Link to={"/new-client"}>New Client</Link>
                </nav>
            <h1>Client Tracker</h1>
            </header>   
        </>
    );
}
export default Header;    