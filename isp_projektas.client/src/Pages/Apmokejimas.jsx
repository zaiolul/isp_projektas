import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';

function apmokejimas() {
    return (
        <div>
            <Navbar>
                <h1>Apmokejimas</h1>
                <Outlet />
            </Navbar>

            <Button>
                <Link to="/krepselis">Krepšelis</Link>
                <Outlet />
            </Button>
        </div>
    );
}
export default apmokejimas;