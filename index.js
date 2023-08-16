const container = document.querySelector(".container"),
pauseBtn = document.querySelector(".bxs-right-arrow"),
minVideo = document.querySelector("video"),
skipBackward = document.querySelector(".bxs-chevrons-left"),
skipForward = document.querySelector(".bxs-chevrons-right"),
progressBar = document.querySelector(".progress-bar"),
volumeBtn = document.querySelector(".bx-volume-full"),
volumeSlider = document.querySelector(".volume-slider"),
speedBtn = document.querySelector(".speed span"),
speedOptions = document.querySelector(".speed-options"),
allSpeeOptions = document.querySelectorAll(".speed-options li"),
fullScreenBtn = document.querySelector(".bx-fullscreen"),
progressArea = document.querySelector(".progress-area"),
currentVidTime = document.querySelector(".current-time"),
videoDuration = document.querySelector(".video-duration");

let timer;

function hideOptin(){
    if(minVideo.paused) return;
    timer = setTimeout(() => {
        container.classList.remove("hide");
    }, 2000);
}
hideOptin();
container.addEventListener("mousemove", () => {
    container.classList.add("hide");
    clearTimeout(timer);
    hideOptin();
});

function formatTime(e){
    let s = Math.floor(e % 60),
    m =  Math.floor(e / 60) % 60,
    h = Math.floor(e / 3600);
    s = s < 10 ? "0" + s : s;
    m = m < 10 ? "0" + m : m;
    h = h < 10 ? "0" + h : h;
    console.log(s, m, h)
    if(h == 0){
        return `${m}:${s}`
    }
    `${h}:${m}:${s}`
}

minVideo.addEventListener("timeupdate", () => {
    const { currentTime, duration } = minVideo;
    const precent = (currentTime / duration) * 100;
    progressBar.style.width = `${precent}%`;
    videoDuration.innerHTML = formatTime(duration);
    currentVidTime.innerHTML = formatTime(currentTime);
});

progressBar.addEventListener("mousedown", () => {
    progressBar.addEventListener("movusemove", dragProgressBar);
});

function dragProgressBar(e){
    let videoTimeLineWidth = progressArea.clientWidth;
    progressBar.style.width = e.offsetX + "px"
    minVideo.currentTime = (e.offsetX / videoTimeLineWidth) * minVideo.duration;
    currentVidTime.innerHTML = formatTime(minVideo.currentTime);
}

progressArea.addEventListener("mousemove", (e) => {
    let progressTime = progressArea.querySelector("span");
    progressTime.style.left = e.offsetX + "px"
    let videoTimeLineWidth = e.target.clientWidth;
    let precent = (e.offsetX / videoTimeLineWidth) * minVideo.duration;
    progressTime.innerHTML = formatTime(precent)
})


progressArea.addEventListener("click", (e) => {
    let videoTimeLineWidth = e.target.clientWidth;
    minVideo.currentTime = (e.offsetX / videoTimeLineWidth) * minVideo.duration;
});

fullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("active");
    if(container.classList.contains("active")){
        return fullScreenBtn.classList.replace("bx-fullscreen", "bx-exit-fullscreen");
    }
    fullScreenBtn.classList.replace("bx-exit-fullscreen", "bx-fullscreen");
});

speedBtn.addEventListener("click", () => {
    speedOptions.classList.add("active");
});

document.addEventListener("click", (e) => {
    if(e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-outlined"){
        speedOptions.classList.remove("active");
    }
});

for(let i = 0; i < allSpeeOptions.length; i++){
    allSpeeOptions[i].addEventListener("click", () => {
        document.querySelector(".speed-options .active").classList.remove("active");
        allSpeeOptions[i].classList.add("active");

        minVideo.playbackRate = allSpeeOptions[i].dataset.speed;
    });
}

volumeBtn.addEventListener("click", () => {
    if(volumeBtn.classList.contains("bx-volume-full")){
        volumeBtn.classList.replace("bx-volume-full", "bx-volume-mute");
        minVideo.volume = 0.0;
    }else{
        volumeBtn.classList.replace("bx-volume-mute", "bx-volume-full");
        minVideo.volume = 0.5;
    }
    volumeSlider.value = minVideo.volume;
});

volumeSlider.addEventListener("input", () => {
    minVideo.volume = volumeSlider.value;
    if(volumeSlider.value == 0){
        return volumeBtn.classList.replace("bx-volume-full", "bx-volume-mute");
    }
    volumeBtn.classList.replace("bx-volume-mute", "bx-volume-full");
});

pauseBtn.addEventListener("click", () => {
    minVideo.paused ? minVideo.play() : minVideo.pause();
});

skipBackward.addEventListener("click", () => {
    minVideo.currentTime -= 5;
});

skipForward.addEventListener("click", () => {
    minVideo.currentTime += 5;
});

minVideo.addEventListener("play", () => {
    pauseBtn.classList.replace("bxs-right-arrow", "bx-pause");
});

minVideo.addEventListener("pause", () => {
    pauseBtn.classList.replace("bx-pause", "bxs-right-arrow");
});