import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export function KedvencekListPage() {
    const [kedvencek, setKedvencek] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    useEffect(() => {
        setFetchPending(true);
        fetch("http://localhost:5244/api/Kedvencek")
            .then((res) => res.json())
            .then((kedvencek) => setKedvencek(kedvencek))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);
    return (
        <div>
            <div className="m-auto" id="navbarNav" style={{height: "37px",backgroundColor: "rgb(42, 42, 50)" }}>
                <ul  className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to={'/searchid-kedvencek'}style={{fontSize: '20px', color: "LightGray"}} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                        &ensp; <i class="bi bi-search"> Id alapján </i>
                        </NavLink>
                    </li>
                </ul>
            </div>
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div className='m-auto p-5 text-center content bg-lavender'>
                    <h2>Kedvencek</h2>
                    <NavLink to={'/uj-kedvencek'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                    <button type="button" class="btn btn-info">Új kedvencek</button>
                    </NavLink>
                    {kedvencek.map((kedvenc) => (
                        <div style={{backgroundColor: "GhostWhite", textAlign: "left"}} className="card col-sm-3 d-inline-block m-1 p-2">
                            <p className="text-dark">BabaId: {kedvenc.babaId}</p>
                            <p className="text-dark">Ital: {kedvenc.ital}</p>
                            <p className="text-dark">Játék: {kedvenc.jatek}</p>
                            <p className="text-dark">Mese: {kedvenc.mese}</p>
                            <p className="text-dark">Mondóka: {kedvenc.mondoka}</p>
                            <p className="text-dark">Étel: {kedvenc.etel}</p>
                            <div className="card-body">
                                <NavLink key={kedvenc.id} to={"/kedvencek/" + kedvenc.id} style={{fontSize: '20px', color: "Black"}}>
                                <button type="button" class="btn btn-info"> Megtekintem új lapon </button>
                                </NavLink>
                                <br />
                                <br />
                                <NavLink key="y" to={`/mod-kedvencek/${kedvenc.id}`} style={{fontSize: '20px', color: "Black"}} >
                                <button type="button" className="bi bi-pencil btn btn-warning">Módosítás</button>
                                        <br />
                                        <br />
                                    </NavLink> 
                                <NavLink key="x" to={`/del-kedvencek/${kedvenc.id}`} style={{fontSize: '20px', color: "Black"}}>
                                <button type="button" className="btn btn-danger bi bi-dash-square">Törlés</button>
                                    </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default KedvencekListPage;