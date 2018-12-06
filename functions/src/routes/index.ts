const express = require('express');
const router = express.Router();

import authenticate from './auth-middleware';
import usuariosRouter from './usuarios';

router.use(authenticate);
router.use('/usuarios', usuariosRouter);

export default router;
