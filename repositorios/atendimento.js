const query = require('../infraestrutura/database/queries')

class Atendimento {
    adiciona(atendimento) {
        const sql = 'INSERT INTO Atendimentos SET ?'
        return query(sql, atendimento)
    }

    lista() {
        const sql = 'SELECT * FROM Atendimentos'

        return query(sql)    
    }

    deleta(atendimento) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        return query(sql, atendimento)
    }

    altera(atendimento) {
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        return query(sql, atendimento)
    }

    buscaPorId(id) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        return query(sql, id)
    }


}

module.exports = new Atendimento()