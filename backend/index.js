let app = require("./app");
const { connect } = require("./db/connectToDB");

//Testing
const User = require("./models/User");

const port = 11111;

//Run app
app.listen(port, async () => {
  //Connect to MongoDB database
  await connect();

  const user1 = new User({
    email: "kaselyakbence@gmail.com",
    nick_name: "Helm19",
    password: "kaki",
  });
  await user1.save();

  console.log(`Example app listening at http://localhost:${port}`);
});
