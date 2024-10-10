const DataBaseMySQL = require('../../database/database')

class Professor{

    #id_user
    #id_group

    constructor( id_user, id_group){
        this.#id_user = id_user
        this.#id_group = id_group
    }

    get id_user(){
        return this.#id_user
    }
    set id_user(value){
        this.#id_user = value
    }

    get id_group(){
        return this.#id_group
    }
    set id_group(value){
        this.#id_group = value
    }

    toJson() {

        return{
            "id_user": this.#id_user,
            "id_group": this.#id_group,
        }
    }

}

class ProfessorDAO{
    
    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async registrarprofessor(
        id_user,
        id_group,){

         
            const professor = new Professor(id_user, id_group);

            const sql = await this.#db.addProfessor(professor.toJson())

            return sql.insertId;
    }

}

module.exports = ProfessorDAO
