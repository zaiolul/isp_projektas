import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';
import { TextField, Button, Container, Box, Alert, InputLabel, Select, MenuItem, FormControl, Typography} from '@mui/material';


const CreateForm = () => {
    const navigate = useNavigate();
    const [ingredientai, setingredientai] = useState([]);
    const [Pingredientai, Psetingredientai] = useState([]);
    const { restoranasId } = useParams();
    const [newPatiekalas, setNewPatiekalas] = useState({
        pavadinimas: '',
        kaina: 0,
        meniuKategorija: '',
        aprasymas: '',
        kalorijos: 0,
        tinkaVeganams: 0,
        astrumas: 1,
        fkRestoranasID: restoranasId,
    });
    function addCategory(event) {
        const selectedValue = event.target.value;
        if (!Pingredientai.some(item => item.id_Ingredientas === selectedValue.id_Ingredientas)) {
           
            Psetingredientai(prevIngredients => [...prevIngredients, selectedValue]);
        }
    }
    const [showAlert, setShowAlert] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPatiekalas((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    useEffect(() => {
        const fetchIngredientai = async () => {
            try {
                const response = await fetch('http://localhost:5031/api/patiekalas/ingredientai');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setingredientai(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchIngredientai();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5031/api/patiekalas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ patiekalas: newPatiekalas, ingredientai: Pingredientai })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const createdPatiekalas = await response.json();

            console.log('New Patiekalas created:', createdPatiekalas);
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
                navigate(-1);
            }, 2000);
        } catch (error) {
            console.error('Error creating new Patiekalas:', error);
        }
    };

    return (
        <div>
            <Navbar>
                <h1>Kurti patiekalą</h1>
                <Outlet />
            </Navbar>
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
                                value={newPatiekalas.pavadinimas}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Kaina"
                                name="kaina"
                                value={newPatiekalas.kaina}
                                type="number"
                                inputProps={{
                                    step: 'any',
                                }}
                                onChange={handleInputChange}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Meniu kategorija"
                                name="meniuKategorija"
                                value={newPatiekalas.meniuKategorija}
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
                                value={newPatiekalas.aprasymas}
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
                                value={newPatiekalas.kalorijos}
                                onChange={handleInputChange}
                            />
                            <FormControl variant="standard" sx={{ m: '1ch', minWidth: "30ch" }}>
                                <InputLabel id="atidarymoLaikas">Tinka veganams?</InputLabel>
                                <Select

                                    required
                                    name="tinkaVeganams"
                                    id="outlined-required"
                                    value={newPatiekalas.tinkaVeganams}
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
                                    value={newPatiekalas.astrumas}
                                    label="Aštrumas"
                                    onChange={handleInputChange}

                                >
                                    <MenuItem value={1}>Neaštru</MenuItem>
                                    <MenuItem value={2}>Aštru</MenuItem>
                                    <MenuItem value={3}>Labai aštru</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: "30ch" }}>
                                <InputLabel id="ingredientas">Pridėti ingredientą</InputLabel>
                                <Select
                                    required
                                    name="ingredientas"
                                    id="ingredientas"
                                    label="Kainų lygis"
                                    onChange={addCategory}
                                    helperText={Pingredientai.length === 0 ? "Laukas negali būti tuščias" : ""}
                                >
                                    {ingredientai.map((kat) => (
                                        <MenuItem key={kat.id_Ingredientas} value={kat}>
                                            {kat.pavadinimas}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {Pingredientai.length > 0 && (
                                    <Typography align="right" variant="body2">
                                        Pasirinktos kategorijos:
                                        {Pingredientai.map((kat) => (
                                            <Typography key={kat.id_Ingredientas} align="right" variant="body2" color="text.secondary">
                                                {kat.pavadinimas}
                                            </Typography>
                                        ))}
                                    </Typography>
                                )}
                            </FormControl>
                        </div>
                        <div>
                            <Button sx={{ width: '33ch', m: '1ch' }} variant="contained" type="submit">
                                Pridėti
                            </Button>

                            <Button onClick={() => navigate(-1)}>Grįžti</Button>
                            <br></br>
                            {showAlert && <Alert severity="success">Patiekalas pridėtas! Palaukite kelias sekundes.</Alert>}
                        </div>
                    </Box>
                </form>
            </Container>
        </div>
    );
};

export default CreateForm;
