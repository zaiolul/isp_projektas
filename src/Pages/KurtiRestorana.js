import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";


function kurtiRestorana() {
    return (
        <div>
            <h1>Kurti restoraną</h1>
            <Button>
                <Link to="/home">Pagrindinis</Link>
                <Outlet />
            </Button>
            <Button>
                <Link to="/restoranai">Restoranas</Link>
                <Outlet />
            </Button>
        </div>
    );
}
export default kurtiRestorana;