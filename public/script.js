const controls = document.querySelector("#controls");
const btnPlay = document.querySelector("#play-control");
let index = 0;
let currentMusic;
let isPlaying = false;

controls.addEventListener("click", function (event) {
  const audios = [];
  let music = {};

  if (event.target.id != "controls") {
    const musics =
      event.path[2].childNodes[3].childNodes[5].childNodes[1].childNodes[3]
        .childNodes;

    musics.forEach(function (item) {
      if (item.nodeName != "#text") {
        music.name = item.childNodes[3].childNodes[0].data;
        music.artist = item.childNodes[5].childNodes[0].data;
        music.image = item.childNodes[1].childNodes[0].currentSrc;
        music.audio = item.childNodes[7].childNodes[1];
        audios.push(music);
        music = {};
      }
    });
  }

  function updateDataMusic() {
    currentMusic = audios[index];
    document.querySelector("#currentImg").src = currentMusic.image;
    document.querySelector("#currentName").innerText = currentMusic.name;
    document.querySelector("#currentArtist").innerText = currentMusic.artist;
    document.querySelector("#volume").value = currentMusic.audio.volume * 100;

    const progressbar = document.querySelector("#progressbar");
    const textCurrentDuration = document.querySelector("#current-duration");
    const textTotalDuration = document.querySelector("#total-duration");

    progressbar.max = currentMusic.audio.duration;
    textTotalDuration.innerText = secondsToMinutes(currentMusic.audio.duration);
    textCurrentDuration.innerText = secondsToMinutes(
      currentMusic.audio.currentTime
    );
    progressbar.valueAsNumber = currentMusic.audio.currentTime;
  }

  if (event.target.id == "play-control") {
    if (index === 0) {
      updateDataMusic();
    }

    if (!isPlaying) {
      btnPlay.classList.replace("bi-play-fill", "bi-pause-fill");
      currentMusic.audio.play();
      isPlaying = true;
    } else {
      btnPlay.classList.replace("bi-pause-fill", "bi-play-fill");
      currentMusic.audio.pause();
      isPlaying = false;
    }
  }
});

function secondsToMinutes(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
}
