import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';

function Apmokejimas() {
    const savedTotalPrice = localStorage.getItem('galutineKaina');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Get form data
        const formData = new FormData(event.target);
        const vardas = formData.get('vardas');
        const pavarde = formData.get('pavarde');
        const adresas = formData.get('adresas');
        const saskaitosNr = formData.get('saskaitosNr');

        // Log the form data (replace this with your logic)
        console.log('Form Data:', { vardas, pavarde, adresas, saskaitosNr });

        // Add logic here to send the form data to the server or perform other actions
    };

    return (
        <div>
            <Navbar>
                <h1>Apmokejimas</h1>
                <Outlet />
            </Navbar>
            <h1>Apmokejimas</h1>
            <Button>
                <Link to="/krepselis">Atgal</Link>
                <Outlet />
            </Button>
            <h1>Galutinė suma: {savedTotalPrice} €</h1>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <label>
                    Vardas:
                    <input type="text" name="vardas" required />
                </label>
                <br />
                <label>
                    Pavardė:
                    <input type="text" name="pavarde" required />
                </label>
                <br />
                <label>
                    Adresas:
                    <input type="text" name="adresas" required />
                </label>
                <br />
                <label>
                    Saskaitos Nr.:
                    <input type="text" name="saskaitosNr" required />
                </label>
                <br />
                <Button type="submit" variant="contained" color="primary">
                    Pateikti duomenis
                </Button>
            </form>
        </div>
    );
}

export default Apmokejimas;
