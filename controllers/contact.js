const userModel = require('../models/user');
const sendMail = require('../utils/nodemailer')

const getUsers = async(req,res)=>{
    try{

        const data = await userModel.find().lean();
        res.status(200).send({
            code:200,
            error:false,
            message: "All users data fetched successfully",
            response:data
        })
    }
    catch(err){
        res.status(200).send({
            code:400,
            error:true,
            message:err.message,
            response:[]
        })
    }
}


const addUser = async(req,res)=>{
    try{
        const data = req.body;
        console.log("Data of the user",data);
        const dbData = await userModel.create(data)
        console.log("data stored in the db successfully",dbData);
        sendMail(data)
        res.status(200).send({
            code:200,
            error:false,
            message:"User data stored successfully",
            response:data
        })
    }
    catch(err){
        res.status(200).send({
            code:400,
            error:true,
            message:err.message,
            response:[]
        })
    }
}

module.exports = {getUsers,addUser}