import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export function EsemenyekListPage()
{
    const [esemenyek, setEsemenyek] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() =>
    {
        setFetchPending(true);
        fetch(`https://localhost:7165/api/Esemenyek/${jwtDecode(localStorage.getItem("token")).sub}`)
            .then((res) => res.json())
            .then((esemenyek) => setEsemenyek(esemenyek))
            .catch(console.log)
            .finally(() =>
            {
                setFetchPending(false);
            });
    }, []);

    return (
        <div>
            <div className="m-auto" id="navbarNav" style={{ textAlign: "left", backgroundColor: "rgb(42, 42, 50)", lineHeight: 1.2, fontFamily: "Bahnschrift Semibold", fontSize: '16px', fontStyle: "normal" }}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to={'/searchdate-esemeny'} style={{ lineHeight: 1.2, fontSize: '16px', color: "LightGray" }} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                            &ensp;<i class="bi bi-search" > Keresés dátum alapján </i>
                        </NavLink>
                        <NavLink to={'/searchtimeinterval-esemeny'} style={{ lineHeight: 1.2, fontSize: '16px', color: "LightGray" }} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                            &ensp;<i class="bi bi-search"> Keresés dátumok között </i>
                        </NavLink>
                        <NavLink to={'/searchid-esemeny'} style={{ lineHeight: 1.2, fontSize: '16px', color: "LightGray" }} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                            &ensp;<i class="bi bi-search"> Id alapján </i>
                        </NavLink>
                    </li>
                </ul>

            </div>
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div className='m-auto p-5 text-center content bg-lavender' style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                    <h2 className='label-container'>Események</h2>
                    <br></br>

                    <NavLink to={'/uj-esemenyek'} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                        <button type="button" class="btn btn-info">Új esemény</button>
                    </NavLink>

                    {esemenyek.map((esemeny) => (
                        <>
                            {esemeny.esemenyeks.length > 0 && esemeny.esemenyeks.map((item) => (
                                <div style={{ backgroundColor: "GhostWhite", textAlign: "left" }} className="card col-sm-3 d-inline-block m-1 p-2">
                                    <p key={item.id}>
                                        Név: {esemeny.nev}<br />
                                        Megnevezés: {item.megnevezes}<br />
                                        Első alkalom {(item.elsoalkalom) ? "Igen" : "Nem"}<br />
                                        Történet: {item.tortenet}<br />
                                        Dátum: {item.datum}<br />
                                    </p>

                                    <div className="card-body">
                                        <NavLink key={item.id} to={"/esemenyek/" + item.id}>
                                            <img alt={item.nev}
                                                className="img-fluid"
                                                style={{ maxHeight: 300 }}
                                                src={'data:image/jpeg;base64,' + item.kep} />
                                        </NavLink>
                                        <br />
                                        <br />
                                        <NavLink key="y" to={`/mod-esemenyek/${item.id}`} style={{ fontSize: '20px', color: "Black" }}>
                                            <button type="button" className="bi bi-pencil btn btn-warning">Módosítás</button></NavLink>
                                        <br />
                                        <br />
                                        <NavLink key="x" to={`/del-esemenyek/${item.id}`} style={{ fontSize: '20px', color: "Black" }}>
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

export default EsemenyekListPage;