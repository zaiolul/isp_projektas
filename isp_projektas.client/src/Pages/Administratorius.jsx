import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';

function administratorius() {
    return (
        <div>
            <Navbar>
                <h1>Administratoriaus puslapis</h1>
                <Outlet />
            </Navbar>

            <Button>
                <Button color="inherit" component={Link} to={'/naudotojas'}>Naudotojas</Button>
                <Outlet />
            </Button>
        </div>
    );
}
export default administratorius;