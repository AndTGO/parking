import Modal from 'react-modal';
import React from 'react';



function Form({ onSubmit }) {


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:4000/api/registerIn', {
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
        Registro de Placa:
        <input type="text" name="vehiculo" placeholder='numero de placa' />
      </label>

      <button type="submit">Enviar</button>
    </form>

  );

}

export default Form