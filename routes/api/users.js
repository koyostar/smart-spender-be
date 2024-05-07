const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

////////////////////////
//        LOGIN
////////////////////////

// POST /api/users
router.post('/', usersCtrl.create);
// POST /api/users/login
router.post('/login', usersCtrl.login);

router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken)

////////////////////////
//     FUNCTIONAL
////////////////////////

router.post('/friends/add/:selecteduser', usersCtrl.friendsAdd)
router.post('/friends/remove/:selecteduser', usersCtrl.friendsRemove)
router.get('/friends', usersCtrl.friendsFindAll)

router.get('/find/:username', usersCtrl.findByUsername)
router.get('/find/id/:id', usersCtrl.findById)
router.get('/find', usersCtrl.findAll);

module.exports = router;