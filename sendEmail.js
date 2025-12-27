// const nodemailer = require("nodemailer");

// const sendEmail = async (options) => {
//     try{
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: "dbserver",
//       pass: "wfpyxlzwfizjweuj",
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   // 2) Define the email options
//   const mailOptions = {
//     from: options.email,
//     to: "mindversitysports@gmail.com",
//     subject: options.subject,
//     html: options.html,
//     // html:
//   };

//   // 3) Actually send the email
//   const result = await transporter.sendMail(mailOptions);  
//   return {success: true, result};   
//     }catch(error){
//         console.log("Email Error:", error);
//         return { success: false, error: error.message };
//     }
  
// };

// module.exports = {sendEmail};

const nodemailer = require("nodemailer");

// ---------------------------
// 🔹 HARDCODED SMTP CREDENTIALS (Namecheap Private Email)
// ---------------------------
const BUSINESS_EMAIL = "info@mindversitysport.com";         // your business email
const BUSINESS_PASS = "@Mindversity2025";        // Namecheap Private Email password
const ADMIN_EMAIL = "info@mindversitysport.com"; // fixed recipient

/**
 * Sends a contact form email
 * @param {Object} options
 * @param {string} options.email - User's email (for Reply-To)
 * @param {string} options.subject - Subject of message
 * @param {string} options.html - HTML content of message
 */
const sendEmail = async (options) => {
  try {
    const { email, subject, html } = options;

    if (!email || !subject || !html) {
      throw new Error("Missing required fields: email, subject, or html");
    }

    console.log("[Email] Setting up transporter...");

    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",  // Namecheap Private Email SMTP host
      port: 465,                      // SSL port
      secure: true,
      auth: {
        user: BUSINESS_EMAIL,
        pass: BUSINESS_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify transporter connection
    await transporter.verify();
    console.log("[Email] Transporter verified successfully.");

    const mailOptions = {
      from: ADMIN_EMAIL,   // actual sending account
      to: ADMIN_EMAIL,        // recipient
      subject: subject,
      html: html,             // message body from frontend
      replyTo: email,         // user’s email for replies
    };

    console.log(`[Email] Sending email from: ${mailOptions.from} to: ${mailOptions.to}`);
    const result = await transporter.sendMail(mailOptions);
    console.log("[Email] Email sent successfully:", result.messageId);

    return { success: true, result };
  } catch (error) {
    console.error("[Email] Failed to send email:", error);
    if (error.response) console.error("[Email] SMTP response:", error.response);
    if (error.code) console.error("[Email] Error code:", error.code);

    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };
