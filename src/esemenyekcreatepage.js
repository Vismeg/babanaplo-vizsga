import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function EsemenyekCreatePage() {
    const navigate = useNavigate();
    const [modimage, setmodimage] = useState();
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
                    const binaryData = dataURL.split(',')[1]; // A base64 kódolású adat részét vesszük csak figyelembe
                    const imageindexvalue = binaryData.toString().replace(/,/g, '');
                    setmodimage(imageindexvalue);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const esemenyData = {
            babaId: parseInt(event.target.babaId.value),
            megnevezes: event.target.megnevezes.value,
            elsoalkalom: event.target.elsoalkalom.value  === '1',
            kep: modimage,
            tortenet: event.target.tortenet.value,
            datum: event.target.datum.value
        };
        try {
            const response = await axios.post('http://localhost:5244/api/Esemenyek', esemenyData);
            if (response.status === 200) {
                console.log("Esemeny created");
                navigate('/esemenyek');
            } else {
                console.error('Error posting esemeny data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div height='max' className='p-5 consent bg-whitesmoke text-center' style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
            <h1 className='mb-5'>Adj hozzá egy eseményt!</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Baba ID</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='babaId' type='number' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Megnevezés</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='megnevezes' type='text' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Első alkalom</label>
                    <div className='col-sm-10'>
                        <input type="radio" id="igen" name="elsoalkalom" value="1"></input>
                        <label for="igen">Igen</label>
                        <input type="radio" id="nem" name="elsoalkalom" value="0"></input>
                        <label for="nem">Nem</label>
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Kép</label>
                    <div className='col-sm-10'>
                        <input type="file" onChange={handleModImageChange} />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Történet</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='tortenet' type='text' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Dátum</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='datum' type='date' />
                    </div>
                </div>
                <button type='submit' className='btn btn-success'>Küldés</button>
            </form>
        </div>
    );
}
export default EsemenyekCreatePage;
