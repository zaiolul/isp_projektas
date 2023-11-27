import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";


function apmokejimas() {
    return (
        <div>
            <h1>Apmokejimas</h1>
            <Button>
                <Link to="/krepselis">Krepšelis</Link>
                <Outlet />
            </Button>
        </div>
    );
}
export default apmokejimas;