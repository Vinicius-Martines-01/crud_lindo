import express from 'express';
const router = express.Router();
import userController from '../controllers/UserController.js';

// Aqui usamos arrow functions para chamar os métodos assíncronos corretamente
router.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body;
    try {
      await userController.criar(nome, email);
      res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao criar usuário', detalhe: err.message });
    }
  });
  
  router.get('/usuarios', async (req, res) => {
    try {
      const usuarios = await userController.listarTodos();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar usuários', detalhe: err.message });
    }
  });
  
  // Atualizar usuário por email
  router.put('/usuarios/atualizar/:email', async (req, res) => {
    const { email } = req.params;
    const { nome } = req.body;
    try {
      await userController.atualizar(email, nome);
      res.json({ mensagem: 'Usuário atualizado com sucesso!' });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao atualizar usuário', detalhe: err.message });
    }
  });
  
  // Deletar usuário por email
  router.delete('/usuarios/deletar/:email', async (req, res) => {
    const { email } = req.params;
    try {
      await userController.deletar(email);
      res.json({ mensagem: 'Usuário deletado com sucesso!' });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar usuário', detalhe: err.message });
    }
  });
  
  // Pegar usuario por email
  router.get('/usuarios/buscar/:email', async (req, res) => {
    const { email } = req.params;

    try {
      const usuario = await userController.buscarPorEmail(email);
      console.log(usuario)
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ erro: 'Usuário não encontrado' });
      }
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar usuário', detalhe: err.message });
    }
  });

  export default router;
