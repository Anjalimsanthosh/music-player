// List of songs with details
const songs = [
  {
    title: "Until I Found You",
    artist: "Stephen Sanchez",
    src: "music/until i found you .mp3",
    cover: "images/Until i found you.jpg",
    isFavorite: false
  },
  {
    title: "Heather",
    artist: "Conan Grey",
    src: "music/heather.mp3",
    cover: "images/heather.jpg",
    isFavorite: true
  },
  {
    title: "Those Eyes",
    artist: "New West",
    src: "music/Those Eyes.mp3",
    cover: "images/Those eyes.jpg",
    isFavorite: false
  },
  {
    title: "Co2",
    artist: "Prateek Kuhad",
    src: "music/co2.mp3",
    cover: "images/CO2.jpg",
    isFavorite: false
  }

];

// Select elements
let songIndex = 0;
const song = document.getElementById("song");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// Load song info
function loadSong(index) {
  const s = songs[index];
  title.textContent = s.title;
  artist.textContent = "by " + s.artist;
  song.src = s.src;
  cover.src = s.cover;

  // ⭐️ ADD THESE NEW LINES ⭐️
  if (s.isFavorite) {
    favoriteBtn.classList.add('is-favorite');
  } else {
    favoriteBtn.classList.remove('is-favorite');
  }
}

// Play song
function playSong() {
  song.play();
  playBtn.textContent = "⏸️";
 }

// Pause song
function pauseSong() {
  song.pause();
  playBtn.textContent = "▶️";
  }

// Play / pause toggle
playBtn.addEventListener("click", () => {
  song.paused ? playSong() : pauseSong();
});

// Next song
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
});

// Previous song
prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
});

// Function to format time from total seconds to minutes:seconds
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    // Add a leading zero if seconds is less than 10
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

// Progress bar and time update
song.addEventListener("timeupdate", () => {
    // 1. Update the progress bar (your existing code)
    progress.value = (song.currentTime / song.duration) * 100;
    
    // 2. Update the current time display
    currentTimeEl.textContent = formatTime(song.currentTime);

    // 3. Update the total duration
    if (song.duration) {
        durationEl.textContent = formatTime(song.duration);
    }
});

// Change song position
progress.addEventListener("input", () => {
  song.currentTime = (progress.value / 100) * song.duration;
});

// Auto next when song ends
song.addEventListener("ended", () => {
  nextBtn.click();
});

// Add the selector to the top (if you haven't already):
const favoriteBtn = document.getElementById('favorite-btn');

// Modify the click listener at the bottom:
favoriteBtn.addEventListener('click', () => {
    // 1. Invert the status of the current song in the array
    songs[songIndex].isFavorite = !songs[songIndex].isFavorite; 
    
    // 2. Toggle the visual class
    favoriteBtn.classList.toggle('is-favorite');
    
    console.log(`Favorite status for ${songs[songIndex].title}: ${songs[songIndex].isFavorite}`);
});

// Load the first song on start
loadSong(songIndex);
