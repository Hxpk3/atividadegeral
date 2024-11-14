const TurmaDisciplina = require('../model/TurmaDisciplinaModel')
const path = require('path')


module.exports = (app) => {


    // Todos os gets
    app.get("/turmaDisciplina", async (req, res) => {        
        const td = new TurmaDisciplina()
        
        res.setHeader("Access-Control-Allow-Origin","*")
        res.json(await td.consultarTodos())        
    })

   
    // Todos os post
    app.post('/registertd', async (req, res) => {


        console.log(req.body)
        const td = new TurmaDisciplina();
        const { 
            turma: turma,
            disciplina: disciplina } = req.body;

        res.setHeader("Access-Control-Allow-Origin","*")
 
        let status;

        status = await td.registrarTurmaDisciplina(turma, disciplina)
        res.json({isAuth: status})
        

       
        // res.redirect("/missao")

    })


    // Delete
    app.delete("/turmaDisciplina/:id", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const td = new TurmaDisciplina()

        const status = await td.del(req.params.id)

        res.json({
            status
        })
    })


    // Update
    app.put("/turmaDisciplina/:id", async (req, res) =>{
        const td = new TurmaDisciplina()
        
        const {
            turma,
            disciplinaA,
            disciplinaN
        } = req.body;

        const {id} = req.params;

        console.log({turma, disciplinaA, disciplinaN})

        if (!disciplinaA || !disciplinaN || !turma) {
            return res.status(400).json({ msg: "Faltando parâmetros necessários (disciplinaA, disciplinaN ou turma)" });
        }
      
        try {
            const r = await td.att(turma, disciplinaA, disciplinaN);
            
            // Se a atualização for bem-sucedida
            if (r > 0) {
                return res.json({ msg: "O total de linhas alteradas: " + r });
            } else {
                return res.status(404).json({ msg: "Nenhuma linha foi alterada. Verifique os dados." });
            }
        } catch (err) {
            // Caso ocorra algum erro
            console.error('Erro ao atualizar:', err);
            return res.status(500).json({ msg: "Erro ao atualizar a turma e disciplina." });
        }         
    })
     
}