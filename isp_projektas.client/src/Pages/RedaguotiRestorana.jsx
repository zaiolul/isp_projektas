
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Container, Box, InputLabel, MenuItem, Input, Typography } from '@mui/material';

import { Select, FormControl } from "@mui/material";
import API_URL from "../utils/API.js";




function kurtiRestorana() {

    const { id } = useParams();
    const navigate = useNavigate();


    const location = useLocation();
    const [restaurant, setRestaurant] = useState({
        pavadinimas: "a",
        miestas: "a",
        adresas: "a",
        saskaita: "a",
        uzsakymoMokestis: 0,
        aprasymas: "a",
        telNumeris: "a",
        atidarymoLaikas: "a",
        uzdarymoLaikas: "a",
        minimaliUzsakymoSuma: 0,
        brangumas: 1,
        nuotrauka: "a",
        idValdytojas: 1
    });
    
    const [categories, _setCategories] = useState([]);
    
    function addCategory(val) {
        let temp = Array(0);
        for (let i = 0; i < categories.length; i++) {
            temp.push(categories[i])
        }
        if(!temp.includes(val.target.val))
            temp.push(val.target.value);
        _setCategories(temp);
        
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRestaurant((prevData) => ({
            ...prevData,
            [name]: value,
        }));

    };

    const laikai = Array.from(Array(25).keys());
    const kategorijos = ["Suši", "Pica", "Lietuviškas", "Kinietiškas", "Amerikietiškas", "Burgeriai", "Desertai"];

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(API_URL + `/restoranas${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({restoranas: restaurant, kategorijos: categories})
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const res = await response.json();

            console.log('New restaurant created:', res);
            navigate(-1);
        } catch (error) {
            console.error('Error creating new restaurant:', error);
        }
    };

    useEffect(() => {
        // if(location) {
        //     let tmp = location.pathName.slice(location.pathName.lastIndexOf("/") , location.pathName.length) ;
        //     console.log(tmp)
        // }
        const fetchRestoranas = async () => {
            const restoranasResponse = await fetch(`http://localhost:5031/api/restoranas/${id}`);
            if (!restoranasResponse.ok) {
                throw new Error(`HTTP error! Status: ${restoranasResponse.status}`);
            }

            const restoranasData = await restoranasResponse.json();
            console.log(id);
            console.log(restoranasData)
            setRestaurant(restoranasData);
           
        };
       
        fetchRestoranas();
    
    }, [id]);
    return (
        <div>

            <Navbar>
                <h1>Kurti Restoraną</h1>
                <Outlet />
            </Navbar>


            <Button onClick={() => navigate(-1)}>
                
               Atgal į restoraną
                {id}
            </Button>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <form onSubmit={handleSubmit} >
                    <Box
                        component="div"
                        sx={{
                            '& .MuiTextField-root': { m: '1ch', width: '40ch' },
                        }}

                        autoComplete="off"
                    >

                        <TextField
                            required
                            id="outlined-required"
                            label="Pavadinimas"
                            name="pavadinimas"
                            value={restaurant.pavadinimas}
                            onChange={handleInputChange}

                            helperText={restaurant.pavadinimas === "" ? "Laukas negali būti tuščias" : ""}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Miestas"
                            name="miestas"
                            value={restaurant.miestas}
                            onChange={handleInputChange}
                            helperText={restaurant.miestas === "" ? "Laukas negali būti tuščias" : ""}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Adresas"
                            name="adresas"
                            value={restaurant.adresas}
                            onChange={handleInputChange}
                            helperText={restaurant.adresas === "" ? "Laukas negali būti tuščias" : ""}
                        />

                    </Box>
                    <Box
                        component="div"
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                sx={{ m: '1ch', width: '40ch' }}
                                required
                                id="outlined-required"
                                label="Tel. Numeris"
                                name="telNumeris"
                                value={restaurant.telNumeris}
                                onChange={handleInputChange}
                                helperText={restaurant.telNumeris === "" ? "Laukas negali būti tuščias" : ""}
                            />
                            <TextField
                                required
                                sx={{ m: '1ch', width: '40ch' }}
                                id="outlined-required"
                                label="Banko sąskaita"
                                name="saskaita"
                                value={restaurant.saskaita}
                                onChange={handleInputChange}
                                helperText={restaurant.saskaita === "" ? "Laukas negali būti tuščias" : ""}
                            />
                            <TextField
                                sx={{ m: '1ch', width: '19ch' }}
                                required
                                id="outlined-required"
                                label="Pristatymo mokęstis"
                                name="uzsakymoMokestis"
                                type="number"
                                inputProps={{
                                    step: 'any',
                                }}
                                value={restaurant.uzsakymoMokestis}
                                onChange={handleInputChange}
                                helperText={restaurant.uzsakymoMokestis === "" ? "Laukas negali būti tuščias" : ""}
                            />
                            <TextField
                                sx={{ m: '1ch', width: '19ch' }}
                                required
                                id="outlined-required"
                                label="Min. užsakymo kaina"
                                name="minimaliUzsakymoSuma"
                                type="number"
                                inputProps={{
                                    step: 'any',
                                }}
                                value={restaurant.minimaliUzsakymoSuma}
                                onChange={handleInputChange}
                                helperText={restaurant.minimaliUzsakymoSuma === "" ? "Laukas negali būti tuščias" : ""}
                            />

                        </div>
                    </Box>
                    <Box
                        component="div"
                        sx={{
                            '& .MuiTextField-root': { m: '1ch', width: '124ch' },

                        }}

                        autoComplete="off"
                    >
                        <TextField
                            required
                            id="outlined-required"
                            label="Restorano aprašymas"
                            name="aprasymas"
                            value={restaurant.aprasymas}
                            onChange={handleInputChange}
                            helperText={restaurant.aprasymas === "" ? "Laukas negali būti tuščias" : ""}
                        />
                    </Box>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: "30ch" }}>
                        <InputLabel id="atidarymoLaikas">Atidarymo laikas</InputLabel>
                        <Select

                            required
                            name="atidarymoLaikas"
                            id="atidarymoLaikas"
                            value={restaurant.atidarymoLaikas}
                            label="Atidarymo laikas"
                            onChange={handleInputChange}
                            helperText={restaurant.atidarymoLaikas === "" ? "Laukas negali būti tuščias" : ""}
                        >
                            {laikai.map((laikas) => <MenuItem value={laikas + ":00"}>{laikas + ":00"}</MenuItem>)}
                        </Select>
                    </FormControl>


                    <FormControl variant="standard" sx={{ m: 1, minWidth: "30ch" }}>
                        <InputLabel id="uzdarymoLaikas">Uždarymo laikas</InputLabel>
                        <Select
                            required
                            name="uzdarymoLaikas"
                            id="uzdarymoLaikas"
                            value={restaurant.uzdarymoLaikas}
                            label="Uždarymo laikas"
                            onChange={handleInputChange}
                            helperText={restaurant.uzdarymoLaikas === "" ? "Laukas negali būti tuščias" : ""}
                        >
                            {laikai.map((laikas) => <MenuItem value={laikas + ":00"}>{laikas + ":00"}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: "30ch" }}>
                        <InputLabel id="brangumas">Kainų lygis</InputLabel>
                        <Select

                            required
                            name="brangumas"
                            id="brangumas"
                            value={restaurant.kaina}
                            label="Kainų lygis"
                            onChange={handleInputChange}
                            helperText={restaurant.brangumas === "" ? "Laukas negali būti tuščias" : ""}
                        >
                            {["žema", "vidutinė", "aukšta"].map((kaina, index) => <MenuItem value={index + 1}>{kaina}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: "30ch" }}>
                        <InputLabel id="kategorija">Pridėti kategoriją</InputLabel>
                        <Select

                            required
                            name="kategorija"
                            id="kategorija"

                            label="Kainų lygis"
                            onChange={addCategory}
                            helperText={categories == [] ? "Laukas negali būti tuščias" : ""}
                        >
                            {kategorijos.map((kat, index) => <MenuItem value={index}>{kat}</MenuItem>)}
                        </Select>
                        {categories.length > 0 && <Typography align="right " variant="body2" >
                            Pasirinktos kategorijos:
                            {categories.map((kat) => <Typography align="right " variant="body2" color="text.secondary">{kategorijos[kat]}</Typography>)

                            }
                        </Typography>}
                    </FormControl>

                    <Box
                        component="div"
                        sx={{
                            '& .MuiTextField-root': { m: '1ch', width: '30ch', mt: 10 },
                        }}
                        noValidate
                        autoComplete="off"
                        align={"center"}
                    >

                        <div>
                            <Button sx={{ width: '33ch', m: '1ch' }} variant="contained" type="submit">
                                Kurti
                            </Button>
                            {/* <Button onClick={() => navigate(-1)}>Grįžti</Button> */}
                        </div>
                    </Box>
                </form>
            </Container>
        </div>
    );
}
export default kurtiRestorana;


