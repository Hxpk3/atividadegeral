var DataBaseMySQL = require('../../database/database')



class TurmaDisciplina {

   #turma
   #disciplina
   
   constructor(turma, disciplina) {
        this.#turma = turma
        this.#disciplina = disciplina
   }


   get turma(){
    return this.#turma
   }
   set turma(value){
    this.#turma = value
   }

   get disciplina(){
    return this.#disciplina
   }
   set disciplina(value){
    this.#disciplina = value
   }



   toJson(){

        return{
            "turma": this.#turma,
            "disciplina": this.#disciplina
        }

   }
}


class TurmaDisciplinaDAO {

    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarTodos(){

        let list_turmaDisciplina = []

        const query = await this.#db.SelectTurmaDisciplina()

        for (let index = 0; index < query.length; index++) {

            const td = new TurmaDisciplina()

            td.turma = query[index].id_turma
            td.disciplina = query[index].id_disciplina

            list_turmaDisciplina.push(td.toJson())     
        }


       
        return list_turmaDisciplina
    }

    async consultarUm(id){      

        const query = await this.#db.SelectTurmaDisciplinaId(id)

        
        const td = new TurmaDisciplina()

        if(query){
            td.turma = query[0].id_turma
            td.disciplina = query[0].id_disciplina
        }

 
        return td.toJson()
    }


    async registrarTurmaDisciplina(
        turma,
        disciplina){

         
            const td = new TurmaDisciplina(turma, disciplina);

            const sql = await this.#db.addTurmaDisciplina(td.toJson())

            return sql.insertId;
        }

    async del(id){
        const linhasAfetadas =  await this.#db.delTurmaDisciplina(id)
        return linhasAfetadas.affectedRows
    }

    async att(turma, disciplinaA, disciplinaN){
        const td = new TurmaDisciplina(turma, disciplinaA)

        const r = await this.#db.upTurmaDisciplina(
            turma, disciplinaA, disciplinaN
        )

        return r.affectedRows;
    }

}

module.exports = TurmaDisciplinaDAO