const main = require("./db")
const cors = require("cors")
main();

const express = require('express')
const app = express()
const port = 5000

app.use(cors({
  origin: '*'
}));

app.use(express.json())

app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes") )

app.listen(port, () => {
  console.log(`INotebook app listening on port ${port}`)
})
