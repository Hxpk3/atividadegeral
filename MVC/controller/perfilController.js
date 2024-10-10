const Perfil = require('../model/perfilModel')

module.exports = (app) => {

    app.get("/perfil/:id", async (req, res) => {        
        const perfil = new Perfil()
        const status = await perfil.consultarUm(req.params.id) 
        
        res.json({
            status
        })
    })

    app.get("/status", async (req, res) =>{
        res.json({status:true})
    })
}