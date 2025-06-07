import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;
// console.log(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  console.log(req.body);
  res.send(`Got post req with body: \n${JSON.stringify(req.body,null,2)}`);
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
