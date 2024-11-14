class Formulario {
  constructor() {
    // Inicialização do formulário e inputs
    this.form = document.getElementById('form-cadastro');
    if (!this.form) {
      console.error('Formulário não encontrado');
      return;
    }

    // Atribuição dos elementos do formulário
    this.inputs = {
      nome: this.safeGetElement('nome'),
      cpf: this.safeGetElement('cpf'),
      rg: this.safeGetElement('rg'),
      email: this.safeGetElement('email'),
      nascimento: this.safeGetElement('nascimento'),
      senha: this.safeGetElement('senha'),
      genero: this.safeGetElement('genero'),
      logradouro: this.safeGetElement('logradouro')
    };

    this.radios = {
      professor: this.safeGetElement('professor'),
      admin: this.safeGetElement('admin'),
      aluno: this.safeGetElement('aluno')
    };
  }

  // Função de segurança para buscar elementos
  safeGetElement(id) {
    const element = document.getElementById(id);
    if (!element) {
      console.error(`Elemento com ID ${id} não encontrado`);
    }
    return element;
  }

  // Validação do CPF
  validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;

    return resto === parseInt(cpf.charAt(10));
  }

  // Validação de e-mail
  validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Coleta os dados do formulário e faz a validação
  coletarDadosFormulario() {
    const dados = {
      nome: this.inputs.nome.value.trim(),
      cpf: this.inputs.cpf.value.trim().replace(/[^\d]/g, ''),
      rg: this.inputs.rg.value.trim().replace(/[^\d]/g, ''),
      email: this.inputs.email.value.trim(),
      nascimento: this.inputs.nascimento.value,
      senha: this.inputs.senha.value,
      genero: this.inputs.genero.value,
      logradouro: this.inputs.logradouro.value.trim(),
      perfil: this.getPerfil()
    };

    // Validações adicionais
    const erros = [];

    if (!this.validarCPF(dados.cpf)) {
      erros.push('CPF inválido');
    }

    if (!this.validarEmail(dados.email)) {
      erros.push('Email inválido');
    }

    if (dados.senha.length < 6) {
      erros.push('Senha deve ter no mínimo 6 caracteres');
    }

    if (erros.length > 0) {
      throw new Error(erros.join(', '));
    }

    return dados;
  }

  // Enviar os dados para o servidor
  enviarParaServidor() {
    try {
      const dados = this.coletarDadosFormulario();
      
      fetch('/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Erro no servidor');
          });
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          alert('Cadastro realizado com sucesso!');
          this.form.reset();
          // Opcional: redirecionar após cadastro
          window.location.href = '/home';
        } else {
          throw new Error(data.message || 'Erro desconhecido');
        }
      })
      .catch(error => {
        console.error('Erro no cadastro:', error);
        alert(`Erro no cadastro: ${error.message}`);
      });
    } catch (error) {
      alert(error.message);
    }
  }

  // Adiciona o evento de envio do formulário
  enviarFormulario() {
    if (this.form) {
      this.form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.enviarParaServidor();
      });
    } else {
      console.error('Formulário não encontrado para adicionar evento');
    }
  }

  // Função para obter o perfil selecionado (radio buttons)
  getPerfil() {
    if (this.radios.professor.checked) {
      return 'professor';
    } else if (this.radios.admin.checked) {
      return 'admin';
    } else if (this.radios.aluno.checked) {
      return 'aluno';
    }
    return '';
  }
}

// Inicializa o formulário quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
  const formulario = new Formulario();
  formulario.enviarFormulario(); // Inicia o envio do formulário
});
