const Turma = require('../model/turmaModel')

module.exports = (app) => {

    app.get("/turma", async (req, res) => {        
        const turma = new Turma()
        
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await turma.consultarTodos())        
    })
    
    app.get("/turma/:id", async (req, res) => {        
        const turma = new Turma()
        const status = await turma.consultarUm(req.params.id) 
        
        res.json(
            [{...status}]
        )
    })

    app.get("/status", async (req, res) =>{
        res.json({status:true})
    })


    app.post('/registerturma', async (req, res) => {


        console.log(req.body)
        const turma = new Turma();
        const { 
            id: id,
            anoEscolar: anoEscolar, 
            dtInicio: dtInicio,
            dtFinal: dtFinal,
            capacidadeMax: capacidadeMax,  
            nivelEnsino: nivelEnsino  } = req.body;

        res.setHeader("Access-Control-Allow-Origin","*")
 
        let status;

        if(!id){
            status = await turma.registerTurma(anoEscolar, dtInicio, dtFinal, capacidadeMax, nivelEnsino)
        }

    })

    app.delete("/turma/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const turma = new Turma()

        const status = await turma.del(req.params.id)

        res.json({
            status
        })
    })


    // Update
    app.put("/turma/:id", async (req, res) =>{
        const turma = new Turma()
        
        const {
            anoEscolar,
            dtInicio,
            dtFinal,
            capacidadeMax,
            nivelEnsino,
            id
        } = req.body;

        console.log({anoEscolar, dtInicio, dtFinal, capacidadeMax, nivelEnsino, id})
      
        if(id == req.params.id){
          const r =  await turma.att(anoEscolar, dtInicio, dtFinal, capacidadeMax, nivelEnsino, id)
          res.json({msg: "O total de linhas alteradas: "+r})
        }
        else{
          res.json({msg:"Problema."})
        }         
    })
}