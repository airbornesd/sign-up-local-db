import express from 'express';
import { sendResponse } from './helper.js';
import 'dotenv/config';
import { addUser, getUserById } from './db/db.js';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { status: 200, message: '' });
});

app.get('/signup', (req, res) => {
  res.render('signup', { status: 200, message: '' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return sendResponse(res, 400, 'provide the username and password');

  const user = getUserById(username);

  if (!user)
    return res.render('index', { status: 400, message: 'user not found' });

  if (atob(user.password) === password) return res.render('login');

  res.render('index', { status: 400, message: 'user not found' });
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return sendResponse(res, 400, 'provide the username and password');

  const user = getUserById(username);

  if (user)
    return res.render('signup', { status: 400, message: 'username in use' });

  const hashedPassword = btoa(password);

  addUser(username, hashedPassword);

  res.render('login');
});

app.get('/logout', (req, res) => {
  res.render('index', { status: 200, message: '' });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
