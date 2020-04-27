const express = require("express");
const port = 4000;
const app = express();

const { mongo_uri } = require("./config/config");
const db = require("./config/db");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/customers", require("./routes/customer"));

module.exports = {
  app,
  init: async () => {
    db.open(mongo_uri);
    app.listen(port, () =>
      console.log(`Example app listening at http://localhost:${port}`)
    );
  },
};
