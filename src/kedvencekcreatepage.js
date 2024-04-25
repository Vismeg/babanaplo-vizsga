import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

export function KedvencekCreatePage()
{
  const navigate = useNavigate();

  const [szuletesek, setSzuletesek] = useState([]);
  useEffect(() =>
  {
    fetch(`https://localhost:7165/api/Szuletes/${jwtDecode(localStorage.getItem("token")).sub}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((szuletesek) => setSzuletesek(szuletesek))
      .catch(console.log)

  }, []);

  return (
    <div className="p-5 content bg-whitesmoke text-center" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
      <h2>Új kedvenc</h2>
      <form
        onSubmit={(event) =>
        {
          event.persist();
          event.preventDefault();
          const bId = event.target.babaId.value.split('-')
          fetch("https://localhost:7165/api/Kedvencek", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              babaId: parseInt(bId[0]),
              jatek: event.target.elements.jatek.value,
              mese: event.target.elements.mese.value,
              mondoka: event.target.elements.mondoka.value,
              etel: event.target.elements.etel.value,
              ital: event.target.elements.ital.value,
            }),
          })
            .then(() =>
            {
              navigate("/kedvencek/");
            })
            .catch(console.log);
        }}
      >
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">BabaId:</label>
          <div className='col-sm-9'>
            <select className='form-control' name='babaId'>
              {szuletesek.map(szuletes => (
                <option key={szuletes.babaId} value={szuletes.babaId}>{szuletes.babaId + "-" + szuletes.nev}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Játék:</label>
          <div className="col-sm-9">
            <input type="text" name="jatek" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Mese:</label>
          <div className="col-sm-9">
            <input type="text" name="mese" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Mondóka:</label>
          <div className="col-sm-9">
            <input type="text" name="mondoka" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Étel:</label>
          <div className="col-sm-9">
            <input type="text" name="etel" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Ital:</label>
          <div className="col-sm-9">
            <input type="text" name="ital" className="form-control" />
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Küldés
        </button>
      </form>
    </div>
  );
}

export default KedvencekCreatePage;