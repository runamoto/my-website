function render_channel(channel) {
  let blocks = channel.contents.map(render_block).join("");

  console.log(channel)
  document.querySelector(".project-container").innerHTML += `
    <div class="channel">
      <div class="metadata-container">
        <h1>${channel.title}</h1>
        <p>${channel?.metadata?.description}</p>
      </div>
      <div class="image-container">
        ${blocks}
      </div>
    </div>
    `;
}

function render_block(block) {
  if (block.class == "Image") return image(block)
  if (block.class == "Attachment" && block.attachment.extension == "mp4") return mp4(block)
}

function image(block) {
  return `
    <div class="block">
      <img src= ${block.image?.display.url}></img>
    </div>`;
}

function mp4(block) {
  return `
    <div class="block">
      <video src= ${block.attachment.url} controls></video>
    </div>`;
}

let init = (channels) => channels.forEach(render_channel)
fetch("./data.json").then(res => res.json()).then(init)


