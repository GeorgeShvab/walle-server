import nodemailer from 'nodemailer'

const EMAIL = process.env.EMAIL
const PASSWORD = process.env.EMAIL_PASSWORD

if (!EMAIL) throw new Error('No project email')
if (!PASSWORD) throw new Error('No project email password')

interface EmailParams {
  to: string
  html: string
  subject: string
  text: string
}

const email = async ({ to, html, subject, text }: EmailParams) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  })

  const mailOptions = {
    from: '"WallE Service" walle-service@outlook.com',
    to: to,
    name: 'WallE Service',
    subject,
    html,
    text,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Email sending failed')
      console.log(error)
    }
  })
}

export default email
