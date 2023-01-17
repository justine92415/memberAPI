const express = require('express');
const tourController = require('../controllers/memberController');
const router = express.Router();
const multer = require('multer');
const upload = multer();

router
    .route('/')
    .get(tourController.getAllMembers)
    .post(upload.fields([]), tourController.createMember);

router
    .route('/:id')
    .get(tourController.getMember)
    .patch(tourController.updateMember)
    .delete(tourController.deleteMember);

module.exports = router;
