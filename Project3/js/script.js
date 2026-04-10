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


    const msg = document.createElement("div");
    msg.classList.add("message");


    const chicken = document.createElement("img");
    chicken.src = "images/chicken.png";


    const textEl = document.createElement("span");
    textEl.textContent = text;


    msg.appendChild(chicken);
    msg.appendChild(textEl);


    container.appendChild(msg);


    setTimeout(() => {
      msg.classList.add("move");
    }, 10);


    setTimeout(() => {
      msg.remove();
    }, 3000);
  }
});