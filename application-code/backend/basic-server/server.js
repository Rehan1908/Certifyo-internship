import express from "express";

const app = express();
const PORT = 3000;

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()} ${req.method} ${req.url}]`);
  next();
});

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get ("/username/a", (req,res) => {
  const filteredname = users.filter(user => user.name.toUpperCase().startsWith("A"))
  res.json(filteredname)
})

app.get("/users/:id", (req, res) => {
  const requestedId = Number(req.params.id);
  const foundUser = users.find((user) => user.id === requestedId);
  if (foundUser) {
    res.json(foundUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const newUser = {
    id: Date.now(),
    name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const requestedId = Number(req.params.id);
  const { name } = req.body;

  const userToUpdate = users.find((user) => user.id === requestedId);
  if (!userToUpdate) {
    return res.status(404).json({ error: "User not found" });
  }
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  userToUpdate.name = name;
  res.json(userToUpdate);
});

app.delete("/users/:id", (req, res) => {
  const requestedId = Number(req.params.id);
  const newUsers = users.filter((user) => user.id !== requestedId);

  if (newUsers.length === users.length) {
    return res.status(404).json({ error: "User not found" });
  }
  users = newUsers;
  res.sendStatus(204);
});


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});


