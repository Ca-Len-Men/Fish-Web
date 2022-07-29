// btn
// const btnHome = document.querySelector(".go-home");
// const btnPlayList = document.querySelector(".play-list");
const btnPlay = document.querySelector(".play-song");
const btnBack = document.querySelector(".back");
const btnForward = document.querySelector(".forward");
//
const audio = document.querySelector("#audio");
// const progress = document.querySelector(".progress");
// const playListBox = document.querySelector(".playlist-box");
const songs = document.querySelector(".list-song");
// const thumbnailSong = document.querySelector(".thumbnail-song img");
const nameSong = document.querySelector(".song-name");
// const author = document.querySelector(".info-song .author");
const timeSong = document.querySelector(".duration-time");
const musicContent = document.querySelector(".music-content");
// const progressBar = document.querySelector(".progress-bar");
const currentTimeDisplay = document.querySelector(".current-time");

const loop_music = document.querySelector(".loop");

const listMusic = [
  ["Overlord SS1", "Overlord Opening I"],
  ["Overlord SS2", "Overlord Opening II"],
  ["Overlord SS3", "Overlord Opening III"],
  ["Overlord SS4", "Overlord Opening IV"],
  ["Owari no Seraph OP 1", "Owari no Seraph Opening"]
];

songs.textContent = ''
for (let i = 0; i < listMusic.length; ++i) {
  temp = `<p class="name-song${i} char btnchar" data-path="${listMusic[i][0]}" data-index="${i}">[${listMusic[i][1]}]</p>`
  songs.insertAdjacentHTML(
    "beforeend",
    temp
  );
}

songs_event = []
for (let i = 0; i < listMusic.length; i++)
  songs_event.push(songs.querySelector('.name-song' + i))

class UI {
  constructor() {
    this.songIndex = 0
    this.loop = false
  }

  // get duration
  getDuration(music) {
    return new Promise(function (resolve) {
      music.addEventListener("loadedmetadata", function () {
        const time = formatTime(music.duration);
        resolve(time);
      });
    });
  }

  // load detail song when page loaded
  loadSong(music) {
    console.log(music)
    audio.src = `MP3/${music[0]}.mp3`;

    this.getDuration(audio).then((time) => {
      nameSong.textContent = music[1];
      timeSong.textContent = time;
    });
  }

  // play song
  playSong() {
    musicContent.classList.add("playing");
    btnPlay.textContent = '[Stop]'
    audio.play();
  }

  // pause song
  pauseSong() {
    musicContent.classList.remove("playing");
    btnPlay.textContent = '[Play]'
    audio.pause();
  }

  // prev song
  prevSong() {
    this.songIndex--;
    if (this.songIndex < 0)
      this.songIndex = listMusic.length - 1;
    this.loadSong(listMusic[this.songIndex]);
  }

  // next song
  nextSong() {
    this.songIndex++;
    if (this.songIndex > listMusic.length - 1)
      this.songIndex = 0;
    this.loadSong(listMusic[this.songIndex]);
  }

  // update progress
  updateProgress(e) {
    const { currentTime, } = e.srcElement;
    const time = formatTime(currentTime);
    currentTimeDisplay.textContent = time;
  }

  // select song in playlist
  selectSong(index) {
    this.songIndex = index
    this.loadSong(listMusic[index]);
    this.playSong();
  }
}

document.addEventListener("DOMContentLoaded", eventListeners);

function eventListeners() {
  const ui = new UI();

  // load song
  ui.loadSong(listMusic[ui.songIndex]);

  for(let i = 0; i < listMusic.length; ++i){
      songs_event[i].addEventListener("click", function() {
        index = parseInt(songs_event[i].getAttribute('data-index'))
        console.log(index)
        ui.selectSong(index)
      })
    }

  loop_music.addEventListener("click", function(){
    console.log(ui.loop)
    if(ui.loop)
      loop_music.textContent = '[Loop]'
    else
      loop_music.textContent = '[>Loop<]'
    ui.loop = !ui.loop
  })

  // play/pause song
  btnPlay.addEventListener("click", function () {
    if (musicContent.classList.contains("playing")) {
      ui.pauseSong();
    } else {
      ui.playSong();
    }
  });

  // update progress
  audio.addEventListener("timeupdate", function (e) {
    ui.updateProgress(e);
  });
  
  btnBack.addEventListener("click", function () {
    ui.prevSong();
    ui.playSong();
  });
  
  btnForward.addEventListener("click", function () {
    ui.nextSong();
    ui.playSong();
  });

  // end song
  audio.addEventListener("ended", function () {
    if(ui.loop === false)
      ui.nextSong();
    ui.playSong();
  });

  // select song
  // songs.addEventListener("click", function (e) {
  //   ui.selectSong(e);
  // });
}

function formatTime(sec_num) {
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);

  hours = hours < 10 ? (hours > 0 ? "0" + hours : 0) : hours;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return (hours !== 0 ? hours + ":" : "") + minutes + ":" + seconds;
}
