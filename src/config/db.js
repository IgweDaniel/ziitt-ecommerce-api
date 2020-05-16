const mongoose = require("mongoose");

module.exports = {
  close: async () => {
    await mongoose.connection.close();
  },
  reset: (name) => mongoose.connection.model(name).deleteMany({}),
  open: async (db_uri) => {
    try {
      await mongoose.connect(db_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
