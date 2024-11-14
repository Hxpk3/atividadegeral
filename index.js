// index.js
import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { UsuarioController } from './MVC/controller/usuarioController.js'; 
import { createPool } from './MVC/database/__database.js'; 
const app = express();
const usuarioController = new UsuarioController();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'MVC', 'public')));


app.get('/cadastrar', (req, res) => {
  res.sendFile(path.join(__dirname, 'MVC', 'public', 'views', 'cadastrar.html'));
});

app.post('/cadastrar', async (req, res) => {
  console.log('Corpo da requisição recebido:', req.body);
  try {
    const resultado = await usuarioController.criarUsuario(req, res);
    return resultado;
  } catch (error) {
    console.error('Erro no cadastro:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      detalhes: error.message
    });
  }
});


app.get('/status', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'API está funcionando corretamente'
  });
});


app.get('/usuarios', async (req, res) => {
  const db = await createPool();
  try {
    const [usuarios] = await db.query('SELECT * FROM usuarios');
    return res.status(200).json({
      success: true,
      usuarios
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar usuários',
      detalhes: error.message
    });
  } finally {
    await db.end();
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
