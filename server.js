const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let playerPoints = 5000;

// Helper function to roll a single die
const rollDie = () => Math.floor(Math.random() * 6) + 1;

app.post('/roll', (req, res) => {
  const { betAmount, betType } = req.body;

  if (betAmount > playerPoints) {
    return res.status(400).json({ message: 'Insufficient points' });
  }

  const die1 = rollDie();
  const die2 = rollDie();
  const rolledNumber = die1 + die2;
  let winnings = 0;

  if (betType === '7up' && rolledNumber > 7) {
    winnings = betAmount * 2;
  } else if (betType === '7down' && rolledNumber < 7) {
    winnings = betAmount * 2;
  } else if (betType === '7' && rolledNumber === 7) {
    winnings = betAmount * 5;
  }

  playerPoints = playerPoints - betAmount + winnings;

  res.json({ die1, die2, rolledNumber, winnings, playerPoints });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
