import { app } from "./app";
import { connect } from "./db/connectToDB";

import { User } from "./models/User";
import { Room } from "./models/Room";

const port = 11111;

//Run app
app.listen(port, async () => {
  //Connect to MongoDB database
  await connect();

  console.log(`App listening at http://localhost:${port}`);
});
