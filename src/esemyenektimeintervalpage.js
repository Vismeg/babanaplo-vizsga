import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export function EsemenyekSearchIntervallumPage() {
    const [date, setDate] = useState();
    const [date2, setDate2] = useState();
    const [esemeny, setEsemeny] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setEsemeny(null);
        try
        {
            const response = await axios.get(`http://localhost:5244/api/Esemenyek/SearchEsemenyIntervallum/${(date)},${(date2)}`);
            setEsemeny(response.data[0]);
        }
        catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className='m-auto p-5 text-center content bg-lavender'style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <label>
                    <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} />
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
export default EsemenyekSearchIntervallumPage;