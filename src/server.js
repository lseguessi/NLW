const express = require('express')
const server = express()

//pegar o bando de dados
const db = require('./database/db')


//usar pasta public
server.use(express.static('public'))

// Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// Utilizando template engine (Nunjucks)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})


//configurar caminhos da minha aplicação
//return render só renderiza por um engine template (nunjucks)
//Página inicial (home)
server.get('/', (req, res) => {
    return res.render('index.html')
})

//create point route
server.get('/create-point', (req, res) => {

    //Recebendo os dados do formulário
    // re.query: Query strings da nossa URL
    // console.log(req.query)

    return res.render('create-point.html')
})

//Após adicionar action e method no formulaário 
server.post('/savepoint', (req, res) =>{
    
    // req.body: O corpo do nosso formulário
    // console.log(req.body)

    //Inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name, 
            address, 
            address2, 
            state, 
            city, 
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]

    function afterInsertData(err) {
        if(err){
            console.log(err)
            return res.send("Erro no cadastro")
        }

        console.log('Cadastrado com sucesso!')
        console.log(this)

        return res.render('create-point.html', { saved: true })
    }

    db.run(query, values, afterInsertData)

})

//Page results
server.get('/search', (req, res) => {

    const search = req.query.search

    if(search == ""){
        // pesquisa vazia
        return res.render('search-results.html', { total: 0 })
    }

    // Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length       
        
        //Mostrar a página html com os dados do banco de dados.
        return res.render('search-results.html', { places: rows, total: total })
    })
})

// Ligar o servidor
server.listen(3000)