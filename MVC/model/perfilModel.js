const DataBaseMySQL = require('../../database/database')

class Perfil{

    #id
    #nome
    #rg
    #cpf
    #email
    #senha
    #genero
    #dt_nascimento
    #endereco

    constructor( nome, rg, cpf, email, senha, genero, dt_nascimento, endereco,){
        this.#nome = nome
        this.#rg = rg
        this.#cpf = cpf
        this.#email = email
        this.#senha = senha
        this.#genero = genero
        this.#dt_nascimento = dt_nascimento
        this.#endereco = endereco
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

    get rg(){
        return this.#rg
    }
    set rg(value){
        this.#rg = value
    }

    get cpf(){
        return this.#cpf
    }
    set cpf(value){
        this.#cpf = value
    }

    get email(){
        return this.#email
    }
    set email(value){
        this.#email = value
    }

    get senha(){
        return this.#senha
    }
    set senha(value){
        this.#senha = value
    }

    get genero(){
        return this.#genero
    }
    set genero(value){
        this.#genero = value
    }

    get dt_nascimento(){
        return this.#dt_nascimento
    }
    set dt_nascimento(value){
        this.#dt_nascimento = value
    }

    get endereco(){
        return this.#endereco
    }
    set endereco(value){
        this.#endereco = value
    }

    toJson() {

        return{
            "id": this.#id,
            "nome": this.#nome,
            "rg": this.#rg,
            "cpf": this.#cpf,
            "email": this.#email,
            "senha": this.#senha,
            "genero": this.#genero,
            "dt_nascimento": this.#dt_nascimento,
            "endereco": this.#endereco,
        }
    }

}

class PerfilDAO{
    
    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarUm(id){

        const query = await this.#db.SelectPerfil(id)

        const perfil = new Perfil()

        if(query){
            perfil.id = query[0].id_cadastro
            perfil.nome = query[0].nome_cadastro
            perfil.rg = query[0].rg_cadastro
            perfil.cpf = query[0].cpf_cadastro
            perfil.email = query[0].email_cadastro
            perfil.senha = query[0].senha_cadastro
            perfil.genero = query[0].genero_cadastro
            perfil.dt_nascimento = query[0].dt_nascimento_cadastro
            perfil.endereco = query[0].endereco_cadastro  
        }

        return perfil.toJson()
    }

}

module.exports = PerfilDAO
