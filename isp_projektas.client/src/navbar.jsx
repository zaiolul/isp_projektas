import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, Link } from "react-router-dom";

export default function ButtonAppBar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" component="div" sx={{ marginRight: 8 }}>
                        Molt
                    </Typography>
                    <Button color="inherit" component={Link} to={'/home'}>Pagrindinis</Button>
                    <Button color="inherit" component={Link} to={'/krepselis'}>Krepšelis</Button>
                    <Button color="inherit" component={Link} to={'/kurtiRestorana'}>Kurti restoraną</Button>
                    <Button color="inherit" component={Link} to={'/naudotojas'}>Naudotojas</Button>

                </Toolbar>
            </AppBar>
            <Outlet />
        </Box>
    );
}