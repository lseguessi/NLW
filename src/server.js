const express = require('express')
const server = express()

//pegar o bando de dados
const db = require('./database/db')


//usar pasta public
server.use(express.static('public'))


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
    return res.render('create-point.html')
})

//Page results
server.get('/search', (req, res) => {

    // Pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows){
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