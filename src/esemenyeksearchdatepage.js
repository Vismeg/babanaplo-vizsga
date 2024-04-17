import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export function EsemenyekSearchDatePage() {
    const [date, setDate] = useState();
    const [esemeny, setEsemeny] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setEsemeny(null);
        console.log("search date: " + date);
        console.log("search date type: " + typeof(date));
        try
        {
            const response = await axios.get(`http://localhost:5244/api/Esmenyek/SearchEsemenyDatum/${(date)}`);
            setEsemeny(response.data[0]);
        }
        catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='m-auto p-5 text-center content bg-lavender'>
            <form onSubmit={handleSubmit}>
                <label>
                    Dátum: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <button type="submit">Search</button>
            </form>
            {esemeny && (
                <div style={{backgroundColor: "GhostWhite" }} className="card col-sm-3 d-inline-block m-1 p-2">
                    <p>ID: {esemeny.id}</p>
                    <p>Baba ID: {esemeny.babaId}</p>
                    <p>Megnevezés: {esemeny.megnevezes}</p>
                    <p>Elsőalkalom volt?: {(esemeny.elsoalkalom) ? "Igen" : "Nem"}</p>
                    <p>Történet: {esemeny.tortenet}</p>
                    <p>Dátum: {esemeny.datum}</p>
                    <NavLink key={esemeny.id} to={"/esemenyek/" + esemeny.id}>
                    <img alt={esemeny.nev}
                                        className="img-fluid"
                                        style={{ maxHeight: 300 }}
                                        src={'data:image/jpeg;base64,' + esemeny.kep} /></NavLink>
                    <div className="card-body">
                        <br />
                        <br />
                        <NavLink key="y" to={`/mod-esemenyek/${esemeny.id}`} style={{ fontSize: '20px', color: "Black" }} >
                            <i className="bi bi-pencil"> Módosítás</i>
                            <br />
                            <br />
                        </NavLink> &nbsp;&nbsp;
                        <NavLink key="x" to={`/del-esemenyek/${esemeny.id}`} style={{ fontSize: '20px', color: "Black" }}>
                            <i className="bi bi-dash-square"> Törlés</i></NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EsemenyekSearchDatePage;