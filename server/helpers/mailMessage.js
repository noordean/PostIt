import nodemailer from 'nodemailer';

const sendMail = (message, recepient, subject) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: '"PostIt" <noreply@postit.com>',
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
