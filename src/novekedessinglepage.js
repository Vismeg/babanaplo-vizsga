import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export function NovekedesSinglePage() {
  const params = useParams();
  const id = params.id;
  const [novekedes, setNovekedes] = useState([]);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    fetch(`http://localhost:5244/api/Novekedes/SearchNovekedesId/${id}`)
        .then((res) => res.json())
        .then((novekedes) => setNovekedes(novekedes))
        .catch(console.log)
        .finally(() => {
          console.log(novekedes);
          setPending(false);
        });
}, [id]);

  return (
    <div className="p-5 m-auto text-center content bg-lavender">
      {isPending || !novekedes.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="card p-3 col-sm-3 d-inline-block m-1 p-2">
          <div className="card-body">
            <h5 className="card-title">BabaId: {novekedes.babaId ? novekedes.babaId : "Nincs"}</h5>
            <h5 className="card-title">Dátum: {novekedes.datum ? novekedes.datum : "Nincs"}</h5>
            <h5 className="card-title">Súly: {novekedes.suly ? novekedes.suly : "Nincs"} gramm</h5>
            <h5 className="card-title">Magasság: {novekedes.magassag ? novekedes.magassag : "Nincs"} centiméter</h5>
            <img alt={novekedes.kep}
            className="img-fluid"
            style={{ maxHeight: 300 }}
            src={'data:image/jpeg;base64,' + novekedes.kep} />
            <br />
          </div>
          <div>
            <NavLink to="/novekedes/" style={{fontSize: '20px', color: "Black"}}>
              <br />
              <i className="bi bi-backspace"> Vissza a növekedés listájára</i>
            </NavLink>
            <br />
            <br />
            <NavLink key="y" to={"/mod-novekedes/" + novekedes.id} style={{fontSize: '20px', color: "Black"}}>
              <br />
              <i className="bi bi-pencil"> Módosítás</i>
            </NavLink>
            <br />
            <br />
            <NavLink key="x" to={"/del-novekedes/" + novekedes.id} style={{fontSize: '20px', color: "Black"}}>
              <br />
              <i className="bi bi-pencil"> Törlés</i>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default NovekedesSinglePage;
