const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./database/config');

// crear el servidor express
const app = express();

app.use( cors());


dbConnection();


app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg:"Hello Mundo"
    })
})

app.listen(3000, () => {
    console.log('servidor corriendo ' + process.env.PORT)
});



