const play = document.querySelector(".play"),
previous = document.querySelector(".prev"),
next = document.querySelector(".next"),

trackImage = document.querySelector('.track-image'),
title = document.querySelector('.title'),
artist = document.querySelector('.artist'),

trackCurrentTime = document.querySelector('.current-time'),
trackDuration = document.querySelector('.duration-time'),
slider = document.querySelector('.duration-slider'),
autoPlayBtn = document.querySelector(".Play-all"),

showVolume = document.querySelector('#show-volume'),
volumeIcon = document.querySelector('#volume-icon'),
currentVolume = document.querySelector('#volume'),


hamBurger = document.querySelector('.fa-bars'),
closeIcon = document.querySelector('.fa-times'),

musicPlaylist = document.querySelector('.music-playlist'),
pDiv = document.querySelector('.playlist-div'),
playlist = document.querySelector('.playlist');

let timer;
let autoplay = 0; 
let indexTrack = 0;
let songIsPlaying = false;
let track = document.createElement("audio");

play.addEventListener("click", justPlay);
next.addEventListener("click", nextSong);
previous.addEventListener("click", prevSong);
autoPlayBtn.addEventListener("click", autoPlayToggle);
volumeIcon.addEventListener("click", muteSound);
currentVolume.addEventListener("change", changeVolume);
slider.addEventListener("change", changeDuration);
track.addEventListener("timeupdate", songTimeUpdate);
hamBurger.addEventListener("Click", showPlayList);
closeIcon.addEventListener("Click", hidePlayList);

function loadTrack(indexTrack) {
    clearInterval(timer);
    resetSlider();



    track.src = trackList[indexTrack].path;
    trackImage.src = trackList[indexTrack].img;
    title.innerHTML = trackList[indexTrack].name;
    artist.innerHTML = trackList[indexTrack].singer;
    track.load();


    timer = setInterval(updateSlider, 1000);
}
loadTrack(indexTrack);

// handling the logic for play or pause song 

function justPlay() {
    if (songIsPlaying == false){
        playSong();
    } else{
        pauseSong();
    }
}

function playSong() {
    track.play();
    songIsPlaying = true;
    play.innerHTML = '<i class="fas fa-pause"></i>';
}
// pause song 
function pauseSong(){
    track.pause();
    songIsPlaying = false;
    play.innerHTML = '<i class="fas fa-play"></i>';
}
// next song 
function nextSong() {
    if (indexTrack < trackList.length - 1){
        indexTrack++;
        loadTrack(indexTrack);
        playSong();
    } else {
        indexTrack = 0;
        loadTrack(indexTrack);
        playSong();
    }
}
// prev song 
function prevSong() {
    if (indexTrack > 0){
        indexTrack--;
        loadTrack(indexTrack);
        playSong();
    } else {
        indexTrack = trackList.length -1;
        loadTrack(indexTrack);
        playSong();
    }
}
// change duration 
function changeDuration(){
    let sliderPosition = track.duration * (slider.value / 100);
    track.currentTime = sliderPosition;
}

// auto playy 
function autoPlayToggle() {
    if (autoplay == 0) {
        autoplay = 1;
        autoPlayBtn.style.background = "#FFFF00";
    } else{
        autoplay = 0;
        autoPlayBtn.style.background = "#808080";
    }
}
// mute volume 
function muteSound() {
    track.volume = 0;
    showVolume.innerHTML = 0;
    currentVolume.value = 0;
}
// changeVolume 
function changeVolume() {
    showVolume.value = currentVolume.value;
    track.volume = currentVolume.value / 100;
}

// slider reset 
function resetSlider(){
    slider.value = 0;
}

// update slider 
function updateSlider() {
    let position = 0;

    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration)
        ;
        slider.value = position;
    }

    if (track.ended) {
        play.innerHTML = '<i class="fas fa-play"></i>';
    if (autoplay == 1 && indexTrack < trackList.length -
        1) {
            indexTrack++;
            loadTrack(indexTrack);
            playSong();

    } else if (autoplay == 1 && indexTrack == trackList.length -
        1) {
            indexTrack = 0;
            loadTrack(indexTrack);
            playSong(); 
    }
    }
}
//update song time 
function songTimeUpdate() {
    if (track.duration) {
        let curmins = Math.floor(track.currentTime / 60);
        let cursecs = Math.floor(track.currentTime - curmins *60);
        let durmins = Math.floor(track.duration / 60);
        let dursecs = Math.floor(track.duration - durmins * 60);
    
        if (dursecs < 10) {
            dursecs = "0" + dursecs;
        }
        if (durmins < 10) {
            durmins = "0" + durmins;
        }
        if (cursecs < 10) {
            cursecs = "0" + cursecs;
        }   
        trackCurrentTime.innerHTML = curmins + ":" + cursecs
        trackDuration.innerHTML = durmins + ":" + dursecs
    } else {
        trackCurrentTime.innerHTML = "00" + ":" + "00"
        trackDuration.innerHTML = "00" + ":" + "00"
    }
    
}
// display play list 
function showPlayList() {
    musicPlaylist.style.transform = "translateX(0)";
}
// hide playlist 
function hidePlayList() {
        musicPlaylist.style.transform = "translateX(-100%)";
}

// display tracks in playlist 
// let counter = 1;
// function displayTracks(){
//     for ( let i = 0; i < trackList.length; i++){
//         console.log(trackList[i]. name);
//         let div = document.createElement("div");
//         div.classList.add("playlist");
//         div.innerHTML = 
//         <span class="song-index">1</span>
//         <p class="single-song">song one</p>
//         ;
//         pDiv.appendChild(div);
//     }
// } 

// displayTracks()