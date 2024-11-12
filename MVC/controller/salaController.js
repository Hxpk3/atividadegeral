const Sala = require('../model/salaModel.js')

module.exports = (app) => {

    app.get("/salas", async (req, res) => {        
        const sala = new Sala()
        
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await sala.consultarTodos())        
    })
    
    app.get("/salas/:id", async (req, res) => {        
        const sala = new Sala()
        const status = await sala.consultarUm(req.params.id) 
        
        res.json(
            [{...status}]
        )
    })

    app.get("/status", async (req, res) =>{
        res.json({status:true})
    })
    
}