import { useNavigate } from "react-router-dom";

export function KedvencekCreatePage() {
  const navigate = useNavigate();
  return (
    <div className="p-5 content bg-whitesmoke text-center">
      <h2>Új kedvenc</h2>
      <form
        onSubmit={(event) => {
          event.persist();
          event.preventDefault();
          fetch("http://localhost:5244/api/Kedvencek", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              babaId: parseInt(event.target.elements.babaId.value),
              ital: event.target.elements.ital.value,
              jatek: event.target.elements.jatek.value,
              mese: event.target.elements.mese.value,
              mondoka: event.target.elements.mondoka.value,
              etel: event.target.elements.etel.value,
            }),
          })
            .then(() => {
              navigate("/kedvencek/");
            })
            .catch(console.log);
        }}
      >
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">BabaId:</label>
          <div className="col-sm-9">
            <input type="text" name="babaId" className="form-control" />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Ital:</label>
          <div className="col-sm-9">
            <input type="text" name="ital" className="form-control" />
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
        <button type="submit" className="btn btn-success">
          Küldés
        </button>
      </form>
    </div>
  );
}

export default KedvencekCreatePage;