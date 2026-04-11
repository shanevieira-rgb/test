const textbox = document.getElementById("textbox");
const container = document.getElementById("container");
const gif = document.getElementById("lipsGif");
const hungryText = document.getElementById("hungryText");


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
    const words = text.split(" ");
    textEl.innerHTML = "";

    for (let i = 0; i < words.length; i++) {
    textEl.innerHTML += words[i] + " ";

    if ((i + 2) % 3 === 0) {
    textEl.innerHTML += "<br>";
  }
}


    msg.appendChild(chicken);
    msg.appendChild(textEl);


    container.appendChild(msg);


    setTimeout(() => {
      msg.classList.add("move");
    }, 10);


setTimeout(() => {
  msg.remove();


  hungryText.style.opacity = "1";

  
  setTimeout(() => {
    hungryText.style.opacity = "0";
  }, 2000);

}, 3000);
  }
});