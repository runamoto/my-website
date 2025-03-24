import { Arena } from "./arena.js";
import { auth } from "./auth.js";
let api = Arena({ auth });

function render_channel(channel) {
  let blocks = channel.contents.map(render_block).join("");

  document.querySelector(".project-container").innerHTML += `
  <div class="channel">
    <div class="metadata-container">
        <h1>${channel.title}</h1>
    </div>
    <div class="image-container">
        ${blocks}
    </div>
  </div>
  `;
}

function render_block(block) {
  if (block.class == "Image") {
    return `
    <div class="block">
      <img src= ${block.image?.display.url}></img>
    </div>`;
  }

  if (block.class == "Attachment" && block.attachment.extension == "mp4") {
    return `
    <div class="block">
      <video src= ${block.attachment.url} controls></video>
    </div>`;
  }
}

let init = (channels) => channels.forEach(render_channel)
fetch("./data.json").then(res => res.json()).then(init)


