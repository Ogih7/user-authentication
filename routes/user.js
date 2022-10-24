const express = require('express');
const router = express.Router();

const {login, register, deleteUser, getUsers, getUser} = require('../controllers/user')

router.post('/register', register);
router.post('/login', login);
router.delete('/delete/:id', deleteUser)
router.get('/users', getUsers)
router.get('/user/:id', getUser)

module.exports = router;