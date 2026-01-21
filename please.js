console.log("what the ★");

let audio = new Audio(
  "https://attachments.are.na/35069181/6025338f4d57c46ac51f9bde5d9e3aaa.mp3?1741414422"
);
document.querySelectorAll("*").forEach((button) => {
  button.addEventListener("click", () => {
    audio.play();
  });
});

// Rotate through background images on page load
const backgrounds = [
  "./images/bgs/bg1.JPG",
  "./images/bgs/bg2.jpeg",
  "./images/bgs/bg3.jpg",
  "./images/bgs/bg4.jpg",
  "./images/bgs/bg6.jpg",
  "./images/bgs/bg7.jpg",
  "./images/bgs/bg8.jpg",
  "./images/bgs/bg9.jpg",
  "./images/bgs/bg10.jpg",
  "./images/bgs/bg11.jpg",
];

function setRandomBackground() {
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  const selectedBg = backgrounds[randomIndex];
  document.body.style.backgroundImage = `url("${selectedBg}")`;
}

// Set random background when page loads
window.addEventListener('load', setRandomBackground);

// Also set it immediately in case load event fires before script runs
setRandomBackground();
