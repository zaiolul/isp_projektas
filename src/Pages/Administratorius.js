import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";


function administratorius() {
    return (
        <div>
            <h1>Administratoriaus puslapis</h1>
            <Button>
                <Button color="inherit" component={Link} to={'/naudotojas'}>Naudotojas</Button>
                <Outlet />
            </Button>
        </div>
    );
}
export default administratorius;