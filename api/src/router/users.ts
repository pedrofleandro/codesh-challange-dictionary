import express from 'express';

import {addFavorite, deleteUser, getAllUsers, getFavorites, getHistoryUser, getUserProfile, removeFavorite, updateUser} from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares'; 

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.delete('/user/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/user/:id', isAuthenticated, isOwner, updateUser);
  router.get('/user/me/', isAuthenticated, getUserProfile);
  router.get('/user/me/history', isAuthenticated, getHistoryUser);
  router.get('/user/me/favorites', isAuthenticated, getFavorites);
  router.post('/entries/en/:word/favorite', isAuthenticated, addFavorite);
  router.delete('/entries/en/:word/unfavorite', isAuthenticated, removeFavorite);
};