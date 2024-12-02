import express, { Request, Response } from 'express';

import { deleteUserById, getUserById, getUsers, getUserHistory, type UserModel, addToFavorites, removeFromFavorites, getUserFavorites } from '../db/users';

interface AuthenticatedRequest extends Request {
  identity?: typeof UserModel.prototype;
}

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch(error) {
    return res.sendStatus(400);
  }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try{
    const {id} = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  }catch(error){
    return res.sendStatus(400);
  }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const {id} = req.params;
    const {username} = req.body;

    if(!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    user.username = username;
    await user.save();

    return res.status(200).json(user).end();
  } catch(error) {
    return res.sendStatus(400);
  }
}

export const getHistoryUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Recupera o ID do usuário autenticado (assumindo que o middleware `isAuthenticated` adiciona `identity` ao req)
    const user = req.identity[0];
    if (!user) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    // Consulta o histórico do usuário pelo ID
    const history = await getUserHistory(user._id);
    if (!history) {
      return res.status(404).json({ message: 'Histórico não encontrado.' });
    }

    return res.json({
      history: history.history.map((entry) => ({
        term: entry.term,
        accessedAt: entry.accessedAt,
      })),
    });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error.message);
    return res.status(500).json({ message: 'Erro ao buscar histórico.' });
  }
};

export const addFavorite = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { word } = req.params;
    const user = req.identity[0]; // Supondo que você usa um middleware de autenticação para definir req.userId

    if (!user) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    // Adiciona a palavra às favoritas do usuário
    const updatedUser = await addToFavorites(user._id, word);

    // Responde com a lista atualizada de favoritas (opcional)
    res.status(200).json({ message: 'Palavra adicionada aos favoritos.', favorites: updatedUser.favorites });
  } catch (error) {
    console.error('Erro ao adicionar palavra aos favoritos:', error.message);
    res.status(500).json({ message: 'Erro ao processar a requisição.' });
  }
};

export const removeFavorite = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { word } = req.params;
    const user = req.identity[0];

    if (!user) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    const updatedUser = await removeFromFavorites(user._id, word);

    res.status(200).json({ message: 'Palavra removida dos favoritos.', favorites: updatedUser.favorites });
  } catch (error) {
    console.error('Erro ao remover palavra dos favoritos:', error.message);
    res.status(500).json({ message: 'Erro ao processar a requisição.' });
  }
};

export const getFavorites = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.identity[0];

    if (!user) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    // Busca as palavras favoritas do usuário
    const fUser = await getUserFavorites(user._id);

    if (!fUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Responde com a lista de palavras favoritas
    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    console.error('Erro ao buscar favoritos do usuário:', error.message);
    res.status(500).json({ message: 'Erro ao processar a requisição.' });
  }
};

export const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.identity[0];

    if (!user) {
      return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    const pUser = await getUserById(user._id);

    if (!pUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const userProfile = {
      username: user.username,
      email: user.email,
      history: user.history,
      favorites: user.favorites,
    };

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error.message);
    res.status(500).json({ message: 'Erro ao processar a requisição.' });
  }
};