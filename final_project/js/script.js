const topText = document.getElementById("topText");
const bottomText = document.getElementById("bottomText");

const scene1 = document.getElementById("scene1");
const scene2 = document.getElementById("scene2");
const scene3 = document.getElementById("scene3");

const uiLayer = document.getElementById("uiLayer");

let loop = 1;
let canContinue = false;
let phoneSoundPlayed = false;

/* =========================
   LOOP DATA
========================= */

const loops = {
    1: {
        top: "Today’s another day.",
        bottom: "Time to get up.(Click to continue)",
        clock: ["7:00 AM", "I guess its morning."],
        windowText: ["It looks like spring.", "The air feels fresh."],
        phone: ["Mom texted again… she wants me to come out.", "I guess I’ve been in here a while."],
        bed: "I'm not really feeling it today I think i'll go back to sleep.",
        door: ["I guess its time to get some fresh air"],
        windowImage: "images/spring-window.png",
        phoneImage: "images/phonetext.png"
    },
    2: {
        top: "Today’s another day.",
        bottom: "Didn’t I just wake up?(Click to continue)",
        clock: ["7:00 AM", "Still 7:00?"],
        windowText: ["It’s summer now.", "Wasn’t it just colder?"],
        phone: ["Same message again.", "She really wants me to go out."],
        bed: "Wasn't I just here?",
        door: ["I’ve done this before."],
        windowImage: "images/summer-window.png",
        phoneImage: "images/phonetext.png"
    },
    3: {
        top: "Today’s another day.",
        bottom: "Why am I still here?(Click to continue)",
        clock: ["7:00 AM", "It hasn’t changed."],
        windowText: ["The leaves are falling.", "I don’t remember this happening."],
        phone: ["It’s the same message… again.", "Did I ever actually go out?"],
        bed: "But? Didn't I just wake up?",
        door: ["It won’t be different."],
        windowImage: "images/fall-window.png",
        phoneImage: "images/phonetext.png"
    },
    4: {
        top: "Today’s another day.",
        bottom: "It keeps starting over.(Click to continue)",
        clock: ["7:00 AM", "It’s always 7:00."],
        windowText: ["It’s snowing.", "How long have I been here?"],
        phone: ["It’s always this message.", "I don’t think there’s anywhere else to go."],
        bed: "This won’t change anything.",
        door: ["It just starts again."],
        windowImage: "images/winter-window.png",
        phoneImage: "images/phonetext.png"
    },
    5: {
        top: "Today’s another day.",
        bottom: "Forever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ever and ev..",
        clock: ["7:00 AM", "It's always 7."],
        windowText: ["The window feels wrong.", "Outside feels empty."],
        phone: ["No new messages.", "That's worse."],
        bed: "Sleep won’t help.",
        door: ["This door has no end.", "Maybe it’s just another loop."],
        windowImage: "images/spring-window.png",
        phoneImage: "images/phonetext.png"
    }
};

/* =========================
   TYPEWRITER
========================= */

function typeText(el, text, speed, cb) {

    let i = 0;

    const interval = setInterval(() => {

        el.innerHTML += text[i];
        i++;

        if (i >= text.length) {
            clearInterval(interval);
            if (cb) cb();
        }

    }, speed);
}

/* =========================
   LOOP START
========================= */

function startLoop() {

    topText.innerHTML = "";
    bottomText.innerHTML = "";

    scene1.style.display = "block";
    scene2.style.display = "none";
    scene3.style.display = "none";

    uiLayer.style.display = "block";

    phoneSoundPlayed = false;
    canContinue = false;

    typeText(topText, loops[loop].top, 70, () => {

        setTimeout(() => {

            typeText(bottomText, loops[loop].bottom, 70, () => {

                canContinue = true;

            });

        }, 500);

    });
}

startLoop();

/* ENTER GAME */
document.addEventListener("click", () => {

    if (!canContinue) return;
    if (scene1.style.display === "none") return;

    if (loop === 5) return;  

    scene1.style.display = "none";
    scene2.style.display = "block";
    canContinue = false;

    uiLayer.style.display = "block";

   phoneButton.style.display = "none";
    phoneSoundPlayed = false;
    setTimeout(() => {
        phoneButton.style.display = "block";
        if (!phoneSoundPlayed) {
            const audio = new Audio('sounds/notification-sound-effect.mp3');
            audio.play().catch(() => {}); 
            phoneSoundPlayed = true;
        }
    }, 1500);
});

