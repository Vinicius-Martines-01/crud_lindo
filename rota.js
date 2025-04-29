// criar no BD

document.getElementById('btnCadastrar').addEventListener('click', async () => {
  const form = document.getElementById('formCadastro');
  const mensagem = document.getElementById('mensagem');

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email })
      });

      const data = await response.json();

      if (response.ok) {
        mensagem.textContent = data.mensagem;
        form.reset();
      } else {
        mensagem.textContent = `Erro: ${data.erro}`;
      }
    } catch (error) {
      mensagem.textContent = `Erro na requisição: ${error.message}`;
    }
  });

// atualizar o BD
document.getElementById('btnAtualizar').addEventListener('click', async () => {
  const form = document.getElementById('formCadastro');
  const mensagem = document.getElementById('mensagem');

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/atualizar/${email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email })
    });

    const data = await response.json();

    if (response.ok) {
      mensagem.textContent = data.mensagem;
      form.reset();
    } else {
      mensagem.textContent = `Erro: ${data.erro}`;
    }
  } catch (error) {
    mensagem.textContent = `Erro na requisição: ${error.message}`;
  }
});


// deleta do BD
document.getElementById('btnApagar').addEventListener('click', async () => {
  const form = document.getElementById('formCadastro');
  const mensagem = document.getElementById('mensagem');

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/deletar/${email}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email })
    });

    const data = await response.json();

    if (response.ok) {
      mensagem.textContent = data.mensagem;
      form.reset();
    } else {
      mensagem.textContent = `Erro: ${data.erro}`;
    }
  } catch (error) {
    mensagem.textContent = `Erro na requisição: ${error.message}`;
  }
});



// buscar do BD pelo Email
document.getElementById('btnBuscar').addEventListener('click', async () => {
  const form = document.getElementById('formCadastro');
  const mensagem = document.getElementById('mensagem');

  const email = document.getElementById('email').value;

  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/buscar/${email}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    if (response.ok) {
      mensagem.textContent = `Usuário encontrado: nome=${data.nome}, email='${data.email}', id='${data.id}'`;

      // devolve o nome e o email
      document.getElementById('email').value = data.email;
      document.getElementById('nome').value = data.nome;
    } else {
      mensagem.textContent = `Erro: ${data.erro}`;
    }
  } catch (error) {
    mensagem.textContent = `Erro na requisição: ${error.message}`;
  }
});
