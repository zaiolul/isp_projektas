import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";


function redaguotiPatiekala() {
    return (
        <div>
            <h1>Redaguoti patiekalą</h1>
            <Button>
                <Link to="/restoranai">Restoranas</Link>
                <Outlet />
            </Button>
        </div>
    );
}
export default redaguotiPatiekala;