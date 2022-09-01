const express = require("express");
const router = express.Router();
const rankRouter = require("../Controllers/rankController");

router.post("/rank", rankRouter.getRank);
module.exports = router;
