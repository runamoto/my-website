fetch("./blogdata.json")
    .then((response) => response.json())
    .then(function (channel) {
        let blocks = [];
        let textblocks = "";
        let title = "";
        let time = "";

        textblocks += `<div class= 'text block'>
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
                    textblocks += `<a href = ${block.source.url}> ${block.title} </a>`;
                }
            }

            //TEXT
            // if block is TEXT do something
            // block.content.html shows the inner html of a block
            if (block.class == "Text") {
                textblocks += `
        <div class="dropdown">
  <h1 class="dropbtn">${block.title} </h1>
  <div class="dropdown-content">
    ${block.content_html}
  </div>
</div>
        <div class= "post">
        <p class='time'> ${block.created_at} </p>
        <h1> </h1>

        <h3 class='description'>${block.description_html}</h3>
        </div>
        `;
            }
            //IMAGE
            // if block is IMAGE do something

            //PDF
            // if block is PDF do something
            if (block.class == "pdf") {
                textblocks += `
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
                    textblocks += `
        <div class= 'mp4 block'>
        <h1>${block.title}</h1>
        <video src>${block.attachment.url} controls </video>

        </div>`;
                }
            }
        });

        document.querySelector(".textbody").innerHTML = textblocks;
        document.querySelector(".title").innerHTML = title;
        document.querySelector(".time").innerHTML = time;
        
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
