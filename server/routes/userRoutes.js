const express = require("express");

const router = express.Router();


const authMiddleware =
require("../middleware/authMiddleware");


const {
signup,
login,
registerEvent
}=require("../controllers/userController");



router.post(
"/signup",
signup
);



router.post(
"/login",
login
);



// USER EVENT REGISTRATION

router.post(
"/register-event",
authMiddleware,
registerEvent
);



module.exports = router;