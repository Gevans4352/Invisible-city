const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const buildingsRouter = require("./routes/buildings");
const fragmentsRouter = require("./routes/fragments");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/buildings", buildingsRouter);
app.use("/api/fragments", fragmentsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Invisible city API is alive" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
