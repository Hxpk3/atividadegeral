
fetch('http://10.111.9.76:3000/perfil/2')
    .then(response => response.json())
    .then(usuarios => {
        if (usuarios.length > 0) {
            const id = usuarios[0].id; 
            preencherFormulario(usuarios[0])
        } else {
            throw new Error("Nenhum usuário encontrado.");
        }
    })
    .catch(error => console.error('Erro ao buscar dados:', error));

// Função para preencher o formulário com os dados do usuário
function preencherFormulario(data) {
    document.getElementById('nome').value = data.nome || '';
    document.getElementById('cpf').value = data.cpf || '';
    document.getElementById('nascimento').value = data.dt_nascimento || '';
    document.getElementById('email').value = data.email || '';
    document.getElementById('rg').value = data.rg || '';
    document.getElementById('genero').value = data.genero || '';
    document.getElementById('logradouro').value = data.endereco || '';
    document.getElementById('senha').value = data.senha || '';
    document.getElementById('perfil').checked = data.perfil || false; // Marca ou desmarca o checkbox
}