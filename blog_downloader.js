import fs from "fs";
import { auth } from "./auth.js";
import { Arena } from "./arena.js";

const api = Arena({ auth });

api
  .channel("blog-l3u6ahm4ukm")
  .get()
  .then((channel) => {
    fs.writeFileSync("./blogdata.json", JSON.stringify(channel, null, 2));
  });

