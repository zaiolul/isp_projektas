import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Outlet, Link } from "react-router-dom";
import Navbar from '../navbar.jsx';

const tableStyle = {
    border: '10px solid #dddddd',
    borderCollapse: 'collapse',
    width: '100%',
};

const tdStyle = {
    border: '10px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
    color: 'black',
};

const thStyle = {
    border: '10px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    color: 'black',
};

function UzsakymuIstorija() {

    const [uzsakymai, setUzsakymai] = useState([]);

    useEffect(() => {
        fetchUzsakymai();
    }, []);

    const fetchUzsakymai = async () => {
        try {
            const klientasID = 1;// Add klientas id 
            const response = await fetch(`http://localhost:5031/Naudotojas/GetUzsakymai/${klientasID}`);
            const data = await response.json();
            console.log(data);
            setUzsakymai(data);
            console.log(uzsakymai);
        } catch (error) {
            console.error('Error fetching Uzsakymai:', error);
        }
    };

    useEffect(() => {
        console.log('Uzsakymai state:', uzsakymai);
    }, [uzsakymai]);
    return (
        <div>
            <Navbar>
                <h1>Užsakymų istorija</h1>
                <Outlet />
            </Navbar>
          
            <Button color="inherit" component={Link} to={'/naudotojas'}>Naudotojas</Button>
            <Outlet />

            <div>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Užsakymo ID</th>
                            <th style={thStyle}>Apmokėjimo Būdas</th>
                            <th style={thStyle}>Data</th>
                            <th style={thStyle}>Pilna Kaina</th>
                            <th style={thStyle}>Sumokėta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uzsakymai.map((uzsakymas) => (
                            <tr key={uzsakymas.uzsakymasID}>
                                <td style={tdStyle}>{uzsakymas.uzsakymasID}</td>
                                <td style={tdStyle}>{uzsakymas.apmokejimoBudas}</td>
                                <td style={tdStyle}>{new Date(uzsakymas.data).toLocaleString()}</td>
                                <td style={tdStyle}>{uzsakymas.pilnaKaina}</td>
                                <td style={tdStyle}>{uzsakymas.sumoketa === 1 ? 'Taip' : 'Ne'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default UzsakymuIstorija;