let app = require("./app");
const { connect } = require("./db/connectToDB");

const port = 11111;

//Run app
app.listen(port, () => {
  //Connect to MongoDB database
  connect();

  console.log(`Example app listening at http://localhost:${port}`);
});
