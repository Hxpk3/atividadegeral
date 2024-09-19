var DataBaseMySQL = require('../../database/database')



class Login {

   #email
   #senha
   
   constructor(email, senha) {
        this.#email = email
        this.#senha = senha
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

   permitirEntrada(dados){
    if(dados.length > 0){
        return true
    }
    else{
        return false
    }
}

   toJson(){

        return{
            "email": this.#email,
            "senha": this.#senha
        }

   }
}

class LoginDAO {

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultar(){

        let list_user = []

        const query = await this.#db.selectLogin()

        for (let index = 0; index < query.length; index++) {

            const login = new Login()

            login.email = query[index].email_cadastro
            login.senha = query[index].senha_cadastro

            list_user.push(login.toJson())     
        }


       
        return list_user
    }

    async logar(email, senha){

        const login = new Login(email, senha)

        const query = await this.#db.SelectLogin(login.email, login.senha)
       

        return login.permitirEntrada(query[0])
    }

}

module.exports = LoginDAO