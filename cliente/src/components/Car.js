import Modal from 'react-modal';
import React from 'react';



function Car({ onSubmit }) {


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:4000/api/car', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
            } else {
                console.error('Error al enviar los datos al servidor');
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };



    return (

        <form onSubmit={handleSubmit}>
            <label>
                Registro de vehiculo:
                <input type="text" name="placa" placeholder='Registro de placa' />
            </label>

            <label>
                Tipo de Vehículo:
                <select name="tipo">
                    <option value="1">Oficial</option>
                    <option value="2">Residente</option>
                    <option value="3">No-Residente</option>
                </select>
            </label>
            <button type="submit">Enviar</button>
        </form>

    );

}

export default Car