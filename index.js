const express = require('express');
const mysql = require('mysql');
const path = require('path');
const UsuarioController = require('./src/controllers/usuarioController');

const app = express();
const usuarioController = new UsuarioController();
const staticPath = path.join(__dirname, 'src', 'public', 'js');
console.log('Caminho para arquivos estáticos:', staticPath);


app.use(express.json());
app.use('/cadastrar', express.static(__dirname, { extensions: ['js'] }));
app.use(express.static(staticPath));



app.get('/cadastrar', (req, res) => {
  res.sendFile(path.join(__dirname,  'views', 'cadastrar.html'));
});

app.post('/cadastrar', (req, res) => {
  const usuario = req.body;
  const perfil = usuario.perfil;

  if (perfil === 'professor') {
    usuarioController.criarProfessor(req, res);
  } else if (perfil === 'admin') {
    usuarioController.criarAdmin(req, res);
  } else if (perfil === 'aluno') {
    usuarioController.criarAluno(req, res);
  } else {
    res.status(400).json({ message: 'Perfil inválido' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});