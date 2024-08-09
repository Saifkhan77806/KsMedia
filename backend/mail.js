const nodemailer = require('nodemailer');
let otps;

const sendmail = (otp, email) =>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: 'khansaif86783@gmail.com',
          pass: 'yurujgbfctjnsbou',
        },
      });
      
        transporter.verify().then(console.log).catch(console.error);
      
        transporter.sendMail({
        from: {
            name: "K's media",
            address: "khansaif86783@gmail.com"
        },
        to : email,
        subject: "Reset password OTP from K's media",
        text: 'This was designed and created by Saif khan',
        html: `<h1><b>${otp}</b> Reset password otp </br> enter otp at the webite to reset password !</h1></br><p>And also do not share this otp !</p>`
    }).then((info)=>{
        otps = otp;
        console.log({info});
    }).catch(console.error);
}

// sendmail(123, "khansaif86783@gmail.com");



module.exports = {sendmail, otps}
