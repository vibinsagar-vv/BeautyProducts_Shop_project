const nodeMailer=require('nodemailer');

const transporter=nodeMailer.createTransport({
    service:'gmail',
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:'vibinveliyath@gmail.com',
        pass:'wawj effu jfcx hehh'
    }
});

const mailoption={
    from:{
        name:'vibin',
        adress:'vibinveliyath@gmailcom'
    }
}

 const sendmailfun = async(tomailoption)=>{
    try{
        await transporter.sendMail({...mailoption,...tomailoption})
        return 'mail send to your email id'
    }catch(error){
        return error
    }
}

module.exports=sendmailfun