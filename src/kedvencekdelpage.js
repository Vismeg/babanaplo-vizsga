import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export function KedvencekDelPage() {
    const navigate = useNavigate();
    const param = useParams();
    const id = param.id;
    console.log(id)
    useEffect(() => {
        const deleteKedvencek = async () => {
            try{
            const response = await fetch('http://localhost:5244/api/Kedvencek/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.status.toString().startsWith('2')) {
                console.log("Az id: " + id + " törölve lett.");
                throw new Error('Request failed!');
            }
            else {
                console.log("Törlés sikertelen.");
                throw new Error('Request failed!');
            }}
             catch(error) {
                console.log(error);
            }
        };
        deleteKedvencek();
        navigate("/kedvencek");
    },[id]);
}
export default KedvencekDelPage;