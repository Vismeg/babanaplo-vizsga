import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export function SzuletesSearchIdPage()
{
    const [babaId, setBabaId] = useState();
    const [szuletes, setSzuletes] = useState(null);

    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        setSzuletes(null);
        try
        {
            const response = await axios.get(`https://localhost:7165/api/Szuletes/SearchSzuletesId/${babaId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setSzuletes(response.data);
        } catch (error)
        {
            console.error('Error:', error);
        }
    };

    return (
        <div className='m-auto p-5 text-center content bg-lavender' style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
            <form onSubmit={handleSubmit}>
                <label>
                    ID:     <input type="text" value={babaId} onChange={(e) => setBabaId(e.target.value)} />
                </label>
                <button type="submit">Search</button>
            </form>

            {szuletes && (
                <div style={{ backgroundColor: "GhostWhite" }} className="card col-sm-3 d-inline-block m-1 p-2">
                    <p><b>Baba ID:</b> {szuletes.babaId}</p>
                    <p><b>Név:</b> {szuletes.nev}</p>
                    <p><b>Dátum:</b> {szuletes.idopont.slice(0, 10)}</p>
                    <p><b>Súly:</b> {szuletes.suly} gramm</p>
                    <p><b>Magasság:</b> {szuletes.hossz} cm</p>
                    <NavLink key={szuletes.babaId} to={"/szuletes/" + szuletes.babaId}>
                    <img alt={szuletes.nev}
                                        className="img-fluid"
                                        style={{ maxHeight: 300 }}
                                        src={'data:image/jpeg;base64,' + szuletes.babafoto} />
                    </NavLink>
                    <div className="card-body">
                        <NavLink key={szuletes.babaId} to={"/szuletes/" + szuletes.babaId} style={{ fontSize: '20px', color: "Black" }}>
                            <h3 type="button" class="btn btn-info"> Megtekintem új lapon </h3>
                        </NavLink>
                        <br />
                        <br />
                        <NavLink key="y" to={`/mod-szuletes/${szuletes.id}`} style={{ fontSize: '20px', color: "Black" }} >
                            <span className="bi bi-pencil btn btn-warning"> Módosítás</span>
                            <br />
                            <br />
                        </NavLink> &nbsp;&nbsp;
                        <NavLink key="x" to={`/del-szuletes/${szuletes.id}`} style={{ fontSize: '20px', color: "Black" }}>
                            <span className="bi bi-dash-square btn btn-danger"> Törlés</span></NavLink>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SzuletesSearchIdPage;