import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';

function Krepselis() {
    return (
        <div>
            <Navbar>
                <h1>Krepšelis</h1>
                <Outlet />
            </Navbar>

            <Button>
                <Link to="/apmokejimas">Apmokėjimas</Link>
                <Outlet />
            </Button>
            <Button>
                <Link to="/home">Pagrindinis</Link>
                <Outlet />
            </Button>

        </div>
    );
}
export default Krepselis;