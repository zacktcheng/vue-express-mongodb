const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const vuePath = __dirname + '/public/';

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:8080'
}));
app.use(bodyParser.urlencoded({
  extended: true
}))

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);
app.use(express.static(vuePath));
app.get(/.*/, (req, res) => res.sendFile(`${vuePath}index.html`));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});