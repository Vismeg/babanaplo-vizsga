import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export function NovekedesSearchIdPage() {
    const [id, setId] = useState();
    const [novekedes, setNovekedes] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setNovekedes(null);
        try {
            const response = await axios.get(`http://localhost:5244/api/Novekedes/SearchNovekedesId/${id}`);
            setNovekedes(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='m-auto p-5 text-center content bg-lavender'style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
            <form onSubmit={handleSubmit}>
                <label>
                    ID:     <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </label>
                <button type="submit">Keresés</button>
            </form>
            {novekedes && (
                <div style={{ backgroundColor: "GhostWhite" }} className="card col-sm-3 d-inline-block m-1 p-2">
                    <p>ID: {novekedes.id}</p>
                    <p>Baba ID: {novekedes.babaId}</p>
                    <p>Dátum: {novekedes.data}</p>
                    <p>Súly: {novekedes.suly}</p>
                    <p>Magasság: {novekedes.magassag}</p>
                    <div className="card-body">
                        <NavLink key={novekedes.id} to={"/novekedesek/" + novekedes.id} style={{ fontSize: '20px', color: "Black" }}>
                            <h3> Megtekintem új lapon </h3>
                        </NavLink>
                        <br />
                        <br />
                        <NavLink key="y" to={`/mod-novekedes/${novekedes.id}`} style={{ fontSize: '20px', color: "Black" }} >
                            <i className="bi bi-pencil btn btn-warning"> Módosítás</i>
                            <br />
                            <br />
                        </NavLink> &nbsp;&nbsp;
                        <NavLink key="x" to={`/del-novekedes/${novekedes.id}`} style={{ fontSize: '20px', color: "Black" }}>
                            <i className="bi bi-dash-square btn btn-danger"> Törlés</i></NavLink>
                    </div>
                </div>
            )}

        </div>
    );
};

export default NovekedesSearchIdPage;