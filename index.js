const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(erro => {
    erro? 
    console.log(erro): 
    console.log('Conexão com o BD realzada!')

    Tabelas.init(conexao)

    const app = customExpress()

    app.listen(3000, () => console.log('Server runing at port 3000')) 
})



