console.log("hello world");
import { Arena } from "./arena.js";
import { auth } from "./auth.js";
let api = Arena({ auth });

function render_channel(channel, selector) {
  let blocks = channel.contents.map(render_block).join("");

  document.querySelector(selector).innerHTML += `
  <div class="channel">
    <h1>${channel.title}</h1>
    <h2>Total size ${channel.length}</p>
    ${blocks}
  </div>
  `;
}

function render_block(block) {
  let html = `
  <div class="block">
    <p>${block.title}</p>
    <img src= ${block.image?.display.url}></img>
  </div>`;

  return html;
}

let projectList = [
  "a-canvas-on-wheels",
  "coffee-data-viz",
  "cyberfeminism-poster-s4urhjkq874",
  "faux-script-rvlg6-fb9m0",
  "mixed-media-animation-publication",
];

projectList.forEach((slug) => {
  api
    .channel(slug)
    .get()
    .then(function (channel) {
      render_channel(channel, ".container");
    });
});
