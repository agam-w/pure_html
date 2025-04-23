const songsList = [
  {
    name: "song1",
    artist: "Bruno Mars",
    src: "assets/1.mp3",
    cover: "assets/1.jpg",
  },
  {
    name: "song2",
    artist: "Michael Jackson",
    src: "assets/2.mp3",
    cover: "assets/2.jpg",
  },
  {
    name: "song3",
    artist: "Justin Bieber",
    src: "assets/3.mp3",
    cover: "assets/3.jpg",
  },
];

const artisName = document.querySelector(".artist-name");
const musicName = document.querySelector(".song-name");
const time = document.querySelector(".time");
const cover = document.querySelector(".cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const fillBar = document.querySelector(".fill-bar");
const prog = document.querySelector(".progress-bar");

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener("DOMContentLoaded", () => {
  loadSong(currentSong);
  song.addEventListener("timeupdate", updateProgress);
  song.addEventListener("ended", nextSong);
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  playBtn.addEventListener("click", togglePlayPause);
  prog.addEventListener("click", seek);
});

function loadSong(index) {
  const { name, artist, src, cover: thumb } = songsList[index];
  song.src = src;
  cover.style.backgroundImage = `url(${thumb})`;
  artistName.innerText = artist;
  musicName.innerText = name;
}

function updateProgress() {
  if (song.duration) {
    const pos = (song.currentTime / song.duration) * 100;
    fillBar.style.width = `${pos}%`;
    const duration = formatTime(song.duration);
    const current = formatTime(song.currentTime);
    time.innerText = `${current} - ${duration}`;
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function togglePlayPause() {
  if (playing) {
    song.pause();
  } else song.play();
  playing = !playing;
  playBtn.classList.toggle("fa-pause", playing);
  playBtn.classList.toggle("fa-play", !playing);
  cover.classList.toggle("active", playing);
}

function nextSong() {
  currentSong = (currentSong + 1) % songsList.length;
  playMusic();
}

function prevSong() {
  currentSong = (currentSong - 1 + songsList.length) % songsList.length;
  playMusic();
}

function playMusic() {
  loadSong(currentSong);
  song.play();
  playing = true;
  playBtn.classList.add("fa-pause");
  playBtn.classList.remove("fa-play");
  cover.classList.add("active");
}

function seek(e) {
  const pos = (e.offsetX / prog.clientWidth) * song.duration;
  song.currentTime = pos;
}