/* =========================
   CLOCK
========================= */

const clockButton = document.getElementById("clockButton");
const clockPopup = document.getElementById("clockPopup");
let clockOpen = false;

clockButton.onclick = (e) => {
    e.stopPropagation();
    clockPopup.innerHTML =
        `<p>${loops[loop].clock[0]}</p><p>${loops[loop].clock[1]}</p>`;
    clockPopup.style.display = "block";
    clockOpen = true;
};

/* =========================
   WINDOW
========================= */

const windowButton = document.getElementById("windowButton");
const windowImage = document.getElementById("windowImage");
const windowPopup = document.getElementById("windowPopup");
let windowOpen = false;

windowButton.onclick = (e) => {
    e.stopPropagation();

    windowImage.src = loops[loop].windowImage;

    windowPopup.innerHTML =
        `<p>${loops[loop].windowText[0]}</p><p>${loops[loop].windowText[1]}</p>`;

    windowImage.style.display = "block";
    windowPopup.style.display = "block";

    windowOpen = true;
};

/* =========================
   PHONE
========================= */

const phoneButton = document.getElementById("phoneButton");
const phoneImage = document.getElementById("phoneImage");
const phonePopup = document.getElementById("phonePopup");
let phoneOpen = false;

phoneButton.onclick = (e) => {
    e.stopPropagation();

    phoneImage.src = loops[loop].phoneImage;

    phonePopup.innerHTML =
        `<p>${loops[loop].phone[0]}</p><p>${loops[loop].phone[1]}</p>`;

    phoneImage.style.display = "block";
    phonePopup.style.display = "block";

    phoneOpen = true;
};

/* =========================
   DOOR
========================= */

const doorButton = document.getElementById("doorButton");
const doorPopup = document.getElementById("doorPopup");
let doorOpen = false;

doorButton.onclick = (e) => {
    e.stopPropagation();

  const doorSound = new Audio('sounds/door-open-sound.mp3');
    doorSound.play().catch(() => {}); 

    uiLayer.style.display = "none";

    scene2.style.display = "none";
    scene3.style.display = "block";

    doorPopup.innerHTML = loops[loop].door.map(line => `<p>${line}</p>`).join('');
    doorPopup.style.display = "block";
    doorOpen = true;
};

/* =========================
   BED
========================= */

const bedButton = document.getElementById("bedButton");
let bedOpen = false;

const bedPopup = document.createElement("div");
bedPopup.className = "popup";
scene2.appendChild(bedPopup);

bedButton.onclick = (e) => {
    e.stopPropagation();

    bedPopup.innerHTML = `<p>${loops[loop].bed}</p>`;
    bedPopup.style.display = "block";

    bedOpen = true;
};

/* =========================
   GLOBAL CLICK (CLOSE + LOOP ADVANCE)
========================= */

document.addEventListener("click", () => {

    if (clockOpen) {
        clockPopup.style.display = "none";
        clockOpen = false;
    }

    if (windowOpen) {
        windowImage.style.display = "none";
        windowPopup.style.display = "none";
        windowOpen = false;
    }

    if (phoneOpen) {
        phoneImage.style.display = "none";
        phonePopup.style.display = "none";
        phoneButton.style.display = "block";
        phoneOpen = false;
    }

    if (bedOpen) {
        bedPopup.style.display = "none";
        bedOpen = false;

        loop++;
        startLoop();
    }

    if (doorOpen) {
        doorPopup.style.display = "none";
        doorOpen = false;

        loop++;
        startLoop();
    }
});

let audioContext;
let clockBuffer;
let clockSource;
let clockSoundStarted = false;
let clockStartRequested = false;

function initClockAudio() {
    if (audioContext) return;
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    fetch('sounds/clock-ticking-sound-effect.mp3')
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(buffer => {
            clockBuffer = buffer;
            if (clockStartRequested) {
                startClockAudio();
            }
        })
        .catch(() => {});
}

function startClockAudio() {
    if (clockSoundStarted || !clockBuffer) return;

    if (audioContext.state === 'suspended') {
        audioContext.resume().catch(() => {});
    }

    clockSource = audioContext.createBufferSource();
    clockSource.buffer = clockBuffer;
    clockSource.loop = true;
    clockSource.connect(audioContext.destination);
    clockSource.start();
    clockSoundStarted = true;
}

initClockAudio();

document.addEventListener('click', () => {
    if (!clockSoundStarted) {
        clockStartRequested = true;
        startClockAudio();
    }
}, { once: true });