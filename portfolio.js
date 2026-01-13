function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5");
}

let blocks = [];

function render_channel(channel) {
  console.log(channel)
  let blocks = channel.contents.map(render_block).join("");

  console.log(channel);
  document.querySelector(".project-container").innerHTML += `
    <div class="channel" tags="#all ${channel?.metadata?.description}">
      <div class="metadata-container" >
        <h1> ${channel.title}</h1>
        <p>${
          channel?.contents.find(function (block) {
            if (block.title == "description") return true;
          })?.content_html
        }</p>
      </div>
      <div class="image-container">
        ${blocks}
      </div>
    </div>
    `;
}

function render_block(block) {
  blocks.push(block);
  if (block.class == "Image") return image(block);
  if (block.class == "Attachment" && block.attachment.extension == "mp4")
    return mp4(block);
}

function image(block) {
  return `
    <div class="block fullsizeable" block-id="${block.id}">
      <img src= ${block.image?.display.url}></img>
    </div>`;
}

function mp4(block) {
  return `
    <div class="block">
      <video src= ${block.attachment.url} controls></video>
    </div>`;
}

let init = (channels) => channels.forEach(render_channel);
let mountonclick = () => {
  document.querySelectorAll(".fullsizeable").forEach((e) => {
    e.onclick = (btn) => {
      // make block if fullsizeable
      let fullsize = document.createElement("div");
      fullsize.classList.add("fullsize");
      let image = document.createElement("img");
      image.src = blocks.find(
        (b) => b.id == e.getAttribute("block-id")
      ).image?.original.url;

      fullsize.appendChild(image);
      fullsize.onclick = () => fullsize.remove();
      document.body.appendChild(fullsize);

      //e.classList.toggle("fullsize")
    };
  });
};

fetch("./data.json")
  .then((res) => res.json())
  .then(init)
  .then(mountonclick);

function tagButton(tag){ console.log(tag);
  let button = document.getElementById(tag);
  button.onclick = () => {
    document.querySelectorAll('.channel').forEach((channel) => {
      let tags = channel.getAttribute('tags');
      if (tags.includes("#"+tag)) {
        channel.style.display = 'block';
      } else {
        channel.style.display = 'none';
      }
    })
  }
}

tagButton('publishing');
tagButton('research');
tagButton('film');
tagButton('all');
tagButton('typography');
tagButton('ecology');
tagButton('archiving');
tagButton('photography');
tagButton('writing');
tagButton('printmaking&textiles');
tagButton('books');
tagButton('posters');
tagButton('films');
tagButton('ephemera');
tagButton('websites');
tagButton('visual-identity');
