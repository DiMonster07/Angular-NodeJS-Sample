module.exports = {  
  transporter: {
    pool: true,
    host: 'mail.isecarctic.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'iahr-ice2018@isecarctic.ru',
      pass: 'iahr2018ice'
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  fromAddress: {
    name: 'ADMINISTRATOR',
    address: 'iahr-ice2018@isecarctic.ru'
  }
};