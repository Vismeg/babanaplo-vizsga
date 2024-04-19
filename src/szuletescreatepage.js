import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function SzuletesCreatePage() {
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
            felhasznaloId: parseInt(event.target.felhasznaloId.value), 
            nev: event.target.nev.value, 
            idopont: event.target.idopont.value,
            hely: event.target.hely.value, 
            suly: parseFloat(event.target.suly.value),
            hossz: parseFloat(event.target.hossz.value), 
            hajszin: event.target.hajszin.value, 
            szemszin: event.target.szemszin.value, 
            vercsoport:  event.target.vercsoport.value, 
            csillagjegy: event.target.csillagjegy.value, 
            Szuletestort: event.target.szuletestort.value, 
            Babafoto: modimage
        };

        try {
            const response = await axios.post('http://localhost:5244/api/Szuletes', novekedesData);
            if (response.status === 200) {
                console.log("Esemeny created");
                navigate('/szuletes');
            } else {
                console.error('Error posting esemeny data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        
        <div className=' p-5 consent bg-whitesmoke text-center'style={{ justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
            <h1 className='mb-5'>Hogy született?</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Baba ID</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='babaId' type='number' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>FelhasznaloId</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='felhasznaloId' type='number' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Név</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='nev' type='text'/>
                    </div>
                </div>
                
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Időpont</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='idopont' type='date' step='0.01' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Hely</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='hely' type='text' step='0.01' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Súly</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='suly' type='number' step='0.01' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Hossz</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='hossz' type='number' step='0.01' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Hajszín</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='hajszin' type='text' step='0.01' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Szemszín</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='szemszin' type='text' step='0.01' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Vércsoport</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='vercsoport' type='text' step='0.01' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Csillagjegy</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='csillagjegy' type='text' step='0.01' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Születéstörténet</label>
                    <div className='col-sm-10'>
                        <input className='form-control' name='szuletestort' type='text' step='0.01' />
                    </div>
                </div>
                <div className='form-group row pg-3'>
                    <label className='col-sm-2 col-form-label'>Babafotó</label>
                    <div className='col-sm-10'>
                        <input type="file" onChange={handleModImageChange} />
                    </div>
                </div>
                <button type='submit' className='btn btn-success'>Küldés</button>
            </form>
        </div>
    );
}

export default SzuletesCreatePage;
