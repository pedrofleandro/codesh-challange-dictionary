import express from "express";

import authentication from './authentication';
import users from './users';
import words from './words';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);
  words(router);

  return router
};