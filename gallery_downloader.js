import fs from "fs";
import { auth } from "./auth.js";
import { Arena } from "./arena.js";

const api = Arena({ auth });

api
  .channel("image-lab")
  .get()
  .then((channel) => {
    fs.writeFileSync("./gallerydata.json", JSON.stringify(channel, null, 2));
  });
