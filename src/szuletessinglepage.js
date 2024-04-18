import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export function SzuletesSinglePage() {
  const params = useParams();
  const id = params.babaId;
  const [szuletes, setSzuletes] = useState([]);
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    setPending(true);
    fetch(`http://localhost:5244/api/Szuletes/SearchSzuletesId/${id}`)
        .then((res) => res.json())
        .then((szuletes) => setSzuletes(szuletes))
        .catch(console.log)
        .finally(() => {
          console.log(szuletes);
          setPending(false);
        });
}, [id]);

  return (
    <div className="p-5 m-auto text-center content bg-lavender">
      {isPending || !szuletes.babaId ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="card p-3 col-sm-3 d-inline-block m-1 p-2">
          <div className="card-body">
            <h5 className="card-title">BabaId: {szuletes.babaId ? szuletes.babaId : "Nincs" }</h5>
            <h5 className="card-title">Időpont: {szuletes.idopont ? szuletes.idopont : "Nincs"}</h5>
            <h5 className="card-title">Hely: {szuletes.hely ? szuletes.hely : "Nincs"}</h5>
            <h5 className="card-title">Súly: {szuletes.suly ? szuletes.suly : "Nincs"} gramm</h5>
            <h5 className="card-title">Hossz: {szuletes.hossz ? szuletes.hossz : "Nincs"} centiméter</h5>
            <h5 className="card-title">Hajszín: {szuletes.hajszin ? szuletes.hajszin : "Nincs"}</h5>
            <h5 className="card-title">Szemeszín: {szuletes.szemszin ? szuletes.szemszin : "Nincs"}</h5>
            <h5 className="card-title">Vércsoport: {szuletes.vercsoport ? szuletes.vercsoport : "Nincs"}</h5>
            <h5 className="card-title">Csillagjegy: {szuletes.csillagjegy ? szuletes.csillagjegy : "Nincs"}</h5>
            <h5 className="card-title">Születéstörténet: {szuletes.szuletestort ? szuletes.szuletestort : "Nincs"}</h5>
            <img alt={szuletes.babafoto}
            className="img-fluid"
            style={{ maxHeight: 300 }}
            src={'data:image/jpeg;base64,' + szuletes.babafoto} />
            <br />
          </div>
          <div>
            <NavLink to="/" style={{fontSize: '20px', color: "Black"}}>
              <br />
              <i className="bi bi-backspace btn btn-primary"> Vissza</i>
            </NavLink>
            <br />
            <NavLink key="y" to={"/mod-szuletes/" + szuletes.babaId} style={{fontSize: '20px', color: "Black"}}>
              <br />
              <i className="bi bi-pencil btn btn-warning"> Módosítás</i>
            </NavLink>
            <br />
            <NavLink key="x" to={"/del-szuletes/" + szuletes.babaId} style={{fontSize: '20px', color: "Black"}}>
              <br />
              <i className="bi bi-pencil btn btn-danger"> Törlés</i>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default SzuletesSinglePage;
