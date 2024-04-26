import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export function KedvencekSinglePage() {
  const params = useParams();
  const id = params.id;
  const [kedvenc, setKedvenc] = useState([]);
  const [isPending, setPending] = useState(true);

  useEffect(() => {
    setPending(true);
    fetch(`http://localhost:5244/api/Kedvencek/SearchKedvencId/${id}`)
        .then((res) => res.json())
        .then((kedvenc) => setKedvenc(kedvenc))
        .catch(console.log)
        .finally(() => {
          console.log(kedvenc);
          setPending(false);
        });
}, [id]);

  return (
    <div className="p-5 m-auto text-center content bg-lavender"style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
      {isPending || !kedvenc.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="card p-3 col-sm-3 d-inline-block m-1 p-2">
          <div className="card-body">
          <p className="card-title"><b>BabaId:</b> {kedvenc.babaId}</p>
          <p className="card-title"><b>Jatek:</b> {kedvenc.jatek ? kedvenc.jatek : "Nincs"}</p>
          <p className="card-title"><b>Mese:</b> {kedvenc.mese ? kedvenc.mese : "Nincs"}</p>
          <p className="card-title"><b>Mondóka:</b> {kedvenc.mondoka ? kedvenc.mondoka : "Nincs"}</p>
          <p className="card-title"><b>Étel:</b> {kedvenc.etel ? kedvenc.etel : "Nincs"}</p>
          <p className="card-title"><b>Ital:</b> {kedvenc.ital ? kedvenc.ital : "Nincs"}</p>
          </div>
          <div>
            <NavLink to="/kedvencek/">
              <i className="bi bi-backspace btn btn-primary">Vissza</i>
            </NavLink>
            <NavLink key="y" to={"/mod-kedvencek/" + kedvenc.id} style={{fontSize: '20px', color: "Black"}}>
              <br />
              <br />
              <i className="bi bi-pencil btn btn-warning"> Módosítás</i>
            </NavLink>
            <br />
            <NavLink key="x" to={"/del-kedvencek/" + kedvenc.id} style={{fontSize: '20px', color: "Black"}}>
              <br />
              <i className="bi bi-pencil btn btn-danger"> Törlés</i>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default KedvencekSinglePage;