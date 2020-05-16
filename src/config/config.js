require("dotenv").config();

function getEnv(variable) {
  const envVar = process.env[variable];
  if (!envVar) throw Error(`${variable} has not been set`);
  return process.env[variable];
}

const production = {};

const test = {};

const development = {
  space_id: getEnv("CMS_SPACE_ID"),
  access_token: getEnv("CMS_ACESS_TOKEN"),
  mongo_un: getEnv("MONGO_UN"),
  mongo_uri: `mongodb+srv://${getEnv("MONGO_UN")}:${getEnv(
    "MONGO_PW"
  )}@test-2ro7r.mongodb.net/test?retryWrites=true&w=majority`,
  mongo_offline_uri: `mongodb://localhost:27017/zitt`,
  mongo_pw: getEnv("MONGO_PW"),
};

const testing = {
  test_db_uri: getEnv("DATABASE_URL"),
};

const all = {
  privateKey: getEnv("SECRET_KEY"),
  mongo_offline_uri: `mongodb://localhost:27017/zitt`,
  mongo_uri: `mongodb+srv://${getEnv("MONGO_UN")}:${getEnv(
    "MONGO_PW"
  )}@test-2ro7r.mongodb.net/test?retryWrites=true&w=majority`,
};

const enviroment =
  process.env["ENVIRONMENT"] == "development" ? development : testing;

module.exports = {
  ...enviroment,
  ...all,
};
