const assunto = 'Cancelamento de Reserva'

const templateAlteraSenha = () => {
    const corpoEmail = `<html>

    <head>
        <meta charset="UTF-8">
        <title>Cancelamento de Reserva - Parecar</title>
        <style>
            .header {
                padding: 10px;
                text-align: left;
            }
    
            .greeting {
                line-height: 22.4px;
                color: #212945;
                font-size: 16px;
                font-weight: 600;
            }
    
            .message {
                font-size: 16px;
                line-height: 27.2px;
                color: #212945;
            }
    
            .footer-container {
                padding: 0px;
                background-color: #ffffff;
            }
    
            .footer {
                margin: 0 auto;
                min-width: 320px;
                max-width: 600px;
                padding: 10px;
            }
    
            .footer-background {
                background-color: #FFBE00;
                text-align: center;
            }
    
            .copyright-text {
                font-size: 12px;
                line-height: 16.8px;
                color: #000000;
            }
    
            .auto-message {
                text-align: center;
                font-size: 11px;
                line-height: 16.8px;
                color: #5c5959;
            }
    
            .reserva {
                border-collapse: collapse;
                width: 60%;
            }
    
            .reserva-coluna1 {
                width: 15%;
                background-color: #f2f2f2;
            }
    
            .reserva-coluna2 {
                width: 35%;
                background-color: #e6e6e6
            }
    
            .logo {
                margin: auto;
                align-items: center;
                width: 7%;
                position: relative;
                margin-left: 50;
                margin-right: 50;
                top: 0;
                bottom: 0;
            }
        </style>
    </head>
    
    <body>
        <table style="width: 100%;">
            <tbody>
                <tr>
                    <td class="header">
                        <div>
                            <p>
                                <span class="greeting">Prezado(a) [Nome do Cliente]</span>
                            </p>
                            <p>
                                <span class="message">Gostaríamos de informar que sua reserva foi cancelada para
                                    o <strong>[Nome do Evento/Local]</strong> agendado para <strong>[Data da
                                        Reserva]</strong>.
                                </span>
                            </p>
                            <p>
                                <span class="message">Lamentamos qualquer inconveniente que isso possa causar e entendemos
                                    que isso pode ser
                                    frustrante.</span>
                            </p>
                            <p>
                                <span class="message">Por favor, note as seguintes informações relacionadas ao
                                    cancelamento:</span>
                            </p>
    
                            <table border="0" cellpadding="10" cellspacing="0" class="reserva">
                                <tr>
                                    <td class="reserva-coluna1"><strong>Nome do Cliente</strong></td>
                                    <td class="reserva-coluna2">Luiz Antonio alves da silva</td>
                                </tr>
                                <tr>
                                    <td class="reserva-coluna1"><strong>Nº Reserva</strong></td>
                                    <td class="reserva-coluna2">239849</td>
                                </tr>
                                <tr>
                                    <td class="reserva-coluna1"><strong>Data da Reserva</strong></td>
                                    <td class="reserva-coluna2">25/12/2023 11:00:00</td>
                                </tr>
                                <tr>
                                    <td class="reserva-coluna1"><strong>Local</strong></td>
                                    <td class="reserva-coluna2">Estacionamento Credenciado Parecar</td>
                                </tr>
                            </table>
    
                            <p>Se você tiver alguma dúvida ou precisar de mais assistência, não hesite em entrar em contato
                                conosco.
                            </p>
                            <p>Estamos à disposição para ajudar a resolver qualquer problema ou fornecer
                                informações adicionais.</p>
                            <p>Lamentamos sinceramente por qualquer inconveniente que isso possa causar e esperamos poder
                                atendê-lo em futuras oportunidades.
                            </p>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    
        <div class="footer-container">
            <p>Atenciosamente</p>
            <img class="logo" src="http://forgot.faciliptv.net.br/confirma/assets/img/logo.png" alt="Parecar">
            <div class="footer">
                <table style="width: 100%;">
                    <tbody>
                        <tr>
                            <td>
                                <div class="footer-background">
                                    <p>
                                        <span class="copyright-text">Parecar - Todos os direitos reservados</span>
                                    </p>
                                </div>
                                <p>
                                    <span class="auto-message">Esta é uma mensagem automática, não é necessário
                                        respondê-la.</span>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </body>
    
    </html>`

    return corpoEmail
}

module.exports = {
    templateAlteraSenha,
    assunto,
}
