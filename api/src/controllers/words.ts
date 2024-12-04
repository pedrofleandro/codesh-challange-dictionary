import { Request, Response } from 'express';
import Word from '../db/words';
import { 
    addToHistory, 
    getUserById, 
    type UserModel
  } from '../db/users';
import WordCache from '../db/wordsCache'; 
import axios from 'axios';

interface AuthenticatedRequest extends Request {
    identity?: typeof UserModel.prototype;
}

const escapeRegex = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const getWords = async (req: Request, res: Response) => {
    try {
        const search = req.query.search as string || ''; // Filtro opcional
        const limit = parseInt(req.query.limit as string, 10) || 10; // Número de itens por página
        const page = parseInt(req.query.page as string, 10) || 1; // Página atual

        const sanitizedSearch = escapeRegex(search);

        // Filtro baseado na busca
        const query = sanitizedSearch
            ? { term: { $regex: new RegExp(`^${search}`, 'i') } }
            : {};

        // Paginação e consulta
        const totalDocs = await Word.countDocuments(query);
        const words = await Word.find(query)
            .sort({ term: 1 }) // Ordena alfabeticamente
            .skip((page - 1) * limit) // Ignora os itens das páginas anteriores
            .limit(limit); // Limita ao número especificado

        // Resposta no formato desejado
        const totalPages = Math.ceil(totalDocs / limit);
        res.json({
            results: words.map((word) => word.term), // Apenas os termos
            totalDocs,
            page,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar palavras.' });
    }
};

export const getWordDetails = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { word } = req.params;
      const user = req.identity[0];

      if (!user) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
      }
  
      // Verifica se a palavra está no cache
      const cachedWord = await WordCache.findOne({ term: word });
      if (cachedWord) {
        // Salva no histórico do usuário
        await addToHistory(user._id, word);
        return res.json(cachedWord.data);
      }
  
      // Consulta a API externa
      const apiResponse = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  
      // Salva a resposta no cache
      await WordCache.create({ term: word, data: apiResponse.data });
  
      // Salva no histórico do usuário
      await addToHistory(user._id, word);
  
      return res.json(apiResponse.data);
    } catch (error) {
      console.error('Erro ao buscar palavra:', error.message);
      if (error.response && error.response.status === 404) {
        return res.status(404).json({ message: 'Palavra não encontrada.' });
      }
      return res.status(500).json({ message: 'Erro ao processar requisição.' });
    }
  };
  