const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector("audio");
const progressContainer = document.getElementById('progress-container');
const durationEl = document.getElementById('duration');
const currentTimeEl = document.getElementById('current-time');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// quarn soras
const soras = [
    {
        name : "sora-1",
        displayName : "Sora Elhograt",
        artist : "Yasser Eldossary"
    },
    {
        name : "sora-2",
        displayName : "Sora El-Fath",
        artist : "Yasser Eldossary"
    },
    {
        name : "sora-3",
        displayName : "Sora Qaf",
        artist : "Yasser Eldossary"
    },
    {
        name : "sora-4",
        displayName : "Sora At-Tur",
        artist : "Yasser Eldossary"
    }
]

// check playing quran

let isPlaying = false

// play quran
function playQuran() {
    isPlaying = true;
    playBtn.classList.replace("fa-play" , "fa-pause");
    playBtn.setAttribute("title" , "Pause");
    music.play();
}

// pause quran
function pauseQuran() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause" , "fa-play");
    playBtn.setAttribute("title" , "Play");
    music.pause();
}

playBtn.addEventListener('click' , () => 
    (isPlaying ? pauseQuran() : playQuran())
)


// load sora

function loadSora(sora) {
    title.textContent = sora.displayName;
    artist.textContent = sora.artist;
    music.src = `music/${sora.name}.mp3`;
    image.src = `img/${sora.name}.jpg`;
}

let soraIndex = 0 ;


// previous Sora

function prevSora() {
    
    soraIndex--;
    if(soraIndex < 0) {
        soraIndex = soras.length -1;
    }
    loadSora(soras[soraIndex]);
    playQuran();
}

// next Sora

function nextSora() {
    soraIndex++;
    if(soraIndex > soras.length -1) {
        soraIndex = 0;
    }
    loadSora(soras[soraIndex]);
    playQuran();
}

// update progress bar & time

function updateProgressBar(e) {
    if(isPlaying){
        const {duration , currentTime} = e.srcElement;
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100 ;
        progress.style.width = `${progressPercent}%`
        // calculate display for duration
        const durationMinutes = Math.floor(duration / 60 );
        let durationSeconds = Math.floor( duration % 60 );
        if(durationSeconds < 10 ) {
            durationSeconds = `0${durationSeconds}`;
        }
        // delay switching duration to avoid NAN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // calculate display for current
        const currentMinutes = Math.floor(currentTime / 60 );
        let currentSeconds = Math.floor( currentTime % 60 );
        if(currentSeconds < 10 ) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`

    }
}

// set progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener('click' , prevSora);
nextBtn.addEventListener('click' , nextSora);
music.addEventListener('timeupdate' , updateProgressBar)
music.addEventListener('ended' , nextSora);
progressContainer.addEventListener('click' , setProgressBar);

