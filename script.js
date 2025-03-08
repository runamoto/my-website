const audio = new Audio(
  "https://attachments.are.na/35069181/6025338f4d57c46ac51f9bde5d9e3aaa.mp3?1741414422"
);
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    audio.play();
  });
});
