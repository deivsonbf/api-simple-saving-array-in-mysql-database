const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users-controllers')

// Rota GET
router.get('/', usersController.allUsers);

// Rota POST, inserindo 1 registro
router.post('/user', usersController.insertOneUser);

// Rota POST, inserindo multiplos registros v1
router.post('/users', usersController.insertMultipleUsersV1);

// Rota POST para ARRAYs v2 com MAP
router.post('/users/v2', usersController.insertMultipleUsersV2);

module.exports = router;