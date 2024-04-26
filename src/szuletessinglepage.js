import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export function SzuletesSinglePage()
{
  const params = useParams();
  const id = params.babaId;
  const [szuletes, setSzuletes] = useState([]);
  const [isPending, setPending] = useState(false);

  useEffect(() =>
  {
    setPending(true);
    fetch(`https://localhost:7165/api/Szuletes/SearchSzuletesId/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((szuletes) => setSzuletes(szuletes))
      .catch(console.log)
      .finally(() =>
      {
        console.log(szuletes);
        setPending(false);
      });
  }, [id]);

  return (
    <div className="p-5 m-auto text-center content bg-lavender" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
      {isPending || !szuletes.babaId ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="card p-3 col-sm-3 d-inline-block m-1 p-2">
          <div className="card-body">
          <p className="card-title"><b>BabaId:</b> {szuletes.babaId ? szuletes.babaId : "Nincs"}</p>
          <p className="card-title"><b>Időpont:</b> {szuletes.idopont ? szuletes.idopont.slice(0, 10) : "Nincs"}</p>
          <p className="card-title"><b>Hely:</b> {szuletes.hely ? szuletes.hely : "Nincs"}</p>
          <p className="card-title"><b>Súly:</b> {szuletes.suly ? szuletes.suly : "Nincs"} gramm</p>
          <p className="card-title"><b>Hossz:</b> {szuletes.hossz ? szuletes.hossz : "Nincs"} cm</p>
          <p className="card-title"><b>Hajszín:</b> {szuletes.hajszin ? szuletes.hajszin : "Nincs"}</p>
          <p className="card-title"><b>Szemszín:</b> {szuletes.szemszin ? szuletes.szemszin : "Nincs"}</p>
          <p className="card-title"><b>Vércsoport:</b> {szuletes.vercsoport ? szuletes.vercsoport : "Nincs"}</p>
          <p className="card-title"><b>Csillagjegy:</b> {szuletes.csillagjegy ? szuletes.csillagjegy : "Nincs"}</p>
          <p className="card-title"><b>Születéstörténet:</b> {szuletes.szuletestort ? szuletes.szuletestort : "Nincs"}</p>

            <img alt={szuletes.babafoto}
              className="img-fluid"
              style={{ maxHeight: 300 }}
              src={'data:image/jpeg;base64,' + szuletes.babafoto} />
            <br />
          </div>
          <div>
            <NavLink to="/szuletes" style={{ fontSize: '20px', color: "Black" }}>
              <br />
              <i className="bi bi-backspace btn btn-primary"> Vissza</i>
            </NavLink>
            <br />
            <NavLink key="y" to={"/mod-szuletes/" + szuletes.babaId} style={{ fontSize: '20px', color: "Black" }}>
              <br />
              <i className="bi bi-pencil btn btn-warning"> Módosítás</i>
            </NavLink>
            <br />
            <NavLink key="x" to={"/del-szuletes/" + szuletes.babaId} style={{ fontSize: '20px', color: "Black" }}>
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
