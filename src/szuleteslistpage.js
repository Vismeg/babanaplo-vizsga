import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


export function SzuletesListPage()
{
    const [szuletesek, setSzuletesek] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() =>
    {
        setFetchPending(true);
        fetch(`https://localhost:7165/api/Szuletes/${jwtDecode(localStorage.getItem("token")).sub}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => res.json())
            .then((szuletesek) => setSzuletesek(szuletesek))
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

                        <NavLink to={'/searchid-szuletes'} style={{ lineHeight: 1.2, fontSize: '16px', color: "LightGray" }} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                            &ensp; <i class="bi bi-search"> Id alapján </i>
                        </NavLink>
                    </li>
                </ul>
            </div>
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div className='m-auto p-5 text-center content bg-lavender' style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                    <h2 className='label-container'>Születési adatok</h2>
                    <br></br>
                    <NavLink to={'/uj-szuletes'} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                        <button type="button" class="btn btn-info">Új baba hozzáadása</button>
                    </NavLink>
                    {szuletesek.map((szuletes) => (
                        <div style={{ backgroundColor: "GhostWhite", textAlign: "left" }} className="card col-sm-3 d-inline-block m-1 p-2 " key={szuletes.id}>
                            <p className="text-dark" style={{ marginBottom: '0.4em' }}><b>BabaId:</b> {szuletes.babaId}</p>
                            <p className="text-dark" style={{ marginBottom: '0.4em' }}><b>Név:</b> {szuletes.nev}</p>
                            <p className="text-dark" style={{ marginBottom: '0.4em' }}><b>Született:</b> {szuletes.idopont.slice(0, 10)}</p>
                            <p className="text-dark" style={{ marginBottom: '0.4em' }}><b>Hely:</b> {szuletes.hely}</p>
                            <p className="text-dark" style={{ marginBottom: '0.4em' }}><b>Súly:</b> {szuletes.suly} gramm</p>
                            <p className="text-dark" style={{ marginBottom: '0.4em' }}><b>Hossz:</b> {szuletes.hossz} cm</p>
                            <p className="text-dark" style={{ marginBottom: '0.4em' }}><b>Hajszíne:</b> {szuletes.hajszin}</p>
                            <p className="text-dark" style={{ marginBottom: '0.4em' }}><b>Szemeszíne:</b> {szuletes.szemszin}</p>
                            <p className="text-dark" style={{ marginBottom: '0.4em' }}><b>Vércsoport:</b> {szuletes.vercsoport}</p>
                            <p className="text-dark" style={{ marginBottom: '0.4em' }}><b>Csillagjegy:</b> {szuletes.csillagjegy}</p>
                            <p className="text-dark" style={{ marginBottom: '0.4em' }}><b>Születéstörténet:</b> {szuletes.szuletestort}</p>
                            <div className="card-body">
                                <NavLink key={szuletes.babaId} to={"/szuletes/" + szuletes.babaId}>
                                    <img alt={szuletes.nev}
                                        className="img-fluid"
                                        style={{ maxHeight: 300 }}
                                        src={'data:image/jpeg;base64,' + szuletes.babafoto} />
                                </NavLink>
                                <br />
                                <br />
                                <NavLink key={szuletes.babaId} to={"/mod-szuletes/" + szuletes.babaId} style={{ fontSize: '20px', color: "Black" }}>
                                    <button type="button" className="bi bi-pencil btn btn-warning">Módosítás</button>
                                </NavLink>
                                <br />
                                <br />
                                <NavLink to={"/del-szuletes/" + szuletes.babaId} style={{ fontSize: '20px', color: "Black" }}>
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

export default SzuletesListPage;
