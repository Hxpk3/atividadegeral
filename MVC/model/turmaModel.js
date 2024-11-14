const DataBaseMySQL = require('../../database/database')

class Turma{

    #id
    #anoEscolar
    #dtInicio
    #dtFinal
    #capacidadeMax
    #nivelEnsino

    constructor( anoEscolar, dtInicio, dtFinal, capacidadeMax, nivelEnsino){
        this.#anoEscolar = anoEscolar
        this.#dtInicio = dtInicio
        this.#dtFinal = dtFinal
        this.#capacidadeMax = capacidadeMax
        this.#nivelEnsino = nivelEnsino
    }

    get id(){
        return this.#id
    }
    set id(value){
        this.#id = value
    }

    get anoEscolar(){
        return this.#anoEscolar
    }
    set anoEscolar(value){
        this.#anoEscolar = value
    }

    get dtInicio(){
        return this.#dtInicio
    }
    set dtInicio(value){
        this.#dtInicio = value
    }

    get dtFinal(){
        return this.#dtFinal
    }
    set dtFinal(value){
        this.#dtFinal = value
    }

    get capacidadeMax(){
        return this.#capacidadeMax
    }
    set capacidadeMax(value){
        this.#capacidadeMax = value
    }

    get nivelEnsino(){
        return this.#nivelEnsino
    }
    set nivelEnsino(value){
        this.#nivelEnsino = value
    }

    toJson() {

        return{
            "id": this.#id,
            "anoEscolar": this.#anoEscolar,
            "dtInicio": this.#dtInicio,
            "dtFinal": this.#dtFinal,
            "capacidadeMax": this.#capacidadeMax,
            "nivelEnsino": this.#nivelEnsino,
        }
    }

}

class TurmaDAO{
    
    #db

    constructor(){
        this.#db = new DataBaseMySQL()
    }

    async consultarTodos(){

        let list_turma = []

        const query = await this.#db.SelectTurma()

        for (let index = 0; index < query.length; index++) {

            const turma = new Turma()

            turma.id = query[index].id_turma
            turma.anoEscolar = query[index].ano_escolar_turma
            turma.dtInicio = query[index].dt_inicio_turma
            turma.dtFinal = query[index].dt_final_turma
            turma.capacidadeMax = query[index].capacidade_maxima_turma
            turma.nivelEnsino = query[index].nivel_ensino_turma

            list_turma.push(turma.toJson())     
        }


       
        return list_turma
    }

    async consultarUm(id){

        const query = await this.#db.SelectTurmaId(id)

        const turma = new Turma()

        if(query){
            turma.id = query[0].id_turma
            turma.anoEscolar = query[0].ano_escolar_turma
            turma.dtInicio = query[0].dt_inicio_turma
            turma.dtFinal = query[0].dt_final_turma
            turma.capacidadeMax = query[0].capacidade_maxima_turma
            turma.nivelEnsino = query[0].nivel_ensino_turma 
        }

        return turma.toJson()
    }

    async registerTurma(
        anoEscolar,
        dtInicio,
        dtFinal,
        capacidadeMax,
        nivelEnsino){

         
            const turma = new Turma(anoEscolar, dtInicio, dtFinal, capacidadeMax, nivelEnsino);

            const sql = await this.#db.addTurma(turma.toJson())

            return sql.insertId;
        }

        async del(id){
            const linhasAfetadas =  await this.#db.delTurma(id)
            return linhasAfetadas.affectedRows
        }
    
        async att(anoEscolar,dtInicio,dtFinal,capacidadeMax,nivelEnsino, id){
            const turma = new Turma(anoEscolar,dtInicio,dtFinal,capacidadeMax,nivelEnsino, id)
                turma.id = id
    
            const r = await this.#db.upTurma(
                turma.anoEscolar, 
                turma.dtInicio, 
                turma.dtFinal,
                turma.capacidadeMax,
                turma.nivelEnsino,
                turma.id
            )
    
            return r.affectedRows;
        }

}

module.exports = TurmaDAO
