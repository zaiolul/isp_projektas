import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";


function UzsakymuIstorija() {
    return (
        <div>
            <h1>Užsakymų istorija</h1>
            <Button color="inherit" component={Link} to={'/naudotojas'}>Naudotojas</Button>
            <Outlet />
        </div>
    );
}
export default UzsakymuIstorija;