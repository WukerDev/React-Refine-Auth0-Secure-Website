import bcrypt from "bcrypt";
import User from "../mongodb/models/users.js";

const getAllUsers = async (req, res) => {};

const createUser = async (req, res) => {
  try {
      const { username, email, password } = req.body;
  
      const userExistsEmail = await User.findOne({ email });
      const userExistsUsername = await User.findOne({ username });
      if (userExistsEmail) {
          return res.status(400).json({ message: "User already exists" });
      }
      if (userExistsUsername) {
        return res.status(401).json({ message: "User already exists" });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json(newUser);
  } catch (error) {
      res.status(500).json({ message: "Internal server error" });
  }
};


const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
          res.status(401).json({ message: "Invalid credentials User" });
          return; 
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
          res.status(200).json({ message: "Login successful" });
          console.log("Login successful"); 
      } else {
          res.status(401).json({ message: "Invalid credentials Password" });
          console.log("Invalid credentials Password");
          return; 
      }
  
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal error" });
  }
};


const getUserById = async (req, res) => {};

export { getAllUsers, createUser, getUserById, loginUser };