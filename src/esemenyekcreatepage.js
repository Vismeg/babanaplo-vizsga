import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export function EsemenyekCreatePage()
{
    const navigate = useNavigate();
    const [modimage, setmodimage] = useState();

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


    const handleModImageChange = (event) =>
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
                    const binaryData = dataURL.split(',')[1]; // A base64 kódolású adat részét vesszük csak figyelembe
                    const imageindexvalue = binaryData.toString().replace(/,/g, '');
                    setmodimage(imageindexvalue);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        const bId = event.target.babaId.value.split('-')
        const esemenyData = {
            babaId: parseInt(bId[0]),
            megnevezes: event.target.megnevezes.value,
            elsoalkalom: event.target.elsoalkalom.value === '1',
            kep: modimage,
            tortenet: event.target.tortenet.value,
            datum: event.target.datum.value
        };
        try
        {
            const response = await axios.post('https://localhost:7165/api/Esemenyek', esemenyData);
            if (response.status === 200)
            {
                console.log("Esemeny created");
                navigate('/esemenyek');
            } else
            {
                console.error('Error posting esemeny data');
            }
        } catch (error)
        {
            console.error('Error:', error);
        }

    };

    return (
        <div height='max' className='p-5 consent bg-whitesmoke text-center' style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
            <h1 className='mb-5'>Adj hozzá egy eseményt!</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label' style={{ fontWeight: 'bold' }} >Baba ID</label>

                    <div className='col-sm-10'>
                        <select className='form-control' name='babaId'>
                            {szuletesek.map(szuletes => (
                                <option key={szuletes.babaId} value={szuletes.babaId}>{szuletes.babaId + "-" + szuletes.nev}</option>
                            ))}
                        </select>
                    </div>
                    
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'style={{ fontWeight: 'bold' }}>Megnevezés</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='megnevezes' type='text' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'style={{ fontWeight: 'bold' }}>Első alkalom</label>
                    <div className='col-sm-10'>
                        <input type="radio" id="igen" name="elsoalkalom" value="1"></input>
                        <label for="igen">Igen</label>
                        <input type="radio" id="nem" name="elsoalkalom" value="0"></input>
                        <label for="nem">Nem</label>
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'style={{ fontWeight: 'bold' }}>Kép</label>
                    <div className='col-sm-10'>
                        <input type="file" onChange={handleModImageChange} />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'style={{ fontWeight: 'bold' }}>Történet</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='tortenet' type='text' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'style={{ fontWeight: 'bold' }}>Dátum</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='datum' type='date' />
                    </div>
                </div>
                <button type='submit' className='btn btn-success'style={{ fontWeight: 'bold' }}>Küldés</button>
            </form>
        </div>
    );
}
export default EsemenyekCreatePage;
