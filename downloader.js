import fs from "fs"
import { auth } from "./auth.js";
import { Arena } from "./arena.js";

let projectList = [];
let channels = []

const api = Arena({ auth })

api
  .channel("projects-llzgpkj-5qc")
  .get()
  .then((channel) => {
    channel.contents.forEach((c) => {
      if (c.class == "Channel") {
        projectList.push(c.slug)
      }
    })

    run()
  })

async function run() {
  for await (let channel of projectList.map((slug) => api.channel(slug).get())) {
    channels.push(channel)
  }

  fs.writeFileSync("./data.json", JSON.stringify(channels, null, 2), { encoding: "utf8" })
}
