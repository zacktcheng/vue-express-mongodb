require('dotenv').config();
const express = require('express');
const mongodb = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://test:${process.env.SECRET_KEY}@vue-express-mongodb.wklpgjf.mongodb.net/?retryWrites=true&w=majority`;
const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverApi: ServerApiVersion.v1 
  });
  /*
  try {
    await client.connect();
  } catch(e) {
    console.log(e);
  } finally {
    await client.close();
  }
  */
  return client.db('vue-express-mongodb').collection('posts');
}

module.exports = router;