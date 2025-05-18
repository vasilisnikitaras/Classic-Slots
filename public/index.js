const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const port = 3002; // Use port 3002
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
