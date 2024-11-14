import mysql from 'mysql2';
import express from 'express';


const dbConfig = {
  host: '10.111.4.30',
  user: 'backend',
  password: 'B4ckUs$r2024',
  database: 'controleescolar',
  port: 3306
};


const pool = mysql.createPool(dbConfig);

export class UsuarioController {
  criarUsuario(req, res) {
    const { nome, cpf, rg, email, nascimento, senha, genero, logradouro, perfil } = req.body;

    if (!nome || !cpf || !email || !senha) {
      return res.status(400).json({ success: false, message: 'Dados obrigatórios não fornecidos' });
    }

    const sql = 'INSERT INTO cadastro_user (nome_cadastro, cpf_cadastro, rg_cadastro, email_cadastro, dt_nascimento_cadastro, senha_cadastro, genero_cadastro, endereco_cadastro) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [nome, cpf, rg, email, nascimento, senha, genero, logradouro, perfil];

    pool.query(sql, params, (error, results) => {
      if (error) {
        console.error('Erro ao inserir usuário:', error);
        return res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário' });
      }

      const grupoId = perfil === 'professor' ? 2 : perfil === 'aluno' ? 3 : null;
      if (grupoId) {
        const grupoSql = 'INSERT INTO usuario_grupo (id_usuario, id_grupo) VALUES (?, ?)';
        pool.query(grupoSql, [results.insertId, grupoId], (err) => {
          if (err) {
            console.error('Erro ao inserir na tabela usuario_grupo:', err);
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar usuário no grupo' });
          }
          return res.status(201).json({ success: true, message: 'Usuário criado com sucesso', userId: results.insertId });
        });
      } else {
        return res.status(201).json({ success: true, message: 'Usuário criado com sucesso', userId: results.insertId });
      }
    });
  }
}


//vai se fuder luiz