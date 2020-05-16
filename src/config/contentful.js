const contentful = require("contentful");
const { space_id, access_token } = require("./config");
const client = contentful.createClient({
	space: space_id,
	accessToken: access_token
});

module.exports = client;
