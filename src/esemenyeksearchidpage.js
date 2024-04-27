import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export function EsemenyekSearchIdPage() {
    const [id, setId] = useState();
    const [esemeny, setEsemeny] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setEsemeny(null);
        try {
            const response = await axios.get(`http://localhost:5244/api/Esemenyek/SearchEsemenyId/${id}`);
            setEsemeny(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='m-auto p-5 text-center content bg-lavender'style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
            <form onSubmit={handleSubmit}>
                <label>
                    ID:         <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </label>
                <button type="submit">Search</button>
            </form>
            {esemeny && (
                <div style={{backgroundColor: "GhostWhite" }} className="card col-sm-3 d-inline-block m-1 p-2">
                    <p><b>ID:</b> {esemeny.id}</p>
                    <p><b>Baba ID:</b> {esemeny.babaId}</p>
                    <p><b>Megnevezés:</b> {esemeny.megnevezes}</p>
                    <p><b>Történet:</b> {esemeny.tortenet}</p>
                    <p><b>Dátum:</b> {esemeny.datum}</p>
                    <NavLink key={esemeny.id} to={"/esemenyek/" + esemeny.id}>
                    <img alt={esemeny.nev}
                                        className="img-fluid"
                                        style={{ maxHeight: 300 }}
                                        src={'data:image/jpeg;base64,' + esemeny.kep} />
                    </NavLink>
                    <div className="card-body">
                        <NavLink key="y" to={`/mod-esemenyek/${esemeny.id}`} style={{ fontSize: '20px', color: "Black" }} >
                            <span className="bi bi-pencil btn btn-warning"> Módosítás</span>
                            <br />
                            <br />
                        </NavLink> &nbsp;&nbsp;
                        <NavLink key="x" to={`/del-esemenyek/${esemeny.id}`} style={{ fontSize: '20px', color: "Black" }}>
                            <span className="bi bi-dash-square btn btn-danger"> Törlés</span>
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EsemenyekSearchIdPage;