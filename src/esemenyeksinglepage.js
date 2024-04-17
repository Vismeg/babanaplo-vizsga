import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export function EsemenyekSinglePage() {
  const param = useParams();
  const id = param.id;
  const [esemeny, setEsemeny] = useState([]);
  const [isFetchPending, setFetchPending] = useState(true);

  useEffect(() => {
    setFetchPending(true);
    fetch(`http://localhost:5244/api/Esmenyek/SearchEsemenyId/${id}`)
        .then((res) => res.json())
        .then((esemeny) => setEsemeny(esemeny))
        .catch(console.log)
        .finally(() => {
          console.log(esemeny);
            setFetchPending(false);
        });
}, [id]);

  return (
    <div className="p-5 m-auto text-center content bg-lavender">
      {isFetchPending || !esemeny.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="card p-3 col-sm-3 d-inline-block m-1 p-2">
          <div className="card-body">
            <h5 className="card-title">BabaId: {esemeny.babaId}</h5>
            <h5 className="card-title">Megnevezés: {esemeny.megnevezes}</h5>
            <h5 className="card-title">Elsőalkalom volt?: {(esemeny.elsoalkalom) ? "igen" : "nem"}</h5>
            <h5 className="card-title">Történet: {esemeny.tortenet}</h5>
            <h5 className="card-title">{esemeny.datum}</h5>
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
              <i className="bi bi-backspace"> Vissza az események listájára</i>
            </NavLink>
            <br />
            <br />
            <NavLink key="y" to={"/mod-esemeny/" + esemeny.id} style={{fontSize: '20px', color: "Black"}}>
              <br />
              <i className="bi bi-pencil"> Módosítás</i>
            </NavLink>
            <br />
            <br />
            <NavLink key="x" to={"/del-esemeny/" + esemeny.id} style={{fontSize: '20px', color: "Black"}}>
              <br />
              <i className="bi bi-pencil"> Törlés</i>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default EsemenyekSinglePage;