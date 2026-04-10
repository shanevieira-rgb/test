const textbox = document.getElementById("textbox");
const container = document.getElementById("container");
const gif = document.getElementById("lipsGif");


const sound = new Audio("sounds/eat.mp3");


function restartGif() {
  const src = gif.src;
  gif.src = "";
  gif.src = src;
}


textbox.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    const text = textbox.value.trim();
    if (text === "") return;


    textbox.value = "";


    restartGif();


    sound.currentTime = 0;
    sound.play().catch(() => {});

    // text
    const msg = document.createElement("div");
    msg.classList.add("message");
    msg.textContent = text;

    container.appendChild(msg);

    // text movement
    setTimeout(() => {
      msg.classList.add("move");
    }, 10);


    setTimeout(() => {
      msg.remove();
    }, 3000);
  }
});