const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista()
            .then(resultados =>  res.status(200).json(resultados))
            .catch(erros => res.status(400).json(erros))
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.buscaPorId(id)
            .then(atendimentoConsultado => {
                res.status(200).json(atendimentoConsultado)
            })
            .catch(erro => {
                res.status(400).json(erro)
            })
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento)
            .then(atendimentoCadastrado => {
                res.status(201).json(atendimentoCadastrado)
            })
            .catch(erros => {
                res.status(400).json(erros)
            })        
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        console.log(valores)

        Atendimento.altera(id, valores)
        .then(cadastroAlterado => res.status(200).json(cadastroAlterado))
        .catch(erros => res.status(400).json(erros) )
        
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const atendimento = parseInt(req.params.id)

        Atendimento.deleta(atendimento)
            .then(idDeletado => res.status(200).json(idDeletado))
            .catch(erros => res.status(400).json(erros))
    })    
}
