import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function SzuletesModPage()
{
    const navigate = useNavigate();
    const params = useParams();
    const id = params.babaId;
    const [modbabaId, setModBabaId] = useState();
    const [modfelhasznaloId, setModFelhasznaloId] = useState();
    const [modnev, setModNev] = useState("");
    const [modidopont, setModIdopont] = useState("");
    const [modhely, setModHely] = useState("");
    const [modsuly, setModSuly] = useState();
    const [modhossz, setModHossz] = useState();
    const [modhajszin, setModHajszin] = useState("");
    const [modszemszin, setModSzemszin] = useState("");
    const [modvercsoport, setModVercsoport] = useState("");
    const [modcsillagjegy, setModCsillagjegy] = useState("");
    const [modszuletestort, setModSzuletestort] = useState("");
    const [modbabafoto, setModBabafoto] = useState();
    useEffect(() =>
    {
        (async () =>
        {
            try
            {
                const res = await axios.get(`https://localhost:7165/api/Szuletes/SearchSzuletesId/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const szuletes = res.data;
                setModBabaId(szuletes.babaId);
                setModFelhasznaloId(szuletes.felhasznaloId);
                setModNev(szuletes.nev);
                setModIdopont(szuletes.idopont);
                setModHely(szuletes.hely);
                setModSuly(szuletes.suly);
                setModHossz(szuletes.hossz);
                setModHajszin(szuletes.hajszin);
                setModSzemszin(szuletes.szemszin);
                setModVercsoport(szuletes.vercsoport);
                setModCsillagjegy(szuletes.csillagjegy);
                setModSzuletestort(szuletes.szuletestort);
                setModBabafoto(szuletes.babafoto);
                console.log("időpont" + modidopont);
            } catch (error)
            {
                console.log(error);
            }
        })();
    }, [id]);


    const handleModBabaIdChange = (event) =>
    {
        setModBabaId(event.target.value)
    };

    const handleModFelhasznaloIdChange = (event) =>
    {
        setModFelhasznaloId(event.target.value)
    };

    const handleModNevChange = (event) =>
    {
        setModNev(event.target.value)
    };


    const handleModIdopontChange = (event) =>
    {
        setModIdopont(event.target.value)
    };


    const handleModHelyChange = (event) =>
    {
        setModHely(event.target.value)
    };

    const handleModSulyChange = (event) =>
    {
        setModSuly(event.target.value)
    };

    const handleModHosszChange = (event) =>
    {
        setModHossz(event.target.value)
    };

    const handleModHajszinChange = (event) =>
    {
        setModHajszin(event.target.value)
    };

    const handleModSzemszinChange = (event) =>
    {
        setModSzemszin(event.target.value)
    };

    const handleModVercsoportChange = (event) =>
    {
        setModVercsoport(event.target.value)
    };

    const handleModCsillagjegyChange = (event) =>
    {
        setModCsillagjegy(event.target.value)
    };

    const handleModSzuletestortChange = (event) =>
    {
        setModSzuletestort(event.target.value)
    };

    const handleModBabafotoChange = (event) =>
    {
        const file = event.target.files[0];
        if (file)
        {
            const reader = new FileReader();
            reader.onload = () =>
            {
                const img = new Image();
                img.onload = () =>
                {
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
                    for (let i = 0; i < bytes.length; i++)
                    {
                        byteNumbers[i] = bytes.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers) // Uint8Array létrehozása a bináris adatból
                    const imageindexvalue = binaryData.toString().replace(/,/g, '');

                    console.log(imageindexvalue);
                    setModBabafoto(imageindexvalue);
                    // byteArray most már tartalmazza a bináris adatot
                    // Ide tedd a további logikát vagy a byteArray-t küldd el az API-nak
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        const updateSzuletes = {
            //babaId: modbabaId,
            felhasznaloId: modfelhasznaloId,
            nev: modnev,
            idopont: modidopont,
            hely: modhely,
            suly: modsuly,
            hossz: modhossz,
            hajszin: modhajszin,
            szemszin: modszemszin,
            vercsoport: modvercsoport,
            csillagjegy: modcsillagjegy,
            szuletestort: modszuletestort,
            babafoto: modbabafoto,
        };
        console.log(updateSzuletes.data);
        try
        {
            const response = await axios.put(`https://localhost:7165/api/Szuletes/${modbabaId}`, updateSzuletes,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200)
            {
                alert("Sikeres frissítés");
                navigate("/szuletes"); // Sikeres frissítés után átirányítás a születés oldalra
            } else
            {
                console.log("Error", response.status);
            }
        } catch (error)
        {
            alert(error);
        }
    };

    return (
        <div style={{ backgroundImage: "url('háttérkép.jpg')" }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                        Név: <input type="text" value={modnev} onChange={handleModNevChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                        Időpont: <input type="datetime" value={modidopont} onChange={handleModIdopontChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                        Hely: <input type="text" value={modhely} onChange={handleModHelyChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                        Súly: <input type="number" value={modsuly} onChange={handleModSulyChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                        Hossz: <input type="number" value={modhossz} onChange={handleModHosszChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                        Hajszín: <input type="text" value={modhajszin} onChange={handleModHajszinChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                        Szemszín: <input type="text" value={modszemszin} onChange={handleModSzemszinChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                        Vércsoport: <input type="text" value={modvercsoport} onChange={handleModVercsoportChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                        Csillagjegy: <input type="text" value={modcsillagjegy} onChange={handleModCsillagjegyChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                        Születéstörténet: <textarea
                            value={modszuletestort}
                            onChange={handleModSzuletestortChange}
                            style={{
                                height: '150px', // Állítsd a tetszőleges magasságra
                                width: '300px', // Állítsd a tetszőleges szélességre
                                resize: 'vertical', // A függőleges méretállítás engedélyezése
                                overflowY: 'scroll', // Görgetősáv hozzáadása, ha a szöveg magassága meghaladja a beállított magasságot
                                textAlign: 'left' // Szöveg igazítása balra
                            }} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "white", textAlign: 'center' }}>
                        <img
                            className='img-fluid'
                            style={{ maxHeight: '200px', justifyContent: 'center' }}
                            alt="No image loaded"
                            src={'data:image/jpeg;base64,' + (modbabafoto)}
                        />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <label style={{ fontSize: '18px', color: "black", textAlign: 'center' }}>
                        Babafotó: <input type="file" onChange={handleModBabafotoChange} />
                    </label>
                </div>

                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                    <button type="submit" style={{ width: '200px' }}> Módosítás mentése </button>
                </div>

            </form>
        </div>
    );
}
export default SzuletesModPage;