require('dotenv').config();
require('./config/db.js');
const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(cors());
app.use(express.json({limit:'200mb'}));

const UserController = require('./controllers/contact.js');


const serverRefresher = ()=>{
    setInterval(() => {
      console.log("Wake up")
       axios.get(`${process.env.DOMAIN}/healthChecker`)
    }, (14*60*1000));
}


app.get('/',(req,res)=>{
    res.send({
        code:200,
        message:'Backend is running successfully',
        response:{}
    })
})


app.get('/allUsers',UserController.getUsers);
app.get('/healthChecker',(req,res)=>{
    try{
        res.status(200).send('wake up')
    }
    catch(err){
        res.status(200).send({
            code:400,
            error:true,
            message:err.message,
            response:[]
        })
    }
});

app.post('/contact',UserController.addUser);


serverRefresher();



app.listen(PORT, {cors:{origin:'*'}}, ()=>{
    console.log(`Conection established successfuly on http://localhost:${PORT}`);
})