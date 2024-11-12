const mongoose = require('mongoose');

mongoose.set('strictQuery',false);
mongoose.connect(`mongodb+srv://${process.env.MONGO}`).then((req,res)=>{
    console.log("Mongo DB connection established successfully");
}).catch(err=>console.log("Some error encountered while connecting to database",err))