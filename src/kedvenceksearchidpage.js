import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export function KedvencekSearchIdPage() {
    const [id, setId] = useState();
    const [kedvenc, setKedvenc] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setKedvenc(null);
        try {
            const response = await axios.get(`http://localhost:5244/api/Kedvencek/SearchKedvencId/${id}`);
            setKedvenc(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='m-auto p-5 text-center content bg-lavender'style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
            <form onSubmit={handleSubmit}>
                <label>
                    ID:     <input type="text" value={id} onChange={(e) => setId(e.target.value)}/>
                </label>
                <button type="submit">Search</button>
            </form>

           
            {kedvenc && (
                <div style={{backgroundColor: "GhostWhite" ,backgroundColor: "GhostWhite" }} className="card col-sm-3 d-inline-block m-1 p-2">
                    <p>ID: {kedvenc.id}</p>
                    <p>Baba ID: {kedvenc.babaId}</p>
                    <p>Ital: {kedvenc.ital}</p>
                    <p>Játék: {kedvenc.jatek}</p>
                    <p>Mese: {kedvenc.mese}</p>
                    <p>Mondóka: {kedvenc.mondoka}</p>
                    <p>Étel: {kedvenc.etel}</p>
                    <div className="card-body">
                        <NavLink key={kedvenc.id} to={"/kedvencek/" + kedvenc.id} style={{ fontSize: '20px', color: "Black" }}>
                            <h3> Megtekintem új lapon </h3>
                        </NavLink>
                        <br />
                        <br />
                        <NavLink key="y" to={`/mod-kedvencek/${kedvenc.id}`} style={{ fontSize: '20px', color: "Black" }} >
                            <i className="bi bi-pencil"> Módosítás</i>
                            <br />
                            <br />
                        </NavLink> &nbsp;&nbsp;
                        <NavLink key="x" to={`/del-kedvencek/${kedvenc.id}`} style={{ fontSize: '20px', color: "Black" }}>
                            <i className="bi bi-dash-square"> Törlés</i></NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KedvencekSearchIdPage;