require('dotenv').config();
const express = require('express');
const heroisRoutes = require('./routes/heroisRoutesW');


const app = express();
const port = process.env.PORT || 3000; 

app.use(express.json());

app.use('/', heroisRoutes);


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}✨`);
});