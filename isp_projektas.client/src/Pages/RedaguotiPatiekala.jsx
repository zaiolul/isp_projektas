import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';
import Box from '@mui/material/Box';
import { TextField, Button, Container } from '@mui/material';


const UpdateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [updatedPatiekalas, setUpdatedPatiekalas] = useState({
        pavadinimas: '',
        kaina: 0,
        kategorija: '',
        meniuKategorija: '',
        aprasymas: '',
        kalorijos: 0,
        tinkaVeganams: '',
        astrumas: 0,
    });

    useEffect(() => {
        const fetchPatiekalas = async () => {
            try {
                const response = await fetch(`http://localhost:5031/api/patiekalas/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const patiekalasData = await response.json();

                // Set the current data to the state
                setUpdatedPatiekalas(patiekalasData);
            } catch (error) {
                console.error('Error fetching patiekalas:', error);
            }
        };

        fetchPatiekalas();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedPatiekalas((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5031/api/patiekalas/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPatiekalas),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            navigate(-1);
        } catch (error) {
            console.error('Error updating patiekalas:', error);
        }
    };

    return (
        <div>
            <div>
                <Navbar>
                    <h1>Redaguoti patiekalą</h1>
                    <Outlet />
                </Navbar>
            </div>
            <br>
            </br>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Box
                        component="div"
                        sx={{
                            '& .MuiTextField-root': { m: '1ch', width: '30ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Pavadinimas"
                                name="pavadinimas"
                                value={updatedPatiekalas.pavadinimas}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Kaina"
                                name="kaina"
                                value={updatedPatiekalas.kaina}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Meniu kategorija"
                                name="kategorija"
                                value={updatedPatiekalas.meniuKategorija}
                                onChange={handleInputChange}
                            />
                        </div>
                    </Box>
                    <Box
                        component="div"
                        sx={{
                            '& .MuiTextField-root': { m: '1ch', width: '94ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Aprašymas"
                                name="aprasymas"
                                value={updatedPatiekalas.aprasymas}
                                onChange={handleInputChange}
                            />
                        </div>
                    </Box>
                    <Box
                        component="div"
                        sx={{
                            '& .MuiTextField-root': { m: '1ch', width: '30ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="Kalorijos"
                                name="kalorijos"
                                value={updatedPatiekalas.kalorijos}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Tinka veganams"
                                name="tinkaVeganams"
                                value={updatedPatiekalas.tinkaVeganams}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Aštrumas"
                                name="astrumas"
                                value={updatedPatiekalas.astrumas}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <Button sx={{ width: '33ch', m: '1ch' }} variant="contained" type="submit">
                                Atnaujinti
                            </Button>
                            <Button onClick={() => navigate(-1)}>Grįžti</Button>
                        </div>
                    </Box>
                </form>
            </Container>
        </div>
    );
};

export default UpdateForm;