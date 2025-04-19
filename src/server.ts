import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import { Server } from "http";

let server: Server;

async function main() {
  await mongoose.connect(config.mongo_uri as string);

  server = app.listen(config.port, () => {
    console.log(`server is running from port - ${config.port}`);
  });
}

main().catch((error) => console.error(error));

process.on("unhandledRejection", () => {
  console.log("😈 unhandledRejection occured. Shutting down the server!");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
process.on("uncaughtException", () => {
  console.log("😈 uncaughtException occured. Shutting down the server!");

  process.exit(1);
});
