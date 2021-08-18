const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/database/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')

conexao.connect(erro => {
    erro? 
    console.log(erro): 
    console.log('Conexão com o BD realzada!')

    Tabelas.init(conexao)

    const app = customExpress()

    app.listen(3000, () => console.log('Server runing at port 3000')) 
})



