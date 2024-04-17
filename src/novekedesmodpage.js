import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function NovekedesModPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const [modbabaId, setModBabaId] = useState("");
    const [moddatum, setModDatum] = useState("");
    const [modsuly, setModSuly] = useState("");
    const [modmagassag, setModMagassag] = useState("");
    const [modkep, setModKep] = useState();

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`http://localhost:5244/api/Novekedes/SearchNovekedesId/${id}`);
                const novekedes = res.data;
                setModBabaId(novekedes.babaId);
                setModDatum(novekedes.datum);
                setModSuly(novekedes.suly);
                setModMagassag(novekedes.magassag);
                setModKep(novekedes.kep);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);
    
    const handleModBabaIdChange = (event) => {
        setModBabaId(event.target.value)
    };

    const handleModDatumChange = (event) => {
        setModDatum(event.target.value)
    };

    const handleModSulyChange = (event) => {
        setModSuly(event.target.value)
    };

    const handleModMagassagChange = (event) => {
        setModMagassag(event.target.value)
    };

    const handleModKepChange = (event) => {
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
                    setModKep(imageindexvalue);
                    // byteArray most már tartalmazza a bináris adatot
                    // Ide tedd a további logikát vagy a byteArray-t küldd el az API-nak
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const updateNovekedes = {
            babaId: modbabaId,
            datum: moddatum,
            suly: modsuly,
            magassag: modmagassag,
            kep: modkep
        };
        console.log(updateNovekedes.data);
        try {
            const response = await axios.put(`http://localhost:5244/api/Novekedes`, updateNovekedes,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                alert("Sikeres frissítés");
                navigate("/novekedes"); // Sikeres frissítés után átirányítás a főoldalra
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
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'orange' }}>
                    <label style={{ fontSize: '33px', color: "white", textAlign: 'center' }}>
                        BabaId:
                        <input type="number" value={modbabaId} onChange={handleModBabaIdChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'darkgreen' }}>
                    <label style={{ fontSize: '33px', color: "white", textAlign: 'center' }}>
                        Dátum:
                        <input type="date" value={moddatum} onChange={handleModDatumChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'darkgreen' }}>
                    <label style={{ fontSize: '33px', color: "white", textAlign: 'center' }}>
                        Súly:
                        <input type="number" value={modsuly} onChange={handleModSulyChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'darkgreen' }}>
                    <label style={{ fontSize: '33px', color: "white", textAlign: 'center' }}>
                        Magasság:
                        <input type="number" value={modmagassag} onChange={handleModMagassagChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'darkgreen' }}>
                    <label style={{ fontSize: '33px', color: "white", textAlign: 'center' }}>
                        Kép:
                        <input type="file" onChange={handleModKepChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'darkgreen' }}>
                    <button type="submit"> Update </button>
                </div>
            </form>
        </div>
    );
}

export default NovekedesModPage;