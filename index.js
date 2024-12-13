import express from "express";
import cors from "cors";
import userRoutes from './routes/users.js';
import connectToDb from "./utils/DbConnect.js";

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));


connectToDb();

app.use(express.json());

app.use('/users', userRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});


