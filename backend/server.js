const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const filePath = './users.json';

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

app.post('/add-user', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    const users = JSON.parse(data);
    users.push({ email, password });

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      res.json({ message: 'User added successfully.' });
    });
  });
});

app.get('/users', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    const users = JSON.parse(data);
    res.json(users);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
