const express = require("express")
const router = express.Router();
const wordsController = require('../Controllers/wordsController');

router.get("/words", wordsController.getWords)

module.exports = router;