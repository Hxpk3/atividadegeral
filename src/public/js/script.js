import { Validator } from '/js/validacoes.js';
import { User } from '/models/user.js';

class Formulario {
  constructor() {
    this.form = document.querySelector('#form-cadastro');
    this.inputs = {
      nome: document.getElementById('nome'),
      cpf: document.getElementById('cpf'),
      rg: document.getElementById('rg'),
      email: document.getElementById('email'),
      nascimento: document.getElementById('nascimento'),
      senha: document.getElementById('senha'),
      genero: document.getElementById('genero'),
      logradouro: document.getElementById('logradouro'),
    };
    this.radios = {
      professor: document.getElementById('professor'),
      admin: document.getElementById('admin'),
      aluno: document.getElementById('aluno'),
    };
  }

  enviarFormulario() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      const usuario = {
        nome: this.inputs.nome.value.trim(),
        cpf: this.inputs.cpf.value.trim().replace(/[^0-9]/g, ''),
        rg: this.inputs.rg.value.trim().replace(/\D/g, ''),
        email: this.inputs.email.value.trim(),
        nascimento: this.inputs.nascimento.value.trim(),
        senha: this.inputs.senha.value.trim(),
        genero: this.inputs.genero.value,
        logradouro: this.inputs.logradouro.value.trim(),
        perfil: this.getPerfil(),
      };

      const user = new User(usuario.cpf, usuario.rg, usuario.email, usuario.senha);
      if (!user.validaUsuario()) {
        console.error('Dados inválidos');
        return;
      }

      this.enviarParaServidor(usuario);
    });
  }

  getPerfil() {
    if (this.radios.professor.checked) return 'professor';
    if (this.radios.admin.checked) return 'admin';
    if (this.radios.aluno.checked) return 'aluno';
    return null;
  }

  enviarParaServidor(usuario) {
    console.log('Dados a serem enviados:', usuario);
    fetch('http://localhost:3000/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Erro ao cadastrar usuário: ${response.status} ${response.statusText}\n${errorBody}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        alert(data.message);
        if (data.success && usuario.perfil === 'professor') {
          window.location.href = '/cadastro-disciplina.html';
        }
      })
      .catch((error) => {
        console.error('Detalhes do erro:', error);
        alert('Ocorreu um erro ao cadastrar o usuário: ' + error.message);
      });
  }
}
const formulario = new Formulario();
formulario.enviarFormulario();
    