import {Routes, Route } from "react-router";

import Header from "./components/Header.jsx";
import ClientList from "./pages/ClientList.jsx";
import NewClient from "./pages/NewClient.jsx";
import ClientDetails from "./pages/ClientDetails.jsx";


function App() {
  return  (
    <>
      <Header/>
        <Routes>
            <Route element={<ClientList/>} path={"/clients"}/>
            <Route element={<NewClient/>} path={"/new-client"}/>
            <Route element={<ClientDetails/>} path={"/clients/:id"}/>
        </Routes>
    </>
  );
}
export default App;