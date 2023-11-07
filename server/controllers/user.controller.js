import bcrypt from "bcrypt";
import User from "../mongodb/models/users.js";

const getAllUsers = async (req, res) => {};

const createUser = async (req, res) => {
    try {
      const { name, email, login, password } = req.body;
  
      const userExistsEmail = await User.findOne({ email });
      const userExistsLogin = await User.findOne({ login });
      if (userExistsEmail || userExistsLogin) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = new User({ name, email, login, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };


  const loginUser = async (req, res) => {
    try {
      const { login, password } = req.body;
  
      const user = await User.findOne({ login });
      console.log("User found:", user);
  
      if (!user) {
        res.status(401).json({ message: "Invalid credentials User" });
        return; // Return to avoid sending multiple responses
      }
  
      console.log("Entered password:", password);
      console.log("Stored hashed password:", user.password);
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", passwordMatch);  
  
      if (passwordMatch==true) {
        res.status(200).json({ message: "Login successful" });
        console.log("Login successful"); 
      }else{
        res.status(401).json({ message: "Invalid credentials Password" });
        console.log("Invalid credentials Password");
        return; // Return to avoid sending multiple responses
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
    }
  };

const getUserById = async (req, res) => {};

export { getAllUsers, createUser, getUserById, loginUser };