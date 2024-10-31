import mysql from 'mysql2/promise';

export class UsuarioController {
  constructor() {
    this.dbConfig = {
      host: '10.111.4.30',
      user: 'backend',
      password: 'B4ckUs$r2024',
      database: 'controleescolar'
    };
  }

  criarConexao() {
    return mysql.createConnection(this.dbConfig);
  }

  async autenticarUsuario(email, senha) {
    const connection = await this.criarConexao();
    try {
      // Consulta SQL para verificar o usuário
      const sql = 'SELECT * FROM cadastro_user WHERE email_cadastro = ? AND senha_cadastro = ?';
      const [rows] = await connection.execute(sql, [email, senha]);

      if (rows.length > 0) {
        // Retorna o usuário encontrado, incluindo o perfil
        return {
          id: rows[0].id_cadastro,
          nome: rows[0].nome_cadastro,
          email: rows[0].email_cadastro,
          perfil: rows[0].perfil 
        };
      } else {
        // Usuário não encontrado
        return null;
      }
    } catch (err) {
      console.error('Erro ao autenticar usuário:', err);
      throw err; // Lança o erro para ser tratado no controlador
    } finally {
      await connection.end(); // Fecha a conexão com o banco de dados
    }
  }
  criarUsuario(usuario, perfil, res) {
    const connection = this.criarConexao();
    connection.connect((err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        res.status(500).json({ message: 'Erro ao conectar ao banco de dados' });
        return;
      }
      console.log('Conectado ao banco de dados!');
      const sql = 'INSERT INTO cadastro_user (nome_cadastro, cpf_cadastro, rg_cadastro, email_cadastro, dt_nascimento_cadastro, senha_cadastro, genero_cadastro) VALUES (?, ?, ?, ?, ?, ?, ?)';
      connection.query(sql, [usuario.nome, usuario.cpf, usuario.rg, usuario.email, usuario.nascimento, usuario.senha, usuario.genero], (err, result) => {
        if (err) {
          console.error('Erro ao inserir usuário:', err);
          res.status(500).json({ message: 'Erro ao cadastrar usuário' });
        } else {
          // Obter o ID do usuário recém-inserido
          const idUsuario = result.insertId;
          // Determinar o ID do grupo baseado no perfil
          let idGrupo;
          switch (perfil) {
            case 'professor':
              idGrupo = 2; // ID do grupo 'Professor(a)'
              break;
            case 'aluno':
              idGrupo = 3; // ID do grupo 'Coordenador(a)' (ou outro ID apropriado para alunos)
              break;
            case 'admin':
              idGrupo = 1; // ID do grupo 'Coordenador(a)' (ou outro ID apropriado para admin)
              break;
            default:
              res.status(400).json({ message: 'Perfil inválido' });
              connection.end();
              return;
          }

          // Inserir na tabela usuario_grupo
          const sqlGrupo = 'INSERT INTO usuario_grupo (id_usuario, id_grupo) VALUES (?, ?)';
          connection.query(sqlGrupo, [idUsuario, idGrupo], (err) => {
            if (err) {
              console.error('Erro ao associar usuário ao grupo:', err);
              res.status(500).json({ message: 'Erro ao associar usuário ao grupo' });
            } else {
              res.json({ message: 'Usuário cadastrado com sucesso' });
            }
            connection.end();
          });
        }
      });
    });
  }

  criarProfessor(req, res) {
    const usuario = req.body;
    this.criarUsuario(usuario, 'professor', res);
  }

  criarAdmin(req, res) {
    const usuario = req.body;
    this.criarUsuario(usuario, 'admin', res);
  }

  criarAluno(req, res) {
    const usuario = req.body;
    this.criarUsuario(usuario, 'aluno', res);
  }


}






