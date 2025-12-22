const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    try{
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "dbserver",
      pass: "wfpyxlzwfizjweuj",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: options.email,
    to: "mindversitysports@gmail.com",
    subject: options.subject,
    html: options.html,
    // html:
  };

  // 3) Actually send the email
  const result = await transporter.sendMail(mailOptions);  
  return {success: true, result};   
    }catch(error){
        console.log("Email Error:", error);
        return { success: false, error: error.message };
    }
  
};

module.exports = {sendEmail};