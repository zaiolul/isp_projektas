import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';

function kurtiRestorana() {
    return (
        <div>
            <Navbar>
                <h1>Kurti restoraną</h1>
                <Outlet />
            </Navbar>

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