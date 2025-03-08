console.log("what the ★");

let audio = new Audio(
  "https://attachments.are.na/35069181/6025338f4d57c46ac51f9bde5d9e3aaa.mp3?1741414422"
);
document.querySelectorAll("*").forEach((button) => {
  button.addEventListener("click", () => {
    audio.play();
  });
});
