import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export function KedvencekListPage()
{
    const [kedvencek, setKedvencek] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    useEffect(() =>
    {
        setFetchPending(true);
        fetch(`https://localhost:7165/api/Kedvencek/${jwtDecode(localStorage.getItem("token")).sub}`)
            .then((res) => res.json())
            .then((kedvencek) => setKedvencek(kedvencek))
            .catch(console.log)
            .finally(() =>
            {
                setFetchPending(false);
            });
    }, []);
    return (
        <div>
            <div className="m-auto" id="navbarNav" style={{ height: "37px", backgroundColor: "rgb(42, 42, 50)" }}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to={'/searchid-kedvencek'} style={{ lineHeight: 1.2, fontSize: '16px', color: "LightGray" }} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                            &ensp; <i class="bi bi-search"> Id alapján </i>
                        </NavLink>
                    </li>
                </ul>
            </div>
            
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div className='m-auto p-5 text-center content bg-lavender' style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                    <h2 className='label-container'>Kedvencek</h2>
                    <br></br>

                    <NavLink to={'/uj-kedvencek'} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                        <button type="button" class="btn btn-info">Új kedvenc</button>
                    </NavLink>
                    {kedvencek.map((kedvenc) => (
                        <>
                            {kedvenc.kedvenceks.length > 0 && kedvenc.kedvenceks.map((item) => (
                                <div style={{ backgroundColor: "GhostWhite", textAlign: "left" }} className="card col-sm-3 d-inline-block m-1 p-2">
                                    <p  key={item.id}>
                                        <b>Név:</b> {kedvenc.nev}<br />
                                        <b>Játék:</b> {item.jatek}<br />
                                        <b>Mese:</b> {item.mese}<br />
                                        <b>Mondóka:</b> {(item.mondoka)}<br />
                                        <b>Étel:</b> {item.etel}<br />
                                        <b>Ital:</b> {item.ital}<br />
                                    </p>

                                    <div className="card-body">
                                        <NavLink key={item.id} to={"/kedvencek/" + item.id} style={{ fontSize: '20px', color: "Black" }}>
                                            <button type="button" class="btn btn-info"> Megtekintem új lapon </button>
                                        </NavLink>
                                        <br />
                                        <br />
                                        <NavLink key="y" to={`/mod-kedvencek/${item.id}`} style={{ fontSize: '20px', color: "Black" }}>
                                            <button type="button" className="bi bi-pencil btn btn-warning">Módosítás</button></NavLink>
                                        <br />
                                        <br />
                                        <NavLink key="x" to={`/del-kedvencek/${item.id}`} style={{ fontSize: '20px', color: "Black" }}>
                                            <button type="button" className="btn btn-danger bi bi-dash-square">Törlés</button></NavLink>
                                    </div>
                                </div>
                            ))}
                        </>
                    ))}
                </div>
            )}
        </div>
    );
}

export default KedvencekListPage;