const assunto = 'Confirmação de alteração de senha Parecar'

const templateAlteraSenha = (hash) => {
    const urlEnvio = `${process.env.URL_FORGOT}${hash}`
    const corpoEmail = `<html>
    <head>
        <meta charset="UTF-8">
        <title>Confirmação de alteração de senha - Parecar</title>
        <style>
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
        </style>
    </head>
    
    <body>
        <table style="width: 100%;">
            <tbody>
                <tr>
                    <td style="padding: 10px;" align="left">
                        <br />
                        <div>
                            <br />
                            <p>
                                <span
                                    style="line-height: 22.4px; color: #212945; font-size: 16px; font-weight: 600;">Prezado(a),</span>
                            </p>
                            <p>
                                <span style="font-size: 16px; line-height: 27.2px; color: #212945;">Clique no botão abaixo
                                    para confirmar a alteração de senha do seu acesso ao Parecar</span>
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
                            <td style="padding: 10px;" align="left">
                                <div style="background-color: #FFBE00;">
                                    <p style="text-align: center;">
                                        <span style="font-size: 12px; line-height: 16.8px; color: #000000;">Parecar - Todos
                                            os
                                            direitos reservados</span>
                                    </p>
                                </div>
                                    <p style="text-align: center;">
                                        <span style="font-size: 11px; line-height: 16.8px; color: #5c5959;">Esta é uma
                                            mensagem
                                            automática, não é necessário respondê-la.</span>
                                    </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
    </body>
    
    </html>`

    return corpoEmail
}

module.exports = {
    templateAlteraSenha,
    assunto,
}
