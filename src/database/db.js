// Importar a dependência do sqlite3
const sqlite3 = require('sqlite3').verbose()

// Criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database('./src/database/database.db')

// Utilizar o objeto de banco de dados para nossas operações
db.serialize(() => {
    // com comandos SQL
    
    // 1-Criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXIST places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT, 
            address TEXT, 
            address2 TEXT, 
            state TEXT, 
            city TEXT, 
            items TEXT
        );
    `)

    // 2-Inserir dados na tabela
    const query = `
        INSERT INTO places (
            name, 
            image, 
            address, 
            address2, 
            state, 
            ity, 
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    db.run(query)

    // 3-Consultar dados da tabela

    // 4-Deletar um dado da tabela

})