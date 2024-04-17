import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


export function NovekedesListPage() {
    const [novekedesek, setNovekedesek] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    useEffect(() => {
        setFetchPending(true);
        fetch("http://localhost:5244/api/Novekedes")
            .then((res) => res.json())
            .then((novekedesek) => setNovekedesek(novekedesek))
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
                        <NavLink to={'/searchid-novekedes'}style={{fontSize: '20px', color: "LightGray"}} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                        &ensp; <i class="bi bi-search"> Id alapján </i>
                        </NavLink>
                    </li>
                </ul>
            </div>
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div className='m-auto p-5 text-center content bg-lavender'>
                    <h2>Növekedések</h2>
                    <NavLink to={'/uj-novekedes'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                    <button type="button" class="btn btn-info">Új növekedés</button>
                    </NavLink>
                    {novekedesek.map((novekedes) => (
                        <div style={{backgroundColor: "GhostWhite ",textAlign: "left" }} className="card col-sm-3 d-inline-block m-1 p-2" key={novekedes.id}>
                            <p className="text-dark">BabaId: {novekedes.babaId}</p>
                            <p className="text-dark">Dátum: {novekedes.datum}</p>
                            <p className="text-dark">Súly (gramm): {novekedes.suly}</p>
                            <p className="text-dark">Magasság (centiméter): {novekedes.magassag}</p>
                            <div className="card-body">
                                <NavLink to={"/novekedes/" + novekedes.id}>
                                    <img alt={novekedes.nev}
                                        className="img-fluid"
                                        style={{ maxHeight: 300 }}
                                        src={'data:image/jpeg;base64,' + novekedes.kep} />
                                </NavLink>
                                <br />
                                <br />
                                <NavLink key={novekedes.id} to={`/mod-novekedes/ ${novekedes.id}` } style={{fontSize: '20px', color: "Black"}}>
                                    <button type="button" className="bi bi-pencil btn btn-warning">Módosítás</button>
                                </NavLink>
                                <br />
                                <br />
                                <NavLink key={novekedes.id} to={`/del-novekedes/${novekedes.id}`} style={{fontSize: '20px', color: "Black"}}>
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

export default NovekedesListPage;
