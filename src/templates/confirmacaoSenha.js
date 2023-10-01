const assunto = 'Confirmação de alteração de senha Parecar'

const templateAlteraSenha = (hash) => {
    const urlEnvio = `${process.env.URL_FORGOT}${hash}`
    const corpoEmail = `<html>

    <head>
        <meta charset="UTF-8">
        <title>Confirmação de alteração de senha - Parecar</title>
    
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
    
            .botao-confirmar {
                background-color: #FFBE00;
                border: none;
                color: black;
                padding: 10px 20px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                border-radius: 10px;
            }
    
            .footer {
                padding: 10px;
                text-align: center;
            }
    
            .footer-background {
                background-color: #FFBE00;
            }
    
            .footer p {
                font-size: 12px;
                line-height: 16.8px;
                color: #000000;
            }
    
            .auto-message {
                font-size: 11px;
                line-height: 16.8px;
                color: #5c5959;
            }
        </style>
    </head>
    
    <body>
        <table style="width: 100%;">
            <tbody>
                <tr>
                    <td class="header">
                        <div>
                            <br />
                            <p>
                                <span class="greeting">Prezado(a).</span>
                            </p>
                            <p>
                                <span class="message">Clique no botão abaixo para confirmar a alteração de senha do seu
                                    acesso ao Parecar</span>
                            </p>
                            <br />
                            <a href="${urlEnvio}" class="botao-confirmar">Confirmar</a>
                            <br />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    
        <div class="u-row-container" style="padding: 0px; background-color: #ffffff">
            <div class="u-row" style="margin: 0 auto; min-width: 320px; max-width: 600px;">
                <table style="width: 100%;">
                    <tbody>
                        <tr>
                            <td class="footer">
                                <div class="footer-background">
                                    <p style="text-align: center;">
                                        <span class="copyright-text">Parecar - Todos os direitos reservados</span>
                                    </p>
                                </div>
                                <p style="text-align: center;">
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
