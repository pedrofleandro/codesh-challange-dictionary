import express from 'express';

import {login, logout, register, validateToken} from '../controllers/authentication';

export default (router: express.Router) => {
  router.post('/auth/signup', register);
  router.post('/auth/signin', login);
  router.post('/auth/validate', validateToken); 
  router.post('/auth/logout', logout);
}