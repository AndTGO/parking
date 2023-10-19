const { pool } = require("../database.js");


const getRegister = async (req, res) => {
    try {
        const result = await pool.query("select  c.placa, r.tiempo  from registro r  inner join car c on r.vehiculo=c.placa inner join tipo t on c.tipo = t.id");

        const Matriz = result[0];

        res.json(Matriz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener registros" });
    }




}
const postRegisterIn = async (req, res) => {
    try {
      const { vehiculo } = req.body;
      console.log("🚀 ~ file: register.controllers.js:23 ~ postRegisterIn ~ vehiculo:", vehiculo)
  
      const selectQuery = "SELECT * FROM registro WHERE vehiculo = ?";
      const selectValues = [vehiculo];
      const [rows] = await pool.query(selectQuery, selectValues);
  
      if (rows.length === 0) {
        console.log("🚀 ~ file: register.controllers.js:30 ~ postRegisterIn ~ rows:", rows)
        const insertQuery = "INSERT INTO registro (vehiculo, horaIn, horaOut, tiempo) VALUES (?, NOW(), NULL, 0)";
        const insertValues = [vehiculo];
        await pool.query(insertQuery, insertValues);
        res.status(201).json({ message: "Registro de automóvil insertado correctamente" });
      } else {
        const updateQuery = "UPDATE registro SET horaIn = NOW() WHERE vehiculo = ?";
        const updateValues = [vehiculo];
        await pool.query(updateQuery, updateValues);
        res.status(200).json({ message: "La hora de entrada ha sido actualizada" });
      }
    } catch (error) {
      console.error("Error al insertar el registro: ", error);
      res.status(500).json({ message: "Error al insertar el registro, Vehiculo no Existente en los registros" });
    }
  };
  



const putRegisterOut = async (req, res) => {

    try {
        const { vehiculo } = req.body;
        const selectQuery = "SELECT *, NOW() AS hora_actual FROM registro r  inner join car c on r.vehiculo=c.placa WHERE placa = ?";
        const selectValues = [vehiculo];
        const [rows] = await pool.query(selectQuery, selectValues);

        if (rows.length === 0) {
            res.status(201).json({ message: "No se encuentra registrado la placa del vehiculo" });
        } else {
            const horaActual = new Date(rows[0].hora_actual);
            const horaEntrada = new Date(rows[0].horaIn);
            const diferenciaEnMilisegundos = horaActual - horaEntrada;
            const diferenciaEnMinutos = Math.floor(diferenciaEnMilisegundos / (1000 * 60));

            const updateQuery = "UPDATE registro r  inner join car c on r.vehiculo=c.placa SET horaOut = NOW(), tiempo=?  WHERE c.placa = ? ";
            const updateValues = [diferenciaEnMinutos, vehiculo];
            await pool.query(updateQuery, updateValues);

            res.status(200).json({ message: "Duración de la estancia en minutos: " + diferenciaEnMinutos, updated: true });
        }
    } catch (error) {
        console.error("Error inserting the input record:", error);
        res.status(500).json({ message: "Error inserting the input record", updated: false });
    }
}

const putRegisterReset = async (req, res) => {
    try {
        const sql = 'UPDATE registro SET horaIn = NULL, horaOut = NULL, tiempo = 0';

        const [result] = await pool.execute(sql);

        console.log('Registros reiniciados correctamente');
        res.status(200).json({ message: 'Registros reiniciados correctamente' });
    } catch (error) {
        console.error('Error al reiniciar registros:', error);
        res.status(500).json({ error: 'Error al reiniciar registros' });
    }
};


module.exports = { postRegisterIn, putRegisterOut, getRegister, putRegisterReset }