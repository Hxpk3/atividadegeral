const LoginDAO = require('../model/loginModel')
const path = require('path')


module.exports = (app) => {


    // Todos os gets
    app.get("/", async (req, res) => {        
        const loginDAO = new LoginDAO()
        
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await loginDAO.consultar())        
    })
    app.get("/login", async (req, res) => {
        
        res.sendFile(__dirname+"...")

    })


    // Todos os post
    app.post('/logar', async (req, res) => {
        console.log(req)
        

            console.log(req.body)
            const { 
            email: email, 
            senha: senha } = req.body;
                
            let permitido = await new LoginDAO().logar(email, senha);

             
       
            res.json({isAuth: permitido})   
           
    })
     
}