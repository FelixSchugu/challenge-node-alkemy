import app from "./server.js";

const run = async () => {
  await app.listen(3000);
  console.log("Server is running on port 3000");
};

run();
