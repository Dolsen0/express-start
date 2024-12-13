import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export async function getAllUsers() {
  try {
    const users = await User.find().select("-password");
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
  }
}

export async function findUserById(userId) {
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw new Error("Could not find user");
  }
}

export async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Could not find user");
  }
}

export async function addUser(userData) {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10); // Hash password
    const user = new User({ ...userData, password: hashedPassword }); // Save hashed password
    await user.save();
    return user;
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Could not add user");
  }
}

export async function loginUser(email, password) {
  try {
    const user = await findUserByEmail(email); // Fetch user with password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { token, user: payload };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error(error.message);
  }
}
