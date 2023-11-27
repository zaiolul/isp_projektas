import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";


function Krepselis() {
    return (
        <div>
            <h1>Krepšelis</h1>
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