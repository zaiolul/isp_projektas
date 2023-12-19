import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';
import Box from '@mui/material/Box';
import { TextField, Button, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


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
                                type="number"
                                inputProps={{
                                    step: 'any',
                                }}
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
                                inputProps={{
                                    pattern: '[0-9]*',
                                }}
                                value={updatedPatiekalas.kalorijos}
                                onChange={handleInputChange}
                            />
                            <FormControl variant="standard" sx={{ m: '1ch', minWidth: "30ch" }}>
                                <InputLabel id="atidarymoLaikas">Tinka veganams?</InputLabel>
                                <Select

                                    required
                                    name="tinkaVeganams"
                                    id="outlined-required"
                                    value={updatedPatiekalas.tinkaVeganams}
                                    label="Tinka veganams"
                                    onChange={handleInputChange}

                                >
                                    <MenuItem value={0}>Netinka</MenuItem>)
                                    <MenuItem value={1}>Tinka</MenuItem>)
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" sx={{ m: '1ch', minWidth: "30ch" }}>
                                <InputLabel id="atidarymoLaikas">Aštrumas</InputLabel>
                                <Select

                                    required
                                    name="astrumas"
                                    id="outlined-required"
                                    value={updatedPatiekalas.astrumas}
                                    label="Aštrumas"
                                    onChange={handleInputChange}

                                >
                                    <MenuItem value={1}>Neaštru</MenuItem>
                                    <MenuItem value={2}>Aštru</MenuItem>
                                    <MenuItem value={3}>Labai aštru</MenuItem>
                                </Select>
                            </FormControl>
                          
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