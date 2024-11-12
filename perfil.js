document.getElementById('fetch-profile').addEventListener('click', () => {
    const url = 'http://10.111.9.76:3000/profile';

    // Fazendo uma requisição GET
    fetch(url)
        .then(response => {
            // Verifica se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            // Converte a resposta para JSON
            return response.json();
        })
        .then(data => {
            // Preenche os campos do formulário com os dados recebidos
            document.getElementById('nome').value = data.name || '';
            document.getElementById('cpf').value = data.cpf || '';
            document.getElementById('nascimento').value = data.nascimento || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('rg').value = data.rg || '';
            document.getElementById('genero').value = data.genero || '';
            document.getElementById('logradouro').value = data.logradouro || '';
            document.getElementById('senha').value = data.senha || '';
            document.getElementById('perfil').checked = data.perfil || false; // Marca ou desmarca o checkbox
        })
        .catch(error => {
            // Captura e trata erros
            console.error('Houve um problema com a requisição:', error);
        });
});