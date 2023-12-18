import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';

function redaguotiRestorana() {
    return (
        <div>
            <Navbar>
                <h1>Redaguoti restoraną</h1>
                <Outlet />
            </Navbar>

            <Button>
                <Link to="/restoranai">Restoranas</Link>
                <Outlet />
            </Button>
        </div>
    );
}
export default redaguotiRestorana;