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

  const user2 = User.build({
    email: "test2@test.com",
    nick_name: "user2",
    password: "password",
  });
  await user2.save();
  /*
  const user3 = User.build({
    email: "test3@test.com",
    nick_name: "user3",
    password: "password",
  });
  await user3.save();

  const user4 = User.build({
    email: "test4@test.com",
    nick_name: "user4",
    password: "password",
  });
  await user4.save();
  
  const user2 = User.build({
    email: "test2@test.com",
    nick_name: "user2",
    password: "password",
  });

 
  await user2.save();

  const event = Event.buildFriendRequest(user2.id, user.id);
  event.save();*/

  console.log(`App listening at http://localhost:${port}`);
});
