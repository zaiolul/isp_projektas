import * as React from 'react';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.js';
import Table from '../RestoranuSarasas.js';
import Card from '../restoranuKorteles.js';
function LinksHome() {
    return (
        <div>
            <Navbar>
                <h1>Pagrindinis</h1>
                <Outlet />
            </Navbar>
            <Card />
        </div>
    );
}
export default LinksHome;