const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const fill = document.getElementById("fill");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const bar = document.querySelector(".bar");

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } else {
        audio.pause();
        playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
});

audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    currentTimeEl.textContent = formatTime(audio.currentTime);
    const progress = (audio.currentTime / audio.duration) * 100;
    fill.style.width = progress + "%";
});

bar.addEventListener("click", (e) => {
    const width = bar.clientWidth;
    const clickX = e.offsetX;
    const newTime = (clickX / width) * audio.duration;
    audio.currentTime = newTime;
});

function formatTime(time) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}
