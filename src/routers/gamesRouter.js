import { Router } from 'express';

import { addGame, getGames } from './../controllers/gamesController.js';

import { validateNewGame } from './../middlewares/gamesMiddleware.js';

const gamesRouter = Router();

gamesRouter.post('/games' , validateNewGame, addGame);
gamesRouter.get('/games', getGames);

export default gamesRouter;