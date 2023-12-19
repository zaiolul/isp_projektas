import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';

function Naudotojas() {

    const [naudotojas, setNaudotojas] = useState(null);
    const [editableNaudotojas, setEditableNaudotojas] = useState(null);
    const [isEditing, setIsEditing] = useState(false);


    
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            console.log("updating user");
            const klientasID = 1;
            await fetch(`http://localhost:5031/Naudotojas/UpdateUserData/${klientasID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editableNaudotojas),
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating Naudotojas:', error);
        }
    };

    const handleCancelClick = () => {
        setEditableNaudotojas(naudotojas);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        setEditableNaudotojas({
            ...editableNaudotojas,
            [e.target.name]: e.target.value,
        });
    };


    useEffect(() => {
        console.log("hi");
        const fetchNaudotojas = async () => {
            try {
                const klientasID = 1;
                const response = await fetch(`http://localhost:5031/Naudotojas/GetUserData/${klientasID}`);
                const data = await response.json();
                console.log(data);
                setNaudotojas(data);
                setEditableNaudotojas(data);

            } catch (error) {
                console.error('Error fetching Uzsakymai:', error);
            }
        };

       
        fetchNaudotojas();
    }, []);

    return (
        <div>
            <Navbar>
                <h1>Naudotojas</h1>
                <Outlet />
            </Navbar>

            {isEditing ? (
                <div>
                    <Button onClick={handleSaveClick}>Save</Button>
                    <Button onClick={handleCancelClick}>Cancel</Button>
                </div>
            ) : (
                <Button onClick={handleEditClick}>Edit</Button>
            )}

            
            <div>
                <h1>Naudotojas Informacija</h1>
                {isEditing ? (
                    <div>
                        
                       <p> <input
                            type="text"
                            name="slapyvardis"
                            value={editableNaudotojas.slapyvardis}
                            onChange={handleInputChange}
                        /></p>
                        <p><input
                            type="text"
                            name="elPastas"
                            value={editableNaudotojas.elPastas}
                            onChange={handleInputChange}
                        /></p>
                        <p><input
                            type="text"
                            name="Miestas"
                            value={editableNaudotojas.miestas}
                            onChange={handleInputChange}
                        /></p>
                        <p><input
                            type="text"
                            name="telnumeris"
                            value={editableNaudotojas.telNumeris}
                            onChange={handleInputChange}
                        /></p>
                        
                    </div>
                ) : (
                    naudotojas ? (
                        <div>
                            
                            <p><strong>Slapyvardis:</strong> {naudotojas.slapyvardis}</p>
                            <p><strong>El. Pastas:</strong> {naudotojas.elPastas}</p>
                            <p><strong>Vardas:</strong> {naudotojas.vardas}</p>
                                <p><strong>Pavarde:</strong> {naudotojas.pavarde}</p>
                                <p><strong>Miestas:</strong> {naudotojas.miestas}</p>
                                <p><strong>Tel. numeris:</strong> {naudotojas.telNumeris}</p>



                        </div>
                    ) : (
                        <p>Loading...</p>
                    )
                )}
            </div>
        </div>
    );
}

export default Naudotojas;