const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { NotFoundError } = require('../utils/errors');
const { createUser, login } = require('../controllers/users');
const { validateDataForCreateUser, validateDataforAuthorize } = require('../middlewares/validationRequest');
const auth = require('../middlewares/auth');

router.post('/signup', validateDataForCreateUser, createUser);
router.post('/signin', validateDataforAuthorize, login);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('page is not found'));
});

module.exports = router;
