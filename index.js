const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync('users.json'));
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.send('User already exists');
  }
  users.push({ username, password });
  fs.writeFileSync('users.json', JSON.stringify(users));
  res.send('User registered successfully');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync('users.json'));
  const userExists = users.find(user => user.username === username && user.password === password);
  if (userExists) {
    res.send('Login successful');
  } else {
    res.send('Invalid username or password');
  }
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
