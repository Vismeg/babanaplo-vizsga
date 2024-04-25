import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export function NovekedesListPage()
{
    const [novekedesek, setNovekedesek] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    useEffect(() =>
    {
        setFetchPending(true);
        fetch(`https://localhost:7165/api/Novekedes/${jwtDecode(localStorage.getItem("token")).sub}`)
            .then((res) => res.json())
            .then((novekedesek) => setNovekedesek(novekedesek))
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
                        <NavLink to={'/searchid-novekedes'} style={{ lineHeight: 1.2, fontSize: '16px', color: "LightGray" }} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                            &ensp; <i class="bi bi-search"> Id alapján </i>
                        </NavLink>
                    </li>
                </ul>
            </div>
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div className='m-auto p-5 text-center content bg-lavender' style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                    <h2 className='label-container'>Növekedések</h2>
                    <br></br>

                    <NavLink to={'/uj-novekedes'} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                        <button type="button" class="btn btn-info">Új növekedés</button>
                    </NavLink>
                    {novekedesek.map((novekedes) => (
                        <>
                            {novekedes.novekedess.length > 0 && novekedes.novekedess.map((item) => (
                                <div style={{ backgroundColor: "GhostWhite", textAlign: "left" }} className="card col-sm-3 d-inline-block m-1 p-2">
                                    <p key={item.id}>
                                        Név: {novekedes.nev}<br />
                                        Dátum: {item.datum}<br />
                                        Súly: {item.suly}<br />
                                        Magasság {(item.magassag)}<br />

                                    </p>

                                    <div className="card-body">
                                        <NavLink to={"/novekedes/" + item.id}>
                                            <img alt={item.nev}
                                                className="img-fluid"
                                                style={{ maxHeight: 300 }}
                                                src={'data:image/jpeg;base64,' + item.kep} />
                                        </NavLink>
                                        <br />
                                        <br />
                                        <NavLink key={item.id} to={`/mod-novekedes/ ${item.id}`} style={{ fontSize: '20px', color: "Black" }}>
                                            <button type="button" className="bi bi-pencil btn btn-warning">Módosítás</button>
                                        </NavLink>
                                        <br />
                                        <br />
                                        <NavLink key={item.id} to={`/del-novekedes/${item.id}`} style={{ fontSize: '20px', color: "Black" }}>
                                            <button type="button" className="btn btn-danger bi bi-dash-square">Törlés</button>
                                        </NavLink>
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

export default NovekedesListPage;
