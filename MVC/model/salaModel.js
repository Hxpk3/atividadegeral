const DataBaseMySQL = require('../../database/database')

class Sala{

    #id
    #nome
    #capacidade
    #descricao

    constructor( nome, capacidade, descricao){
        this.#nome = nome
        this.#capacidade = capacidade
        this.#descricao = descricao
    }


    get id(){
        return this.#id
    }
    set id(value){
        this.#id = value
    }

    get nome(){
        return this.#nome
    }
    set nome(value){
        this.#nome = value
    }

    get capacidade(){
        return this.#capacidade
    }
    set capacidade(value){
        this.#capacidade = value
    }

    get descricao(){
        return this.#descricao
    }
    set descricao(value){
        this.#descricao = value
    }

    toJson() {

        return{
            "id": this.#id,
            "nome": this.#nome,
            "capacidade": this.#capacidade,
            "descricao": this.#descricao
        }
    }

}

class SalaDAO{
    
    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarTodos(){

        let list_sala = []

        const query = await this.#db.SelectSala()

        for (let index = 0; index < query.length; index++) {

            const sala = new Sala()

            sala.id = query[index].id_sala
            sala.nome = query[index].nome_sala
            sala.capacidade = query[index].capacidade
            sala.descricao = query[index].descricao_sala

            list_sala.push(sala.toJson())     
        }


       
        return list_sala
    }

    async consultarUm(id){

        const query = await this.#db.SelectSalaId(id)

        const sala = new Sala()

        if(query){
            sala.id = query[0].id_sala
            sala.nome = query[0].nome_sala
            sala.capacidade = query[0].capacidade
            sala.descricao = query[0].descricao_sala 
        }

        return sala.toJson()
    }

    async registerProfile(
        nome,
        capacidade,
        descricao){

         
            const sala = new Sala(nome, capacidade, descricao);

            const sql = await this.#db.addSala(sala.toJson())

            return sql.insertId;
        }

}

module.exports = SalaDAO
