import app from "./app.js";
import connectToDB from "./config/db.js";
import { PORT } from "./config/env.js";

const startServer = async () => {
  await connectToDB();
  app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
  });
};

startServer();
