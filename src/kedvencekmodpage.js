import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React, { useRef } from 'react';

export function KedvencekModPage() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const [modid, setmodid] = useState();
    const [modbabaId, setmodbabaId] = useState("");
    const [modital, setmodital] = useState("");
    const [modjatek, setmodjatek] = useState("");
    const [modmese, setmodmese] = useState();
    const [modmondoka, setmodmondoka] = useState("");
    const [modetel, setmodetel] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`http://localhost:5244/api/Kedvencek/SearchKedvencId/${id}`);
                const kedvenc = res.data;
                setmodid(parseInt(kedvenc.id));
                setmodbabaId(parseInt(kedvenc.babaId));
                setmodital(kedvenc.ital);
                setmodjatek(kedvenc.jatek);
                setmodmese(kedvenc.mese);
                setmodmondoka(kedvenc.mondoka);
                setmodetel(kedvenc.etel);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);


    const handleModBabaIdChange = (event) => {
        setmodbabaId(event.target.value)
    };

    const handleModItalChange = (event) => {
        setmodital(event.target.value)
    };

    const handleModJatekChange = (event) => {
        setmodjatek(event.target.value)
    };
    const handleModMeseChange = (event) => {
        setmodmese(event.target.value)
    };
    const handleModMondokaChange = (event) => {
        setmodmondoka(event.target.value)
    };

    const handleModEtelChange = (event) => {
        setmodetel(event.target.value)
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const updateKedvencek = {
            id: parseInt(modid),
            babaId: modbabaId,
            ital: modital,
            jatek: modjatek,
            mese: modmese,
            mondoka: modmondoka,
            etel: modetel
        };
        
        console.log(updateKedvencek.data);
        try {
            const response = await axios.put(`http://localhost:5244/api/Kedvencek`, updateKedvencek,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                alert("Sikeres frissítés");
                navigate("/kedvencek");
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
                        Ital:
                        <input type="text" value={modital} onChange={handleModItalChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'darkgreen' }}>
                    <label style={{ fontSize: '33px', color: "white", textAlign: 'center' }}>
                        Jaték:
                        <input type="text" value={modjatek} onChange={handleModJatekChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'darkgreen' }}>
                    <label style={{ fontSize: '33px', color: "white", textAlign: 'center' }}>
                        Mese:
                        <input type="text" value={modmese} onChange={handleModMeseChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'darkgreen' }}>
                    <label style={{ fontSize: '33px', color: "white", textAlign: 'center' }}>
                        Mondóka:
                        <input type="text" value={modmondoka} onChange={handleModMondokaChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'darkgreen' }}>
                    <label style={{ fontSize: '33px', color: "white", textAlign: 'center' }}>
                        Étel:
                        <input type="text" value={modetel} onChange={handleModEtelChange} />
                    </label>
                </div>
                <div className="form-group row pb-3" style={{ justifyContent: 'center', backgroundColor: 'darkgreen' }}>
                    <button type="submit"> Update </button>
                </div>
            </form>
        </div>
    );
}

export default KedvencekModPage;