import express from "express";
import { getAllUsers, addUser, findUserById, findUserByEmail } from "../controllers/users.js";
import { loginUser } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await loginUser(email, password);
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});

  
  router.post("/", async (req, res) => {
    try {
      const user = await addUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to add user", error });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const user = await findUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  router.get('/email/:email', async (req, res) => {
    try {
      const user = await findUserByEmail(req.params.email);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

export default router;
