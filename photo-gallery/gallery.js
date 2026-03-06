fetch("./gallerydata.json")
  .then((response) => response.json())
  .then(function (channel) {
    let blocks = [];
    let h = "";
    let darkroom_images = "";
    let pixel_images = "";
    let Victoria = "";
    let tao_khe = "";
    let pristine = "";
    let dance = "";
    h += `<div class= 'text block'>
        <h1> <span data-scroll id="highlight">${channel.title} </span> </h1>
        </div>`;

    channel.contents.forEach(function (block) {
      blocks.push(block);
      console.log(block.title, block.class);

      //
      //LINK
      // if block is LINK do something
      if (block.class == "Link") {
        {
          h += `<a href = ${block.source.url}> ${block.title} </a>`;
        }
      }

      //what kind of a block is it
      //
      //TEXT
      // if block is TEXT do something
      // block.content.html shows the inner html of a block
      if (block.class == "Text") {
        h += `
        <div class= 'text block'>
        <p>" ${block.title} "</p>
        ${block.content_html} 
        </div>`;
      }

      //
      //IMAGE
      // if block is IMAGE do something

    
      if (block.class == "Image") {

        if (block.title.trim() == "Dance") {
          dance += `
          <div class="block image fullsizeable" block-id="${block.id}">
          <p>${block.title}</p>
          <img src = ${block.image.thumb.url}>  </img>
          </div>`;
        } 

        else if (block.title.trim() == "darkroom") {
          darkroom_images += `
          <div class="block image fullsizeable" block-id="${block.id}">
          <p>${block.title}</p>
          <img src = ${block.image.thumb.url}>  </img>
          </div>`;
        } 
        
        else if (block.title.trim() == "pixel room") {
          pixel_images += `
          <div class="block image fullsizeable" block-id="${block.id}">
          <p>${block.title}</p>
          <img src = ${block.image.thumb.url}>  </img>
          </div>`;
        }
        
        else if (block.title.trim() == "Victoria") {
          Victoria += `
          <div class="block image fullsizeable" block-id="${block.id}">
          <p>${block.title}</p>
          <img src = ${block.image.thumb.url}>  </img>
          </div>`;
        } 
        
        else if (block.title.trim() == "tao-khe") {
          tao_khe += `
          <div class="block image fullsizeable" block-id="${block.id}">
          <p>${block.title}</p>
          <img src = ${block.image.thumb.url}>  </img>
          </div>`;
        }

        else if (block.title.trim() == "pristine") {
          pristine += `
          <div class="block image fullsizeable" block-id="${block.id}">
          <p>${block.title}</p>
          <img src = ${block.image.thumb.url}>  </img>
          </div>`;
        }
        
        else {
          h += `
          <div class="block image fullsizeable" block-id="${block.id}">
          <p>${block.title}</p>
          <img src = ${block.image.thumb.url}> </img>

          </div>`;
        }

      }

      //
      //PDF
      // if block is PDF do something
      if (block.class == "pdf") {
        h += `
        <a href= '${block.attachment.url}'> 
        <div class= 'pdf block'>
        <p>${block.title}</p>
        <img src = ${block.image.display.url} controls </img>
        </div>
        </a>
        `;
      }

      //
      //ATTACHMENT/VIDEO
      // if block is ATTACHMENT do something
      if (block.class == "Attachment") {
        if (block.attachment.extension == "mp4") {
          h += `
        <div class= 'mp4 block'>
        <p>${block.title}</p>
        <video src>${block.attachment.url} controls </video>

        </div>`;
        }
      }
    });

    document.querySelector(".darkroom").innerHTML = darkroom_images;
    document.querySelector(".pixel-images").innerHTML = pixel_images;
    document.querySelector(".victoria").innerHTML = Victoria;
    document.querySelector(".else ").innerHTML = h;
    document.querySelector(".taokhe ").innerHTML = tao_khe;
    document.querySelector(".pristine ").innerHTML = pristine;
    document.querySelector(".dance ").innerHTML = dance;


    let mountonclick = () => {
      document.querySelectorAll(".fullsizeable").forEach((e) => {
        e.onclick = function () {
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

    mountonclick();
  });

// document.addEventListener("DOMContentLoaded", function () {
//   var trigger = new ScrollTrigger();
// });
