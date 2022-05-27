import { Router } from 'express';

import { addCustomer, getCustomers, getCustomerById , updateCustomer} from './../controllers/customersController.js';

import { validateBody,validateId } from './../middlewares/customersMiddleware.js';

const customersRouter = Router();

customersRouter.post('/customers' , validateBody, addCustomer);
customersRouter.get('/customers', getCustomers);
customersRouter.get('/customers/:id', getCustomerById);
customersRouter.put('/customers/:id', validateId, validateBody, updateCustomer);

export default customersRouter;

