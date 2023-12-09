import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";


function naudotojas() {
    return (
        <div>
            <h1>Naudotojas</h1>
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
        </div>
    );
}
export default naudotojas;