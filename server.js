import express from "express";
import path from "path"
const youtubeService = require('./youtubeService')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, 'index.html'))
)

app.get('/live_chat', (req, res) => {
  res.sendFile(path.join(__dirname + "/views/", 'live_chat.html'))
})

app.get('/auth', (req, res) => 
  youtubeService.getCode(res)
)

app.get('/callback', (req, res) => {
  const { code } = req.query;
  youtubeService.getTokensWithCode(code)
  res.redirect('/')
})

app.get('/find-active-chat', async (req, res) => {
  // let response = await youtubeService.test(req, res);
  // res.send(response)
  youtubeService.findActiveChat();
  res.redirect('/')
})

app.get('/start-tracking-chat', (req, res) => {
  youtubeService.startTrackingChat();
  res.redirect('/')
})

app.get('/display-messages', (req, res) => {
  youtubeService.displayMessages()
  res.redirect('/')
})

app.listen(5000, () => {
 console.log("Server running on port 5000");
});