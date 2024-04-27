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
                    <p><b>ID:</b> {kedvenc.id}</p>
                    <p><b>Baba ID:</b> {kedvenc.babaId}</p>
                    <p><b>Ital:</b> {kedvenc.ital}</p>
                    <p><b>Játék:</b> {kedvenc.jatek}</p>
                    <p><b>Mese:</b> {kedvenc.mese}</p>
                    <p><b>Mondóka:</b> {kedvenc.mondoka}</p>
                    <p><b>Étel:</b> {kedvenc.etel}</p>
                    <div className="card-body">
                        <NavLink key={kedvenc.id} to={"/kedvencek/" + kedvenc.id} style={{ fontSize: '20px', color: "Black" }}>
                            <h3 type="button" class="btn btn-info"> Megtekintem új lapon </h3>
                        </NavLink>
                        <br />
                        <br />
                        <NavLink key="y" to={`/mod-kedvencek/${kedvenc.id}`} style={{ fontSize: '20px', color: "Black" }} >
                            <span className="bi bi-pencil btn btn-warning"> Módosítás</span>
                            <br />
                            <br />
                        </NavLink> &nbsp;&nbsp;
                        <NavLink key="x" to={`/del-kedvencek/${kedvenc.id}`} style={{ fontSize: '20px', color: "Black" }}>
                            <span className="bi bi-dash-square btn btn-danger"> Törlés</span></NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KedvencekSearchIdPage;