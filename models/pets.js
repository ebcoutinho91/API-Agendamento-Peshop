const conexao  = require('../infraestrutura/database/conexao')
const uploadDeArquivos = require('../infraestrutura/arquivos/updaloadDeArquivos')

class Pet {
    adiciona(pet, res) {
        const query = 'INSERT INTO Pets SET ?'


        uploadDeArquivos(pet.imagem, pet.nome, (erro, novoCaminho) => {

            if (erro) {
                res.status(400).json({ erro })
            } else {
                const novoPet = { nome: pet.nome, imagem: novoCaminho }

                conexao.query(query, novoPet, erro => {
                    if (erro) {
                        console.log({queryErro: erro})
                        res.status(400).json(erro)
                    } else {
                        res.status(200).json(novoPet)
                    }
                })
            }
        })
    }
}

module.exports = new Pet