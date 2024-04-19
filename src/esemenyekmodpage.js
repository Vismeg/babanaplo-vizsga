import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function EsemenyekModPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const [modid, setmodid] = useState();
    const [modbabaId, setmodbabaId] = useState();
    const [modmegnevezes, setmodmegnevezes] = useState("");
    const [modelsoalkalom, setmodelsoalkalom] = useState();
    const [modkep, setmodkep] = useState();
    const [modtortenet, setmodtortenet] = useState("");
    const [moddatum, setmoddatum] = useState("");

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const res = await axios.get(`http://localhost:5244/api/Esemenyek/SearchEsemenyId/`+id);
                    const esemeny = res.data;
                    if(esemeny.id)
                    {
                        console.log("get az id: "+esemeny.id);
                    }
                    else{
                        console.log("get nincs id: "+esemeny.id);
                    }
                    setmodid(esemeny.id);
                    setmodbabaId(esemeny.babaId);
                    setmodmegnevezes(esemeny.megnevezes);
                    setmodelsoalkalom(esemeny.elsoalkalom);
                    setmodkep(esemeny.kep);
                    setmodtortenet(esemeny.tortenet);
                    setmoddatum(esemeny.datum);
    
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [id])

    const handleModIdChange = (event) => {
        setmodid(event.target.value)
    }

    const handleModBabaIdChange = (event) => {
        setmodbabaId(event.target.value)
    }


    const handleModMegnevezesChange = (event) => {
        setmodmegnevezes(event.target.value)
    }

    const handleModElsoalkalomChange = (event) => {
        if (event.target.value === "igen") {
            setmodelsoalkalom(true);
        }
        else {
            setmodelsoalkalom(false);
        }
    }

    const handleModTortenetChange = (event) => {
        setmodtortenet(event.target.value)
    }

    const handleModDatumChange = (event) => {
        setmoddatum(event.target.value)
    }

    const handleModImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    const dataURL = canvas.toDataURL(file.type); // PNG helyett a fájl típusa alapján meghatározzuk a formátumot
                    console.log("daraURL");
                    console.log(dataURL);
                    const binaryData = dataURL.split(',')[1]; // A base64 kódolású adat részét vesszük csak figyelembe
                    console.log("binaryData");
                    console.log(binaryData);
                    const bytes = window.atob(binaryData); // Base64 kódolás dekódolása
                    const byteNumbers = new Array(bytes.length);
                    for (let i = 0; i < bytes.length; i++) {
                        byteNumbers[i] = bytes.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers) // Uint8Array létrehozása a bináris adatból
                    const imageindexvalue = binaryData.toString().replace(/,/g, '');

                    console.log(imageindexvalue);
                    setmodkep(imageindexvalue);
                    // byteArray most már tartalmazza a bináris adatot
                    // Ide tedd a további logikát vagy a byteArray-t küldd el az API-nak
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(modid){
            console.log("submit az id: "+modid);
        }
        else{
            console.log("submit nincs id: "+modid);
        }
        const updateEsemeny = {
            id: parseInt(modid),
            babaId: parseInt(modbabaId),
            megnevezes: modmegnevezes,
            elsoalkalom: modelsoalkalom,
            kep: modkep,
            tortenet: modtortenet,
            datum: moddatum
        };
        console.log(updateEsemeny.data);
        try {
            const response = await axios.put(`http://localhost:5244/api/Esemenyek`, updateEsemeny,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                alert("Sikeres frissítés");
                navigate("/esemenyek");
            } else {
                console.log("Error", response.status);

            }
        } catch (error) {
            alert(error);

        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                    Id: <input type="number" value={modid} onChange={handleModIdChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                    BabaId: <input type="number" value={modbabaId} onChange={handleModBabaIdChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                    Megnevezés: <input type="text" value={modmegnevezes} onChange={handleModMegnevezesChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                    Elsőalkalom: <input type="text" value={modelsoalkalom} onChange={handleModElsoalkalomChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                        <img
                            className='img-fluid'
                            style={{ maxHeight: '200px', justifyContent: 'center' }}
                            alt="No image loaded"
                            src={'data:image/jpeg;base64,' + (modkep)}
                        />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                    Kép: <input type="file" onChange={handleModImageChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center',verticalAlign: 'top' }}>
                    Történet: <textarea 
            value={modtortenet} 
            onChange={handleModTortenetChange} 
            style={{ 
                height: '150px', // Állítsd a tetszőleges magasságra
                width: '300px', // Állítsd a tetszőleges szélességre
                resize: 'vertical', // A függőleges méretállítás engedélyezése
                overflowY: 'scroll', // Görgetősáv hozzáadása, ha a szöveg magassága meghaladja a beállított magasságot
                textAlign: 'left' // Szöveg igazítása balra
            }}   />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                    Dátum: <input type="date" value={moddatum} onChange={handleModDatumChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <button type="submit" style={{ width: '200px' }}> Módosítás mentése </button>
                </div>
            </form>
        </div>
    );





}
export default EsemenyekModPage;