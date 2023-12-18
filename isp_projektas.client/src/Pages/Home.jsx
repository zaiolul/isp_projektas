import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';
import ReactDOM from 'react-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
function LinksHome() {
    const [restoranai, setRestoranai] = useState([]);

    useEffect(() => {
        const fetchRestoranai = async () => {
            try {
                const response = await fetch('http://localhost:5031/api/restoranas');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setRestoranai(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRestoranai();
    }, []);
    return (
        <div>
            <Navbar>
                <h1>Pagrindinis</h1>
                <Outlet />
            </Navbar>
            <div>
                {restoranai.map((restoranas) => (
                    <Card key={restoranas.restoranasID}
                        sx={{ maxWidth: 700, margin: 'auto', marginTop: 5 }}
                    >
                        <CardActionArea component={Link} to={`/restoranas/${restoranas.restoranasID}`}>
                            <CardMedia
                                component="img"
                                height="200"
                                alt={restoranas.nuotrauka}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {restoranas.pavadinimas}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {restoranas.aprasymas}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
        </div>
    );
}
export default LinksHome;