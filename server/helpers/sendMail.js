import nodemailer from 'nodemailer';

const sendMail = (message, recepient, subject) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to: recepient,
    subject,
    text: '',
    html: message
  };
  let mailStatus = true;
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      mailStatus = false;
    }
  });
  return mailStatus;
};

export default sendMail;
