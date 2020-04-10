require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./User");
const Partner = require("./Partner");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
  })
  .then()
  .catch(() => {
    process.exit(1); //quit the process
  });

app.post("/sessions", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email, password });
  if (!user.length) {
    return res.status(400).json({ error: "User not exist" });
  }
  return res.json(user);
});

// Rotas Usuário
app.get("/users", async (req, res) => {
  const users = await User.find();

  return res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  return res.json(user);
});

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);

  return res.json(user);
});

app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  return res.json();
});

// Rotas Partner

app.get("/partners", async (req, res) => {
  const partners = await Partner.find();

  return res.json(partners);
});

app.get("/partners/:id", async (req, res) => {
  const partner = await Partner.findById(req.params.id);

  return res.json(partner);
});

app.post("/partners", async (req, res) => {
  const partner = await Partner.create(req.body);

  return res.json(partner);
});

app.put("/partners/:id", async (req, res) => {
  const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.json(partner);
});

app.delete("/partners/:id", async (req, res) => {
  await Partner.findByIdAndDelete(req.params.id);

  return res.json();
});

app.listen(process.env.PORT || 4000);
