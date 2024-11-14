import { db } from '../database/database.js';
import { validationResult } from 'express-validator';

class LoginController {
  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Erro de validação', details: errors.array() });
    }

    const { email, senha } = req.body;

    try {
      const [user] = await db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha]);

      if (user.length === 0) {
        return res.status(401).json({ success: false, message: 'Email ou senha incorretos' });
      }

      
      return res.status(200).json({ success: true, message: 'Login realizado com sucesso!', user });
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      return res.status(500).json({ success: false, message: 'Erro interno do servidor', detalhes: error.message });
    }
  }
}

export default LoginController;