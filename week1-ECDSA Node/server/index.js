const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "02c93c7a273ae2a1d8dc1d8745fc422ac1bf49ecb8ed5f444f4411ccf8e8102791": 100,
  "0214dd183a1dc9b50b5cc9bf127d83889e48295c1e7d30794a961bda3c1d22f27c": 50,
  "02c07756759afef70e2006a61fda42474290166f0c8e91d681790d82911c382200": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, amount, recipient } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
