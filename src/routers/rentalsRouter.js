import { Router } from 'express';

import { addRental,getRentals,endRental,deleteRental } from './../controllers/rentalsController.js';

import { validateNewRental,validateQueryRental,validateIdRental } from './../middlewares/rentalsMiddleware.js';

const rentalsRouter = Router();

rentalsRouter.post('/rentals' , validateNewRental, addRental);
rentalsRouter.get('/rentals' , validateQueryRental, getRentals);
rentalsRouter.post('/rentals/:id/return' , validateIdRental, endRental);
rentalsRouter.delete('/rentals/:id' , validateIdRental, deleteRental);

export default rentalsRouter;