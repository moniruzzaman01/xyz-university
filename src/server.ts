import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

async function main() {
  await mongoose.connect(config.mongo_uri as string);

  app.listen(config.port, () => {
    console.log(`server is running from port - ${config.port}`);
  });
}

main().catch((error) => console.error(error));
