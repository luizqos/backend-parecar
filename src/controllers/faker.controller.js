class FakerController {
    async montaEstacionamento(req, res) {
        function gerarCNPJ() {
            const cnpjArray = Array.from({ length: 12 }, () =>
                Math.floor(Math.random() * 10)
            )
            cnpjArray.push(calcularDigitoVerificador(cnpjArray, 12))
            cnpjArray.push(calcularDigitoVerificador(cnpjArray, 13))

            return cnpjArray.join('')
        }

        function calcularDigitoVerificador(cnpjArray, posicao) {
            const multiplicadores =
                posicao === 12
                    ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
                    : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
            const soma = cnpjArray.reduce(
                (acc, digit, index) => acc + digit * multiplicadores[index],
                0
            )
            const resto = soma % 11

            return resto < 2 ? 0 : 11 - resto
        }

        function generateRandomPassword(length) {
            const characters =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            let password = ''
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(
                    Math.random() * characters.length
                )
                password += characters.charAt(randomIndex)
            }
            return password
        }

        function generateRandomPhone() {
            const ddd = '31'
            const randomNumber = Math.floor(Math.random() * 1000000000)
                .toString()
                .padStart(9, '0')
            return ddd + randomNumber
        }

        async function buscarCEP(cepAleatorio) {
            try {
                const response = await fetch(
                    `https://viacep.com.br/ws/${cepAleatorio}/json/`
                )
                const data = await response.json()

                if (!data.erro) {
                    return data
                }
            } catch (error) {
                console.error('Erro ao buscar o CEP:', error)
            }
        }
        const arrayPessoa = [
            'João da Silva',
            'Maria Santos',
            'Carlos Oliveira',
            'Ana Pereira',
            'Pedro Rodrigues',
            'Laura Fernandes',
            'Bruno Costa',
            'Sofia Ramos',
            'André Almeida',
            'Isabel Sousa',
            'Rui Martins',
            'Diana Silva',
            'Francisco Pereira',
            'Beatriz Gonçalves',
            'Miguel Santos',
            'Inês Ferreira',
            'Tiago Rodrigues',
            'Rita Costa',
            'Luís Cardoso',
            'Mariana Carvalho',
            'Guilherme Gomes',
            'Carolina Vieira',
            'Paulo Santos',
            'Camila Pereira',
            'David Silva',
            'Catarina Sousa',
            'André Martins',
            'Joana Ferreira',
            'Nuno Oliveira',
            'Lúcia Rodrigues',
            'António Pereira',
            'Filipa Gonçalves',
            'Ricardo Fernandes',
            'Marta Costa',
            'Diogo Almeida',
            'Inês Sousa',
            'Vasco Martins',
            'Leonor Ribeiro',
            'João Santos',
            'Daniela Rodrigues',
            'Manuel Silva',
            'Ana Rita Lima',
            'Gustavo Pereira',
            'Clara Gonçalves',
            'Eduardo Costa',
            'Bruna Fernandes',
            'Renato Sousa',
            'Sara Almeida',
            'André Ferreira',
            'Patrícia Ramos',
            'Henrique Oliveira',
            'Bárbara Rodrigues',
            'João Pedro Gomes',
            'Mafalda Carvalho',
            'Diogo Rodrigues',
            'Isabel Santos',
            'Raul Silva',
            'Beatriz Pereira',
            'Gabriel Martins',
            'Margarida Costa',
            'Rodrigo Pereira',
            'Adriana Sousa',
            'Hugo Almeida',
            'Ana Luísa Ferreira',
            'João Miguel Ramos',
            'Helena Oliveira',
            'Tiago Ribeiro',
            'Laura Silva',
            'Gonçalo Costa',
            'Sofia Ferreira',
            'Rafael Santos',
            'Inês Rodrigues',
            'Lucas Oliveira',
            'Catarina Alves',
            'Pedro Sousa',
            'Luana Santos',
            'Daniel Fernandes',
            'Carolina Almeida',
            'António Rodrigues',
            'Mariana Pereira',
            'Gustavo Costa',
            'Matilde Martins',
            'André Oliveira',
            'Sofia Lima',
            'Ricardo Santos',
            'Beatriz Fernandes',
            'Lucas Almeida',
            'Joana Silva',
            'Miguel Rodrigues',
            'Rita Ferreira',
            'Diogo Costa',
            'Inês Pereira',
            'Guilherme Santos',
            'Leonor Fernandes',
            'Pedro Martins',
            'Sofia Sousa',
            'Francisco Almeida',
            'Carolina Rodrigues',
            'Tomás Costa',
            'Mariana Gonçalves',
        ]

        const arrayCep = [
            '31080470',
            '30590250',
            '30512150',
            '31741371',
            '30668080',
            '31975350',
            '31630330',
            '31615550',
            '31810100',
            '30670120',
            '30350300',
            '31360390',
            '30530450',
            '30855080',
            '30555000',
            '31270695',
            '31845270',
            '31370326',
            '30672760',
            '30514466',
            '30664630',
            '30664002',
            '30555310',
            '30555300',
            '30662051',
            '30590361',
            '30644180',
            '30555320',
            '30335690',
            '30120000',
            '31260420',
            '31744053',
            '31870720',
            '30280110',
            '31812030',
            '31210390',
            '31910020',
            '30525230',
            '30882490',
            '30525410',
            '31741600',
            '30310590',
            '31555180',
            '30880270',
            '30624050',
            '31545300',
            '31844430',
            '31742135',
            '31975360',
            '31030390',
        ]

        const registros = []

        for (let i = 0; i < 30; i++) {
            const indiceAleatorio = Math.floor(Math.random() * arrayCep.length)
            const cepAleatorio = arrayCep[indiceAleatorio]
            const indicenomeAleatorio = Math.floor(
                Math.random() * arrayPessoa.length
            )
            const nomeAleatorio = arrayPessoa[indicenomeAleatorio]
            //console.log(cepAleatorio)
            const cepBuscado = await buscarCEP(cepAleatorio)

            if (cepBuscado) {
                //console.log(cepBuscado.cep)
                const nomecontato = `${nomeAleatorio}`
                const razaosocial = `Parecar - ${nomeAleatorio}`
                const cnpj = gerarCNPJ()
                const email = `email${i + 1}@parecar.com`
                const senha = generateRandomPassword(8)
                const telefone = generateRandomPhone()
                const cep = cepAleatorio
                const logradouro = cepBuscado.logradouro
                const numero = `${Math.floor(Math.random() * 900) + 100}`
                const complemento = 'FRENTE'
                const bairro = cepBuscado.bairro.replace(/ \([^)]*\)/g, '')
                const cidade = cepBuscado.localidade
                const estado = cepBuscado.uf
                const status = 1

                const registro = {
                    nomecontato,
                    razaosocial,
                    nomefantasia: razaosocial,
                    cnpj,
                    email,
                    senha,
                    telefone,
                    cep,
                    logradouro,
                    numero,
                    complemento,
                    bairro,
                    cidade,
                    estado,
                    status,
                }

                registros.push(registro)
            }
        }

        //console.log(JSON.stringify(registros, null, 2))

        return res.status(200).send(JSON.stringify(registros, null, 2))
    }
}

module.exports = new FakerController()
