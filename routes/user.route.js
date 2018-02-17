import express from 'express';
import * as userController from '../controllers/User.controller';

const router = express.Router();

router.route('/showusers')
  .get(userController.showUsers);

router.route('/authenticate')
  .post(userController.authenticateUser);

router.route('/signup')
  .post(userController.signupUser);

router.route('/test')
  .get(userController.test);

export default router;
