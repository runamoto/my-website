function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5");
}

let blocks = [];
let channels = {}

function render_channel(channel) {
  channels[channel.slug] = channel
  let blocks = channel.contents.slice(0, 1).map(render_block).join("");

  document.querySelector(".project-container").innerHTML += `
    <div class="channel" id="channel-${channel?.slug}" tags="#all ${channel?.metadata?.description}">
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

function renderFullPage(channel){
  let blocks = channel.contents.map(render_block).join("");
  let button = document.createElement('button')
  button.classList.add('close-button')
  button.innerText = "close"
  button.onclick = closeFullPage
    // code to make the full page using channel contents
  let fullPage = document.createElement('div')

  let contents = document.createElement('div')
  contents.innerHTML = `
    <div>
    <h1>${channel.title}</h1>
      <p>${
          channel?.contents.find(function (block) {
            if (block.title == "description") return true;
          })?.content_html
        }</p>
      <div class="image-container">
        ${blocks}
      </div>
    </div>
    `;

  fullPage.appendChild(button)
  fullPage.appendChild(contents)
  fullPage.classList.add('full-page')

    document.body.appendChild(fullPage)
}

function closeFullPage(){
  console.log('called')
  document.querySelector('.full-page').remove()
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

  Object.entries(channels).forEach(([slug, channel]) => {
    let el = document.querySelector("#channel-"+slug)
    el.onclick = () => {
      renderFullPage(channel)
    }
  })
};

fetch("./data.json")
  .then((res) => res.json())
  .then(init)
  .then(mountonclick);

function tagButton(tag){ console.log(tag);
  let button = document.getElementById(tag);
  if(!button) {
    console.log("DIDN/t find", tag)
    return
  }
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
// tagButton('photography');
// tagButton('writing');

tagButton('printmaking&textiles');
tagButton('books');
tagButton('posters');
tagButton('films');
tagButton('ephemera');
tagButton('websites');
tagButton('visual-identity');
