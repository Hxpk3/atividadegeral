var mysql = require('mysql2')

class DataBaseMySQL {
    
    #connection

    constructor(){
        this.#connection = mysql.createPool({
            host: process.env.DATABASE_HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: process.env.DATABASE_PORT
        }).promise();
    }

    async SelectLogin(email, senha) {
        const query = await this.#connection.query('select * from cadastro_user where email_cadastro =? and senha_cadastro =?',[email, senha])
       return query
    }
}

module.exports = DataBaseMySQL
