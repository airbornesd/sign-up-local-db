import fs from 'fs';

let users = [];

const createUser = () => {
  fs.writeFileSync('src/db/user.json', JSON.stringify(users, null, 2));
};

const loadUsers = () => {
  try {
    const data = fs.readFileSync('src/db/user.json', 'utf8');
    users = JSON.parse(data);
  } catch (e) {
    console.error('Error loading users:', e.message);
  }
};

export const addUser = (username, password) => {
  const user = { username, password };

  loadUsers();
  users.push(user);
  createUser();
};

export const getUserById = (username) => {
  loadUsers();
  return users.find((user) => user.username === username);
};

export const getAllUsers = () => {
  loadUsers();
  return users;
};
