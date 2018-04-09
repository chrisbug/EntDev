//All routes that need authentication needs to be placed in here.

import express from 'express';
import * as authController from '../controllers/auth.controller';
import * as userController from '../controllers/User.controller';

const router = express.Router()

router.use(authController.apiRoute);

router.route('/testy')
  .get(authController.Testy)

router.route('/getuser')
  .get(userController.getUser);

router.route('/buystock')
  .post(userController.buyStock);

router.route('/sellstock')
  .post(userController.sellStock);

export default router;
