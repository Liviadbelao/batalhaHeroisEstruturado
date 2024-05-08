const express = require('express');
const router = express.Router();
 const heroisController = require('../controllers/heroisController.js')

 router.post("/herois", heroisController.criarHerois)
 router.get("/herois", heroisController.todosHerois)
 router.put("/herois", heroisController.editarHerois)
 router.delete("/herois", heroisController.deletarHerois)

 module.exports = router;