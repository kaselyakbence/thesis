import { app } from "./app";
import { connect } from "./db/connectToDB";

import { User } from "./models/User";
/*
import { Room } from "./models/Room";
import { Event } from "./models/Event";
*/
const port = 11111;

//Run app
app.listen(port, async () => {
  //Connect to MongoDB database
  await connect();

  //TESTING
  const user = User.build({
    email: "test@test.com",
    nick_name: "user",
    password: "password",
  });
  await user.save();

  console.log(`App listening at http://localhost:${port}`);
});
