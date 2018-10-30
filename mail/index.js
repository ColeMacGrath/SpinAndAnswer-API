const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    });

    this.mailOptions = {
      from: '"SpinAndAnswer" <SpinAndAnswer@gmail.com>',
    };
  }

  sendMail(options) {
    let mailOptions = {
      ...this.mailOptions,
      ...options,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      return true;
    });
  }
}

module.exports = new MailSender();
