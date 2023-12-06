const express = require('express')
const database = require("./config/database");
const app = express()
const cors = require("cors");
const port = 3000

database();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8100",
  })
);

//rutas
app.use('/estacionamiento', require('./routes/estacionamiento'));
app.use('/usuarios', require('./routes/usuarios'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

