import { Validator } from '../js/validacoes.js';

export class User {
  constructor(cpf, rg, email, senha) {
    this.cpf = cpf;
    this.rg = rg;
    this.email = email;
    this.senha = senha;
  }

  validaUsuario() {
    const validator = new Validator();
    if (!validator.validaCPF(this.cpf)) {
      return false;
    }
    if (!validator.validaRG(this.rg)) {
      return false;
    }
    if (!validator.validaEmail(this.email)) {
      return false;
    }
    if (!validator.validaSenha(this.senha)) {
      return false;
    }
    return true;
  }
}