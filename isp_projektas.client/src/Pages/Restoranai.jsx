import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link, useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar.jsx';
import CardActions from '@mui/material/CardActions';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

import DeleteDialog from '../utils/ConfirmDelete';

import {
    setKey,
    setDefaults,
    setLanguage,
    setRegion,
    fromAddress,
    fromLatLng,
    fromPlaceId,
    setLocationType,
    geocode,
    RequestType,
} from "react-geocode";
import { GoogleMap } from '@react-google-maps/api';
import {
    APIProvider,
    Map,
    InfoWindow,
  } from "@vis.gl/react-google-maps";
  

function DoMap(val){
    
    const [center, setCenter] = useState({lat:0, lng:0})
    setDefaults({
        key: "AIzaSyDSblczDOlYVyG9JxSVVo2og0-mDeqX9Vc", // Your API key here.
        language: "en", // Default language for responses.
        region: "lt", // Default region for responses.
    });

    let address = String(val.restoranas.adresas + " " +val.restoranas.miestas)
    console.log(address)
    fromAddress(address)
    .then(({ results }) => {
      let coords = results[0].geometry.location;
        console.log(coords)
        setCenter(coords)
    })
   
    
    return(
    <APIProvider apiKey={"AIzaSyDSblczDOlYVyG9JxSVVo2og0-mDeqX9Vc"}>
    <div style={{ height: 500, width: "100%" }}>
      <Map zoom={20} center={center}>
      
      </Map>
    </div>
  </APIProvider>
  )
  }

