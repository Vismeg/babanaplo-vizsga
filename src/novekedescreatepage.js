import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function NovekedesCreatePage() {
    const navigate = useNavigate();
    const [modimage, setModImage] = useState();

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
                    const dataURL = canvas.toDataURL(file.type);
                    const binaryData = dataURL.split(',')[1];
                    const imageIndexValue = binaryData.toString().replace(/,/g, '');
                    setModImage(imageIndexValue);
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const novekedesData = {
            babaId: parseInt(event.target.babaId.value),
            datum: event.target.datum.value,
            suly: parseFloat(event.target.suly.value),
            magassag: parseFloat(event.target.magassag.value),
            kep: modimage
        };

        try {
            const response = await axios.post('http://localhost:5244/api/Novekedes', novekedesData);
            if (response.status === 200) {
                console.log("Szuletes created");
                navigate('/novekedes');
            } else {
                console.error('Error posting szuletes data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='p-5 consent bg-whitesmoke text-center'style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
            <h1 className='mb-5'>Növekedés változás</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Baba ID</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='babaId' type='number' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Dátum</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='datum' type='date' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Súly</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='suly' type='number' step='0.01' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Magasság</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='magassag' type='number' step='0.01' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Kép</label>
                    <div className='col-sm-10'>
                        <input type="file" onChange={handleModImageChange} />
                    </div>
                </div>
                <button type='submit' className='btn btn-success'>Küldés</button>
            </form>
        </div>
    );
}

export default NovekedesCreatePage;
