import express from "express";

import  { getAllUsers, createUser, getUserById, loginUser} from "../controllers/user.controller.js";

const router = express.Router();

// Registration routes
router.route('/register').post(createUser);

// Login route
router.route('/login').post(loginUser);

// Other routes (if needed)
router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);

export default router;
