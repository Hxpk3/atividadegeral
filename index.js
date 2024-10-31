import express from 'express';
import path from 'path';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { UsuarioController } from './src/controllers/usuarioController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos da pasta 'src/public'
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Servir o arquivo user.js da pasta 'src/models'
app.use('/models', express.static(path.join(__dirname, 'src', 'models')));

// Rota GET para a página de cadastro
app.get('/cadastrar', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'cadastrar.html'));
});

// Rota POST para processar o cadastro
app.post('/cadastrar', async (req, res) => {
  const usuarioController = new UsuarioController();
  const perfil = req.body.perfil;

  try {
    let result;
    switch (perfil) {
      case 'professor':
        result = await usuarioController.criarProfessor(req.body);
        break;
      case 'admin':
        result = await usuarioController.criarAdmin(req.body);
        break;
      case 'aluno':
        result = await usuarioController.criarAluno(req.body);
        break;
      default:
        return res.status(400).json({ error: 'Perfil inválido' });
    }

    res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso', data: result });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ success: false, error: 'Erro ao cadastrar usuário', details: error.message });
  }
});

// Rota GET para a página de login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Rota GET para a página de cadastro de disciplina
app.get('/cadastrar-disciplina', (req, res) => {
  res.sendFile(join(__dirname, 'views', 'cadastrar-disciplina.html'));
});

// Rota para processar o cadastro de disciplina
app.post('/cadastrar-disciplina', (req, res) => {
  // Lógica para processar o cadastro de disciplina
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});