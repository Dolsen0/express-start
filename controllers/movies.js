import connectToDb from "../utils/DbConnect";

export const addMovie = async (req, res) => {
    try {
      const db = await connectToDb();
      const moviesCollection = db.collection('movies');
      const result = await moviesCollection.insertOne(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Failed to add movie', error });
    }
  };

  