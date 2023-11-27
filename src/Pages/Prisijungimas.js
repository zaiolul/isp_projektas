import * as React from 'react';
import Button1 from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import Box1 from '@mui/material/Box';
import TextField1 from '@mui/material/TextField';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


function prisijungimas() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Prisijungimas
                </Typography>
                <Box >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="El. paštas"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Slaptažodis"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Prisiminti"
                    />
                    <Link to="/home">
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >Prisijungti
                        </Button>
                    </Link>
                    <Link to="/registracija">
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: "white" }}
                        >Registracija
                        </Button>
                    </Link>
                    {/* <Link sx={{ margin: "auto" }} to="/registracija"> Registracija </Link> */}

                    <Outlet />
                
                </Box>
            </Box>

        </Container>

    );
}
export default prisijungimas;