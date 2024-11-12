const Perfil = require('../model/perfilModel')

module.exports = (app) => {

    app.get("/profile", async (req, res) => {        
        const perfil = new Perfil()
        
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await perfil.consultarTodos())        
    })
    
    app.get("/perfil/:id", async (req, res) => {        
        const perfil = new Perfil()
        const status = await perfil.consultarUm(req.params.id) 
        
        res.json(
            [{...status}]
        )
    })

    app.get("/status", async (req, res) =>{
        res.json({status:true})
    })


    app.post('/registerprofile', async (req, res) => {


        console.log(req.body)
        const perfil = new Perfil();
        const { 
            id: id,
            nome: nome, 
            rg: rg,
            cpf: cpf,
            email: email,  
            senha: senha, 
            genero: genero, 
            dt_nascimento: dt_nascimento,  
            endereco: endereco  } = req.body;

        res.setHeader("Access-Control-Allow-Origin","*")
 
        let status;

        if(!id){
            status = await perfil.registerProfile(nome, rg, cpf, email, senha, genero, dt_nascimento, endereco)
        }

       
        res.redirect("/missao")

    })
}