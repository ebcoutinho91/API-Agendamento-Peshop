const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, res) {

        const  dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataEhvalida = moment(data).isAfter(dataCriacao)
        const clienteEhvalido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhvalida,
                mensagem: 'A data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente', 
                valido: clienteEhvalido,
                mensagem: 'O nome do cliente deve ter ao menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {

            const atendimentoDatado = {...atendimento, dataCriacao, data}   

            const sql = 'INSERT INTO Atendimentos SET ?'
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                erro? res.status(400).json(erro) : res.status(201).json({postedContent: atendimento})
            })
            
        }
    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
                
            }
        })
    }

    buscaPorId(id, res) {
        const sql  = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados[0])
            }
        })
    }

    altera(id, valores, res) {

        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE Atendimentos SET? WHERE id=?'

        conexao.query(sql,[valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
                console.log(erro)
            } else {
                res.status(200).json({updatedData:{...valores, id}})
            }

        })
        
    }

    deleta(id, res) {
        const sql  = `DELETE FROM Atendimentos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({deletedId: id})
                
            }
        })        
    }
}

module.exports = new Atendimento