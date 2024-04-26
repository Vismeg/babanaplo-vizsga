import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export function EsemenyekSinglePage() {
  const param = useParams();
  const id = param.id;
  const [esemeny, setEsemeny] = useState([]);
  const [isFetchPending, setFetchPending] = useState(true);

  useEffect(() => {
    setFetchPending(true);
    fetch(`http://localhost:5244/api/Esemenyek/SearchEsemenyId/${id}`)
        .then((res) => res.json())
        .then((esemeny) => setEsemeny(esemeny))
        .catch(console.log)
        .finally(() => {
          console.log(esemeny);
            setFetchPending(false);
        });
}, [id]);

  return (
    <div className="p-5 m-auto text-center content bg-lavender"style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
      {isFetchPending || !esemeny.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="card p-3 col-sm-3 d-inline-block m-1 p-2">
          <div className="card-body">
          <p className="card-title"><b>BabaId:</b> {esemeny.babaId}</p>
          <p className="card-title"><b>Megnevezés:</b> {esemeny.megnevezes}</p>
          <p className="card-title"><b>Történet:</b> {esemeny.tortenet}</p>
          <p className="card-title"><b>{esemeny.datum}</b></p>
            <br/>
            <img alt={esemeny.nev}
            className="img-fluid"
            style={{ maxHeight: 300 }}
            src={'data:image/jpeg;base64,' + esemeny.kep} />
            <br/>
          </div>
          <div>
            <NavLink to="/esemenyek/"  style={{fontSize: '20px', color: "Black"}}>
              <br />
              <i className="bi bi-backspace btn btn-primary"> Vissza</i>
            </NavLink>
            <br />
            <NavLink key="y" to={"/mod-esemenyek/" + esemeny.id} style={{fontSize: '20px', color: "Black"}}>
              <br />
              <i className="bi bi-pencil btn btn-warning"> Módosítás</i>
            </NavLink>
            <br />
            <NavLink key="x" to={"/del-esemenyek/" + esemeny.id} style={{fontSize: '20px', color: "Black"}}>
              <br />
              <i className="bi bi-pencil btn btn-danger"> Törlés</i>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default EsemenyekSinglePage;