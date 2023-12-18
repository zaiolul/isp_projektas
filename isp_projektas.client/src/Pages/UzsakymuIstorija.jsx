import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';

function UzsakymuIstorija() {
    return (
        <div>
            <Navbar>
                <h1>Užsakymų istorija</h1>
                <Outlet />
            </Navbar>
          
            <Button color="inherit" component={Link} to={'/naudotojas'}>Naudotojas</Button>
            <Outlet />
        </div>
    );
}
export default UzsakymuIstorija;