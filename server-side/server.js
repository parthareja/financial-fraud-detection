const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2"] });
});

server_port = 5000;
app.listen(server_port, () => {
  console.log(`listening on port ${server_port}`);
});
