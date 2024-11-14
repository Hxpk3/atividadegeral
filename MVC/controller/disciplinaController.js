

import mysql from 'mysql2/promise';


const dbConfig = {
  host: '10.111.4.30',
  user: 'backend',
  password: 'B4ckUs$r2024',
  database: 'controleescolar'
};

class DisciplinaController {
  async cadastrarDisciplina(req, res) {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ success: false, message: 'Nome da disciplina é obrigatório' });
    }

    let connection;
    try {
      connection = await mysql.createConnection(dbConfig);

      const [result] = await connection.execute(
        'INSERT INTO disciplinas (nome_disciplina) VALUES (?)',
        [nome]
      );

      if (result.affectedRows === 1) {
        return res.status(201).json({ success: true, message: 'Disciplina cadastrada com sucesso' });
      } else {
        return res.status(500).json({ success: false, message: 'Erro ao cadastrar disciplina' });
      }
    } catch (error) {
      console.error('Erro ao cadastrar disciplina:', error);
      return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }
}

export default new DisciplinaController();