// src/public/js/api.js
export class API {
    static async cadastrarDisciplina(nomeDisciplina) {
      try {
        const response = await fetch('http://localhost:5000/cadastrar-disciplina', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: nomeDisciplina }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Erro ao cadastrar disciplina:', error);
        throw error;
      }
    }
  }