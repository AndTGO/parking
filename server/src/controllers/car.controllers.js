const { pool } = require("../database.js");


const getCar = async (req, res) => {
    const result = await pool.query("SELECT c.placa, c.tipo, t.nombre FROM car AS c INNER JOIN tipo AS t ON c.tipo = t.id; ")

    const FirstMatriz = result[0];

    res.json(FirstMatriz);


};

const postCar = async (req, res) => {
    try {
        const { placa, tipo } = req.body;

        const existingCarQuery = " SELECT COUNT(*) as count FROM car WHERE LOWER(placa) = LOWER(?) ";
        const existingCarValues = [placa];
        console.log("🚀 ~ file: car.controllers.js:20 ~ postCar ~ placa:", placa)
        
        const existingCarResult = await pool.query(existingCarQuery, existingCarValues);
  
        const existingCarCount = existingCarResult[0][0].count;
  

        if (existingCarCount === 0) {
            const insertQuery = "INSERT INTO car (placa, tipo) VALUES (?, ?)";
            const insertValues = [placa, tipo];
            await pool.query(insertQuery, insertValues);
            res.status(201).json({ message: "Registro de automóvil insertado correctamente" });


        } else {
            res.status(409).json({ message: "El registro de automóvil ya existe ddd" });

        }
    } catch (error) {
        console.error("Error al insertar un automóvil:", error);
        res.status(500).json({ message: "Error al insertar un automóvil" });
    }

};

module.exports = { getCar, postCar };