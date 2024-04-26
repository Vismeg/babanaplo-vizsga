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
    <div className="p-5 m-auto text-center content bg-lavender"style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
      {isPending || !novekedes.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="card p-3 col-sm-3 d-inline-block m-1 p-2">
          <div className="card-body">
          <p className="card-title"><b>BabaId:</b> {novekedes.babaId ? novekedes.babaId : "Nincs"}</p>
<p className="card-title"><b>Dátum:</b> {novekedes.datum ? novekedes.datum : "Nincs"}</p>
<p className="card-title"><b>Súly:</b> {novekedes.suly ? novekedes.suly : "Nincs"} gramm</p>
<p className="card-title"><b>Magasság:</b> {novekedes.magassag ? novekedes.magassag : "Nincs"} cm</p>
<br></br>
            <img alt={novekedes.kep}
            className="img-fluid"
            style={{ maxHeight: 300 }}
            src={'data:image/jpeg;base64,' + novekedes.kep} />
          </div>
          <div>
            <NavLink to="/novekedes/" style={{fontSize: '20px', color: "Black"}}>
              <i className="bi bi-backspace btn btn-primary"> Vissza</i>
            </NavLink>
            <br />
            <NavLink key="y" to={"/mod-novekedes/" + novekedes.id} style={{fontSize: '20px', color: "Black"}}>
              <br />
              <i className="bi bi-pencil btn btn-warning"> Módosítás</i>
            </NavLink>
            <br />
            <NavLink key="x" to={"/del-novekedes/" + novekedes.id} style={{fontSize: '20px', color: "Black"}}>
              <br />
              <i className="bi bi-pencil btn btn-danger"> Törlés</i>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default NovekedesSinglePage;
