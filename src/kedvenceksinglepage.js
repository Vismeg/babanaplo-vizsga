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
            <h5 className="card-title">BabaId: {kedvenc.babaId}</h5>
            <h5 className="card-title">Jatek: {kedvenc.jatek ? kedvenc.jatek : "Nincs"}</h5>
            <h5 className="card-title">Mese: {kedvenc.mese ? kedvenc.mese : "Nincs"}</h5>
            <h5 className="card-title">Mondóka: {kedvenc.mondoka ? kedvenc.mondoka : "Nincs"}</h5>
            <h5 className="card-title">Étel: {kedvenc.etel ? kedvenc.etel : "Nincs"}</h5>
            <h5 className="card-title">Ital: {kedvenc.ital ? kedvenc.ital : "Nincs"}</h5>
            <br />
          </div>
          <div>
            <NavLink to="/kedvencek/">
              <br />
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