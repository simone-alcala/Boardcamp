import { Router } from 'express';

import { addCategory, getCategories } from './../controllers/categoriesController.js';

import { validateNewCategory } from './../middlewares/categoriesMiddleware.js';

const categoriesRouter = Router();

categoriesRouter.post('/categories' , validateNewCategory, addCategory);
categoriesRouter.get('/categories', getCategories);

export default categoriesRouter;