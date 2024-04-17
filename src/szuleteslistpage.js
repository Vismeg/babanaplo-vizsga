import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


export function SzuletesListPage() {
    const [szuletesek, setSzuletesek] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        fetch("http://localhost:5244/api/Szuletes")
            .then((res) => res.json())
            .then((szuletesek) => setSzuletesek(szuletesek))
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
                        
                        <NavLink to={'/esemenyek'}style={{fontSize: '20px', color: "LightGray"}} className={({ isActive }) => "nav-link" + (isActive ? "active" : "")}>
                        &ensp; <i class="bi bi-search"> Id alapján </i>
                        </NavLink>
                    </li>
                </ul>
            </div>
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div className='m-auto p-5 text-center content bg-lavender'>
                    <h2>Születések</h2>
                    <NavLink to={'/uj-szuletes'} className={({isActive}) => "nav-link" + (isActive ? "active" : "")}>
                    <button type="button" class="btn btn-info">Új kedvencek</button>
                    </NavLink>
                    {szuletesek.map((szuletes) => (
                        <div  style={{backgroundColor: "GhostWhite",textAlign: "left"}}  className="card col-sm-3 d-inline-block m-1 p-2" key={szuletes.id}>
                            <p className="text-dark">BabaId: {szuletes.babaId}</p>
                            <p className="text-dark">Név: {szuletes.nev}</p>
                            <p className="text-dark">Felhasználóid: {szuletes.felhasznaloId}</p>
                            <p className="text-dark">Született: {szuletes.idopont}</p>
                            <p className="text-dark">Hely: {szuletes.hely}</p>
                            <p className="text-dark">Hány grammal született: {szuletes.suly}</p>
                            <p className="text-dark">Milyen hosszal született: {szuletes.hossz}</p>
                            <p className="text-dark">Hajszíne: {szuletes.hajszin}</p>
                            <p className="text-dark">Szemeszíne: {szuletes.szemszin}</p>
                            <p className="text-dark">Vércsoport: {szuletes.vercsoport}</p>
                            <p className="text-dark">Csillagjegy: {szuletes.csillagjegy}</p>
                            <p className="text-dark">Születéstörténet: {szuletes.szuletestort}</p>
                            <div className="card-body">
                                <NavLink key={szuletes.babaId} to={"/szuletes/" + szuletes.babaId}>
                                    <img alt={szuletes.nev}
                                        className="img-fluid"
                                        style={{ maxHeight: 300 }}
                                        src={'data:image/jpeg;base64,' + szuletes.babafoto} />
                                </NavLink>
                                <br />
                                <br />
                                <NavLink  key={szuletes.babaId} to={"/mod-szuletes/" + szuletes.babaId} style={{fontSize: '20px', color: "Black"}}>
                                    <button type="button" className="bi bi-pencil btn btn-warning">Módosítás</button>
                                </NavLink>
                                <br />
                                <br />
                                <NavLink to={"/del-szuletes/" + szuletes.babaId} style={{fontSize: '20px', color: "Black"}}>
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