export default function Restoranai() {
    const { restoranasId } = useParams();
    const [patiekalai, setPatiekalai] = useState([]);
    const [restoranas, setRestoranas] = useState(null);


    //Uzsakymo id reikia pasiimti
    const addToBasket = async (patiekalasId) => {
        try {
            const klientasID = 1;// Add klientas id 
            const uzsakymasResponse = await fetch(`http://localhost:5031/Uzsakymas/ByKlientasID/${klientasID}`);
            const uzsakymasData = await uzsakymasResponse.json();

            const uzsakymasID = uzsakymasData[0].uzsakymasID;

            console.log("uzsakymas id", uzsakymasID)

            const response = await fetch('http://localhost:5031/Uzsakymas/AddKrepselioPreke', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Kiekis: 1, 
                    FKPatiekalasID: patiekalasId,
                    FKUzsakymasID: uzsakymasID, 
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const newKrepselioPreke = await response.json();
            console.log('Added to Basket:', newKrepselioPreke);
        } catch (error) {
            console.error('Error adding to Basket:', error);
        }
    };


    const [kategorijos, setKategorijos] = useState(null);

 
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const navigate = useNavigate();
    
    function deleteRestoranasWrap(){
        deleteRestoranas(restoranas.restoranasID)
        navigate("/home")
    }
    const deleteRestoranas = async (id) => {
        try {
            const response = await fetch(`http://localhost:5031/api/restoranas/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

           
         
            const updatedRestoranas = await fetch(`http://localhost:5031/api/restoranas`);

            if (updatedRestoranas.ok) {
                const updatedRestoranasData = await updatedRestoranas.json();
                setRestoranas(updatedRestoranas);
            } else {
                throw new Error(`HTTP error! Status: ${updatedPatiekalaiResponse.status}`);
            }

        } catch (error) {
            console.error('Error deleting Patiekalas:', error);
        }
    };
  
    const deletePatiekalas = async (id) => {
        try {
            const response = await fetch(`http://localhost:5031/api/patiekalas/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const deletedPatiekalas = await response.json();
            console.log('Deleted Patiekalas:', deletedPatiekalas);

            const updatedPatiekalaiResponse = await fetch(`http://localhost:5031/api/patiekalas/byRestoranas/${restoranasId}`);
            if (updatedPatiekalaiResponse.ok) {
                const updatedPatiekalaiData = await updatedPatiekalaiResponse.json();
                setPatiekalai(updatedPatiekalaiData);
            } else {
                throw new Error(`HTTP error! Status: ${updatedPatiekalaiResponse.status}`);
            }
        } catch (error) {
            console.error('Error deleting Patiekalas:', error);
        }
    };

    useEffect(() => {
        const fetchPatiekalai = async () => {
            const patiekalaiResponse = await fetch(`http://localhost:5031/api/patiekalas/byRestoranas/${restoranasId}`);
            if (!patiekalaiResponse.ok) {
                throw new Error(`HTTP error! Status: ${patiekalaiResponse.status}`);
            }

            const patiekalaiData = await patiekalaiResponse.json();
            setPatiekalai(patiekalaiData);
        };

        const fetchRestoranas = async () => {
            const restoranasResponse = await fetch(`http://localhost:5031/api/restoranas/${restoranasId}`);
            if (!restoranasResponse.ok) {
                throw new Error(`HTTP error! Status: ${restoranasResponse.status}`);
            }

            const restoranasData = await restoranasResponse.json();
            console.log(restoranasData)
            setRestoranas(restoranasData);

        };

        const fetchKategorijos = async () => {
            const kategorijosResponse = await fetch(`http://localhost:5031/api/restoranas/${restoranasId}/kategorijos`);
            if (!kategorijosResponse.ok) {
                throw new Error(`HTTP error! Status: ${kategorijosResponse.status}`);
            }

            const kategorijosData = await kategorijosResponse.json();
            setKategorijos(kategorijosData);
            console.log(kategorijosData);
        };

        fetchPatiekalai();
        fetchRestoranas();
        fetchKategorijos();
        
      
    }, [restoranasId]);


  
    return (
        <div>
            
            <Navbar>
                <Outlet />
            </Navbar>
               
            {restoranas && patiekalai ? (
                <div>
                    <h1></h1>
                    <DoMap restoranas={restoranas}></DoMap>
                    <Card sx={{ maxWidth: 800, margin: 'auto', marginTop: 5 }}>
                   
                        <CardContent>
                            <Typography gutterBottom variant="h3" style={{ color: '#ffa726' }} component="div">

                                {restoranas.pavadinimas}

                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {restoranas.miestas}, {restoranas.adresas}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {restoranas.aprasymas}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                component={Link}
                                to={`/redaguotiRestorana/${restoranasId}`}
                            >Redaguoti restorano informaciją</Button>
                            {/* <Button align="right" size="small" onClick={() => {deleteRestoranas(restoranas.restoranasID), navigate("/home")}}> Pašalinti </Button> */}
                            <DeleteDialog deleteFunc={deleteRestoranasWrap} ></DeleteDialog>
                        </CardActions>
                    </Card>

                    <Card sx={{ maxWidth: 700, margin: 'auto', marginTop: 5 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">

                                Naujas patiekalas

                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Aprašymas
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                component={Link}
                                to={`/KurtiPatiekala/${restoranasId}`}
                            >Kurti naują patiekalą </Button>
                        </CardActions>
                    </Card>

                    <div>
                        {patiekalai.map((patiekalas) => (
                            <div key={patiekalas.PatiekalasID}>
                                <Card sx={{ maxWidth: 700, margin: "auto", marginTop: 5 }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">

                                            {patiekalas.pavadinimas}

                                            <Typography align="right " variant="body2" color="text.secondary">
                                                {patiekalas.tinkaVeganams === 1 && <EnergySavingsLeafIcon style={{ color: "#88cc00" }} />}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {patiekalas.astrumas === 2 && <WhatshotIcon style={{ color: "#ffbf00" }} />}
                                            {patiekalas.astrumas === 3 && (
                                                <>
                                                    <WhatshotIcon style={{ color: "#ffbf00" }} />
                                                    <WhatshotIcon style={{ color: "#ffbf00" }} />
                                                </>
                                            )}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            {patiekalas.aprasymas}
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => addToBasket(patiekalas.patiekalasID)}>
                                            Įdėti į krepšelį
                                        </Button>
                                        <Button disabled style={{ color: '#ffa726' }} size="small">{patiekalas.kaina} €</Button>
                                        <Button align="right" size="small" onClick={() => deletePatiekalas(patiekalas.patiekalasID)}> Pašalinti </Button>
                                        <Button align="right"
                                            component={Link}
                                            to={`/RedaguotiPatiekala/${patiekalas.patiekalasID}`}
                                            size="small"
                                        >Redaguoti </Button>
                                    </CardActions>
                                </Card>
                            </div>
                        ))}

                    </div>
                </div>
            ) : (
                <p>Krauna...</p>
            )}

        </div>

    );
}