import * as React from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import PatiekalasView from '../PatiekalasView.jsx';



export default function Restoranai() {
    return (
        <div>
            <h1>Restoranas</h1>
            <Button>
                <Link to="/home">Pagrindinis</Link>
                <Outlet />
            </Button>
            <Button>
                <Link to="/redaguotiPatiekala">Redaguoti patiekalą</Link>
                <Outlet />
            </Button>
            <Button>
                <Link to="/kurtiPatiekala">Kurti patiekalą</Link>
                <Outlet />
            </Button>
            <Button>
                <Link to="/redaguotiRestorana">Redaguoti restoraną</Link>
                <Outlet />
            </Button>
            <div>
                <PatiekalasView />
            </div>

        </div>
    );
}