import * as React from 'react';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';
import Table from '../RestoranuSarasas.jsx';
import Card from '../restoranuKorteles.jsx';
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