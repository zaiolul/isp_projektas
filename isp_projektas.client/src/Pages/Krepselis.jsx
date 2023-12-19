import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';

function Krepselis() {
    const [uzsakymai, setUzsakymai] = useState([]);
    const [krepselioPrekes, setKrepselioPrekes] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [kiekisToUpdate, setKiekisToUpdate] = useState({});
    const [quantityErrors, setQuantityErrors] = useState({});

    useEffect(() => {
        fetchUzsakymai();
    }, []);

    const fetchUzsakymai = async () => {
        try {
            const klientasID = 1;// Add klientas id 
            const response = await fetch(`http://localhost:5031/Uzsakymas/ByKlientasID/${klientasID}`);
            const data = await response.json();
            console.log(data);
            setUzsakymai(data);

            if (data.length > 0) {
                const firstUzsakymasID = data[0].uzsakymasID;
                fetchKrepselioPrekes(firstUzsakymasID);
            }
        } catch (error) {
            console.error('Error fetching Uzsakymai:', error);
        }
    };
   
    const fetchKrepselioPrekes = async (uzsakymasID) => {
        try {
            const response = await fetch(`http://localhost:5031/Uzsakymas/byUzsakymasID/${uzsakymasID}`);
            const data = await response.json();
            console.log(data);
            setKrepselioPrekes(data);

            const total = data.reduce((acc, preke) => acc + preke.patiekalasKaina * preke.kiekis, 0);
            setTotalPrice(total);
            saveTotalPriceToLocalStorage(total);
        } catch (error) {
            console.error('Error fetching KrepselioPrekes:', error);
        }
    };

    const handleDelete = async (krepselioPrekeID) => {
        try {
            const response = await fetch(`http://localhost:5031/Uzsakymas/${krepselioPrekeID}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Failed to delete KrepselioPreke');
            }
        } catch (error) {
            console.error('Error deleting KrepselioPreke:', error);
        }
    };

    const handleKeisti = async (krepselioPrekeID) => {
        const updatedQuantity = kiekisToUpdate[krepselioPrekeID];

        if (updatedQuantity > 0 || updatedQuantity == null) {
            setQuantityErrors((prevErrors) => ({ ...prevErrors, [krepselioPrekeID]: null }));

            try {
                const response = await fetch(`http://localhost:5031/Uzsakymas/KeistiKieki/${krepselioPrekeID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ kiekis: updatedQuantity }),
                });

                if (response.ok) {
                    window.location.reload();
                } else {
                    console.error('Failed to update Kiekis');
                }
            } catch (error) {
                console.error('Error updating Kiekis:', error);
            }
        } else {
            setQuantityErrors((prevErrors) => ({ ...prevErrors, [krepselioPrekeID]: 'Klaida! Įvestas netinkamas kiekis.' }));
        }
    };

    const saveTotalPriceToLocalStorage = (price) => {
        localStorage.setItem('galutineKaina', price);
    };

    return (
        <div>   
            <Navbar>
                <h1>Apmokejimas</h1>
                <Outlet />
            </Navbar>
            <h1>Krepšelis</h1>
            <Button>
                <Link to="/apmokejimas">Apmokėjimas</Link>
                <Outlet />
            </Button>

            <div>
                <h2>Krepšelio Prekės</h2>
                
                <ul>
                    {krepselioPrekes.map((preke) => (
                        <li key={preke.krepselioPrekeID}>
                            <strong>Kiekis:</strong> {preke.kiekis}, <strong>Kaina:</strong> {preke.patiekalasKaina} €, <strong>Patiekalas:</strong> {preke.patiekalasPavadinimas}, <strong>Restoranas:</strong> {preke.restoranasPavadinimas}, <strong>Keisti kiekį:</strong>
                            <span style={{ marginRight: '8px' }}>
                                <input
                                    type="text"
                                    size="1"
                                    value={kiekisToUpdate[preke.krepselioPrekeID] || ''}
                                    onChange={(e) => setKiekisToUpdate({ ...kiekisToUpdate, [preke.krepselioPrekeID]: e.target.value })}
                                />
                            </span>
                            <Button onClick={() => handleKeisti(preke.krepselioPrekeID)}>
                                Keisti
                            </Button>
                            <Button onClick={() => handleDelete(preke.krepselioPrekeID)}>
                                Istrinti
                            </Button>
                            {quantityErrors[preke.krepselioPrekeID] && (
                                <span style={{ color: 'red', marginLeft: '8px' }}>
                                    {quantityErrors[preke.krepselioPrekeID]}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <strong>Galutinė kaina:</strong> {totalPrice} €
            </div>
        </div>
    );
}

export default Krepselis;
