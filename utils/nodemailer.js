const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    service:"gmail",
    auth:{
        user:process.env.MAIL,
        pass:process.env.PASS
    }
});

const template = handlebars.compile(
    fs.readFileSync(path.join("./pages/mail.handlebars"), "utf-8")
);

const template2 = handlebars.compile(
    fs.readFileSync(path.join("./pages/userMail.handlebars"),"utf-8")
);

const option1 = (data) =>{
    return {
        from : process.env.MAIL,
        to : process.env.MAIL2,
        replyTo : data.email,
        subject : `Hello from ${data.name}.`,
        html: template(data)
    }
}

const option2 = (data) =>{
    return {
        from : process.env.MAIL,
        to : data.email,
        replyTo:process.env.MAIL2,
        subject : `Hi ${data.name}, your query is sent to Go Realtors.`,
        html: template2(data)
    }
}


const sendMail = (data)=>{
    transporter.sendMail(
        option1(data)
    )
    transporter.sendMail(
        option2(data)
    )
}



module.exports = sendMail;
