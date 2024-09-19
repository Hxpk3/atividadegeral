var mysql = require('mysql2')

class DataBaseMySQL {
    
    #connection

    constructor(){
        this.#connection = mysql.createPool({
            host: '10.111.4.30',
            user: 'backend',
            password: 'B4ckUs$r2024',
            database: 'controleescolar'
        }).promise();
    }

    async SelectLogin(email, senha) {
        const query = await this.#connection.query('select * from cadastro_user where email_cadastro =? and senha_cadastro =?',[email, senha])
       return query
    }
}

module.exports = DataBaseMySQL
