import express from 'express';
import { getWords, getWordDetails } from '../controllers/words';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) => {
  router.get('/entries/en', getWords);
  router.get("/entries/en/:word", isAuthenticated, getWordDetails);
};
