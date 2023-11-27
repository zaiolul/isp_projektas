import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";


function registracija() {
    return (
        <div>
            <h1>Registracija</h1>
            <Button>
                <Link to="/prisijungimas">Prisijungimas</Link>
                <Outlet />
            </Button>
        </div>
    );
}
export default registracija;