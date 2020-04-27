const mongoose = require("mongoose");

module.exports = {
  close: async () => {
    await mongoose.connection.close();
  },
  open: async (db_uri) => {
    try {
      await mongoose.connect(db_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("db connected");
    } catch (error) {
      console.log(error);
    }
  },
};
