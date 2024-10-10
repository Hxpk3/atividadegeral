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

    //Consulta de Perfil
    async SelectPerfil(id) {
        const query = await this.#connection.query('select * from cadastro_user where id_cadastro =' +id)
        return query[0]
    }

    // Login 
    async SelectLogin(email, senha) {
        const query = await this.#connection.query('select * from cadastro_user where email_cadastro =? and senha_cadastro =?',[email, senha])
       return query
    }

    // Cadastro Professor
    async addProfessor(param) {
        const sql = `insert into usuario_grupo (id_usuario, id_grupo)
        values ('${param.id_user}','${param.id_group}')`  
        
        const query = await this.#connection.execute(sql)
        return query[0]
    }
}

module.exports = DataBaseMySQL
