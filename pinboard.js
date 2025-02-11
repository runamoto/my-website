import { token as auth } from "./auth.js";
import fetch from "node-fetch";
let options = {
  headers: {
    Authorization: "Bearer " + auth,
  },
};
const channel = await fetch(
  "https://api.are.na/v2/channels/omama-garden",
  options
).then((response) => response.json());
//channel title
console.log(channel.title);
// print all block titles
channel.contents.forEach((block) => {
  console.log(block.title);
});
