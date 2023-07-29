const express = require('express');
const app = express();
const port = 2000;

const postRouter = require("./routes/post.js");
const commentRouter = require("./routes/comment.js")

const connect = require("./schemas"); // db연결
connect();

app.use(express.json());

app.use("/api", [postRouter,commentRouter]);


app.get('/', (req, res) => { 
  res.send('Hello World!');
});



app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});