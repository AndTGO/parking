import React from "react";

function Update({onSubmit}) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const vehiculo = data.vehiculo;

        try {
          const response = await fetch(`http://localhost:4000/api/registerOut/${vehiculo}`, {
            method: 'PUT',
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
          vehiculo:
          <input type="text" name="vehiculo" placeholder='numero de placa'/>
        </label>

        <button type="submit">Enviar</button>
      </form>
    )
}

export default Update