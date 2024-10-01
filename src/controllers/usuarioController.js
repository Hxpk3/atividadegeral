const express = require('express');
const mysql = require('mysql');

class UsuarioController {
  constructor() {
    this.app = express();
    this.mysql = mysql;
  }

  criarProfessor(req, res) {
    const usuario = req.body;
    const connection = this.mysql.createConnection({
      host: '10.111.4.30',
      user: 'backend',
      password: 'B4ckUs$r2024',
      database: 'controleescolar'
    });
    connection.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
      }
      console.log('Conectado ao banco de dados!');
      const sql = 'INSERT INTO cadastro_user (nome_cadastro, cpf_cadastro, rg_cadastro, email_cadastro, dt_nascimento_cadastro, senha_cadastro, genero_cadastro, endereco_cadastro, perfil_cadastro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(sql, [usuario.nome, usuario.cpf, usuario.rg, usuario.email, usuario.nascimento, usuario.senha, usuario.genero, usuario.logradouro, 'professor'], (err, result) => {
        if (err) {
          console.error('Erro ao inserir usuário:', err.message, err.stack);
          res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err.message });
          return;
        }
        res.json({ message: 'Usuário cadastrado com sucesso' });
      });
    });
  }

  criarAdmin(req, res) {
    const usuario = req.body;
    const connection = this.mysql.createConnection({
      host: '10.111.4.30',
      user: 'backend',
      password: 'B4ckUs$r2024',
      database: 'controleescolar'
    });
    connection.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
      }
      console.log('Conectado ao banco de dados!');
      const sql = 'INSERT INTO cadastro_user (nome_cadastro, cpf_cadastro, rg_cadastro, email_cadastro, dt_nascimento_cadastro, senha_cadastro, genero_cadastro, endereco_cadastro, perfil_cadastro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(sql, [usuario.nome, usuario.cpf, usuario.rg, usuario.email, usuario.nascimento, usuario.senha, usuario.genero, usuario.logradouro, 'admin'], (err, result) => {
        if (err) {
          console.error('Erro ao inserir usuário:', err.message, err.stack);
          res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err.message });
          return;
        }
        res.json({ message: 'Usuário cadastrado com sucesso' });
      });
    });
  }

  criarAluno(req, res) {
    const usuario = req.body;
    const connection = this.mysql.createConnection({
      host: '10.111.4.30',
      user: 'backend',
      password: 'B4ckUs$r2024',
      database: 'controleescolar'
    });
    connection.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
      }
      console.log('Conectado ao banco de dados!');
      const sql = 'INSERT INTO cadastro_user (nome_cadastro, cpf_cadastro, rg_cadastro, email_cadastro, dt_nascimento_cadastro, senha_cadastro, genero_cadastro) VALUES (?, ?, ?, ?, ?, ?, ?)';
      connection.query(sql, [usuario.nome, usuario.cpf, usuario.rg, usuario.email, usuario.nascimento, usuario.senha, usuario.genero, usuario.logradouro, 'aluno'], (err, result) => {
        if (err) {
          console.error('Erro ao inserir usuário:', err.message, err.stack);
          res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err.message });
          return;
        }
        res.json({ message: 'Usuário cadastrado com sucesso' });
      });
    });
  }
}

module.exports = UsuarioController;