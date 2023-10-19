const { Router } = require('express');
const { getCar, postCar } = require('../controllers/car.controllers');
const { postRegisterIn, putRegisterOut, getRegister, putRegisterReset } = require('../controllers/register.controllers');


const carRouter = Router();

carRouter.get("/car", getCar); // Usar carRouter en lugar de Router
carRouter.post("/car",postCar);


carRouter.get("/register",getRegister);
carRouter.post("/registerIn",postRegisterIn);
carRouter.put("/registerOut/:id", putRegisterOut);
carRouter.put("/registerReset", putRegisterReset);



module.exports = carRouter;
