const controls = document.querySelector("#controls");

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
        music.nome = item.childNodes[3].childNodes[0].data;
        music.artista = item.childNodes[5].childNodes[0].data;
        music.imagem = item.childNodes[1].childNodes[0].currentSrc;
        music.audio = item.childNodes[7].childNodes[1];
        audios.push(music);
        music = {};
      }
    });
  }

  console.log(audios);
});
