import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export function SzuletesSearchIdPage() {
    const [babaId, setBabaId] = useState();
    const [szuletes, setSzuletes] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSzuletes(null);
        try {
            const response = await axios.get(`http://localhost:5244/api/Szuletes/SearchSzuletesId/${id}`);
            setSzuletes(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='m-auto p-5 text-center content bg-lavender'>
            <form onSubmit={handleSubmit}>
                <label>
                    ID:     <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </label>
                <button type="submit">Search</button>
            </form>

            {szuletes && (
                <div style={{ backgroundColor: "GhostWhite" }} className="card col-sm-3 d-inline-block m-1 p-2">
                    <p>ID: {szuletes.id}</p>
                    <p>Baba ID: {szuletes.babaId}</p>
                    <p>Dátum: {szuletes.data}</p>
                    <p>Súly: {szuletes.suly}</p>
                    <p>Magasság: {szuletes.magassag}</p>
                    <div className="card-body">
                        <NavLink key={szuletes.id} to={"/szuletesek/" + szuletes.id} style={{ fontSize: '20px', color: "Black" }}>
                            <h3> Megtekintem új lapon </h3>
                        </NavLink>
                        <br />
                        <br />
                        <NavLink key="y" to={`/mod-szuletes/${szuletes.id}`} style={{ fontSize: '20px', color: "Black" }} >
                            <i className="bi bi-pencil"> Módosítás</i>
                            <br />
                            <br />
                        </NavLink> &nbsp;&nbsp;
                        <NavLink key="x" to={`/del-szuletes/${szuletes.id}`} style={{ fontSize: '20px', color: "Black" }}>
                            <i className="bi bi-dash-square"> Törlés</i></NavLink>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SzuletesSearchIdPage;