import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';

function Naudotojas() {

    const [naudotojasgot, setNaudotojas] = useState(null);


    useEffect(() => {
        fetchNaudotojas();
    }, []);

    const fetchNaudotojas = async () => {
        try {
            const klientasID = 1;
            const response = await fetch(`http://localhost:5031/Naudotojas/GetUserData/${klientasID}`);
            const data = await response.json();
            console.log(data);
            setNaudotojas(data);

        } catch (error) {
            console.error('Error fetching Uzsakymai:', error);
        }
    };

    




    return (
        <div>
            <Navbar>
                <h1>Naudotojas</h1>
                <Outlet />
            </Navbar>

            <Button>
                <Link to="/home">Pagrindinis</Link>
                <Outlet />
            </Button>
            <Button>
                <Link to="/prisijungimas">Atsijungti</Link>
                <Outlet />
            </Button>
            <Button color="inherit" component={Link} to={'/administratorius'}>Administratoriaus</Button>
            <Button color="inherit" component={Link} to={'/uzsakymuIstorija'}>Užsakymų istorija</Button>

            <div>
                <h1>Naudotojas Details</h1>
                {naudotojasgot ? (
                    <div>
                        <p><strong>Slapyvardis:</strong> {naudotojasgot.slapyvardis}</p>
                        <p><strong>Vardas:</strong> {naudotojasgot.vardas}</p>
                        <p><strong>Pavardė:</strong> {naudotojasgot.pavarde}</p>
                        <p><strong>El. Paštas:</strong> {naudotojasgot.elPastas}</p>
                        <p><strong>Gimimo Data:</strong> {new Date(naudotojasgot.gimimoData).toLocaleDateString()}</p>
                        <p><strong>Registravimo Data:</strong> {new Date(naudotojasgot.registravimoData).toLocaleString()}</p>
                        <p><strong>Miestas:</strong> {naudotojasgot.miestas}</p>
                        <p><strong>Tel. Numeris:</strong> {naudotojasgot.telNumeris}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
export default Naudotojas;