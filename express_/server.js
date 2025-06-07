import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
// console.log(app);

// app.use(express.text());
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/text-body", express.text(), (req, res) => {
  console.log(req.body);
  res.send(`Got post req with body: \n${JSON.stringify(req.body, null, 2)}`);
});

app.post("/json-body", express.json(), (req, res) => {
  console.log(req.body);
  res.send(`Got post req with body: \n${JSON.stringify(req.body, null, 2)}`);
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
