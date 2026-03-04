const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

app.use(express.json());

const CONNECTION_STRING = "mongodb://localhost:27017";
const DATABASENAME = "MyDb";

let database;

console.log("Starting API...");
console.log("Connecting to MongoDB...");

async function start() {
  try {

    const client = new MongoClient(CONNECTION_STRING);

    await client.connect();

    database = client.db(DATABASENAME);

    console.log("Connected to MongoDB");

    app.listen(5038, () => {
      console.log("Server running on http://localhost:5038");
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

start();


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Movie API running");
});


// GET MOVIES
app.get("/api/movies/GetMovies", async (req, res) => {

  try {

    const result = await database
      .collection("Movie")
      .find({})
      .toArray();

    res.json(result);

  } catch (error) {

    console.error(error);
    res.status(500).json("Error fetching movies");

  }

});


app.post("/api/movies/AddMovie", multer().none(), async (req,res)=>{

  const numOfDocs = await database.collection("Movie").countDocuments();

  await database.collection("Movie").insertOne({

    id:String(numOfDocs+1),
    title:req.body.title,
    genre:req.body.genre,
    director:req.body.director,
    year:req.body.year,
    rating:req.body.rating

  });

  res.json("Movie Added Successfully");

});


// DELETE MOVIE
app.delete("/api/movies/DeleteMovie", async (req, res) => {

  try {

    await database
      .collection("Movie")
      .deleteOne({ id: req.query.id });

    res.json("Movie Deleted Successfully");

  } catch (error) {

    console.error(error);
    res.status(500).json("Error deleting movie");

  }

});