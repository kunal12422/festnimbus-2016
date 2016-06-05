var express = require('express');
var controller = require('./bhram.controller.js');
var auth = require('../../auth/auth.service');



var router = express.Router();

router.get('/', auth.isAuthenticated(),controller.leader_board);
router.get('/:level',auth.isAuthenticated(), controller.get_questions);
router.post('/', controller.save_questions);
router.post('/:level/:index/:answer',auth.isAuthenticated(), controller.update_bhram_user_data);



module.exports = router;
