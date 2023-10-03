const nodemailer = require('nodemailer')

module.exports = async (email, assunto, conteudo) => {
    const remetente = nodemailer.createTransport({
        host: 'smtp.office365.com',
        secureConnection: true,
        port: 587,
        secure: true,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        service: 'Outlook365',
        tls: {
            ciphers: 'SSLv3',
        },
    })
    const emailenviado = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: assunto,
        html: conteudo,
    }
    await remetente
        .sendMail(emailenviado)
        .then((result) => {
            return result
        })
        .catch((error) => {
            console.error('Email não enviado.', error)
            return error
        })
}
