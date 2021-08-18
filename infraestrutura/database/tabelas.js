class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarAtendimentos()
        this.criarPets()
        
    }

    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'

        this.conexao.query(sql, erro => {
            erro? console.log(erro) : console.log('Tabela Atendimentos criada com sucesso')
        })
    }

    criarPets() {
        const sql = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome varchar(50)  NOT NULL, imagem VARCHAR(200), PRIMARY KEY(ID))'

        this.conexao.query(sql, erro => {
            erro? console.log(erro) : console.log('Tabela Pets criada com sucesso')
        })
    }

    
}

module.exports = new Tabelas