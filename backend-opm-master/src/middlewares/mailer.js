// nodemailerConfig.js
const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text) {
  try {
    // Create a transporter using SMTP configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // SMTP server hostname for Gmail
      port: 587, // Port for Gmail (587 for TLS, 465 for SSL)
      secure: false, // Set to true if using SSL (465), false if using TLS (587)
      auth: {
        user: 'opm.mailers@gmail.com', // Your Gmail email address
        pass: 'duyqykgxduhsbuoz' // Your Gmail password or app password 123456789qbc
      }
    });

    // Define the email message
    const mailOptions = {
      from: 'opm.mailers@gmail.com',
      to,
      subject,
      text
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

module.exports = sendEmail;