const Professor = require('../model/professorModel')

module.exports = (app) => {


    app.get("/status", async (req, res) =>{
        res.json({status:true})
    })

    app.post('/registrarprofessor', async (req, res) => {
            
    
        //    console.log(req.body.txtskins)
            const professor = new Professor();
            const { 
                id_user: id_user,
                id_group: id_group,
            } = req.body;

            res.setHeader("Access-Control-Allow-Origin","*")
    
            let status = await professor.registrarprofessor(id_user, id_group)
            
            res.json({isAuth: status})
    })

}