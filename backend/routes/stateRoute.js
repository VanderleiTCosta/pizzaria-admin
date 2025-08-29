import express from 'express';
import { addState, listStates, removeState } from '../controllers/stateController.js';

const stateRouter = express.Router();

stateRouter.post('/add', addState);
stateRouter.get('/list', listStates);
stateRouter.post('/remove', removeState);

export default stateRouter;