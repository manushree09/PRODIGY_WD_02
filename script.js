let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let lapNumber = 1;

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps-list');

function startPauseTimer() {
    if (!running) {
        startTimer();
    } else {
        pauseTimer();
    }
}

function startTimer() {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(updateDisplay, 10);
    running = true;
    startPauseButton.textContent = 'Pause';
    resetButton.disabled = false;
    lapButton.disabled = false;
}

function pauseTimer() {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
    startPauseButton.textContent = 'Start';
}

function resetTimer() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.textContent = '00:00:00.00';
    startPauseButton.textContent = 'Start';
    resetButton.disabled = true;
    lapButton.disabled = true;
    lapsList.innerHTML = '';
    lapNumber = 1;
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((updatedTime % 1000) / 10);

    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
    if (running) {
        const lapTime = display.textContent;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapNumber++}: ${lapTime}`;
        lapsList.appendChild(li);
    }
}

startPauseButton.addEventListener('click', startPauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
