// Stopwatch documents
const sStopwatchToggleBtn = document.getElementById("s-stopwatch-btn");
const sTimerToggleBtn = document.getElementById("s-timer-btn");
const stopwatchStartBtn = document.getElementById("stopwatch-start-btn");
const stopwatchStopBtn = document.getElementById("stopwatch-stop-btn");
const stopwatchResetBtn = document.getElementById("stopwatch-reset-btn");
const stopwatchTime = document.getElementById("stopwatch-numbers");
const stopwatchDiv = document.getElementById("stopwatch-div");
// Timer documents
const tStopwatchToggleBtn = document.getElementById("t-stopwatch-btn");
const tTimerToggleBtn = document.getElementById("t-timer-btn");
const timerStartBtn = document.getElementById("timer-start-btn");
const timerStopBtn = document.getElementById("timer-stop-btn");
const timerResetBtn = document.getElementById("timer-reset-btn");
const timerDiv = document.getElementById("timer-div");
// Other documents
const titleText = document.querySelector(".title-text");


// Stopwatch functions and play buttons
let [centiseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let int = null;

stopwatchStartBtn.addEventListener("click", () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
});

stopwatchStopBtn.addEventListener("click", () => {
    clearInterval(int);
});

stopwatchResetBtn.addEventListener("click", () => {
    clearInterval(int);
    [centiseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    stopwatchTime.innerHTML = "00 : 00 : 00 : 00";
});

const displayTimer = () => {
    centiseconds += 1;
    if (centiseconds == 100) {
        centiseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = centiseconds < 10 ? "0" + centiseconds : centiseconds;

    stopwatchTime.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}


// Timer functions and play buttons
let timer;
let totalTimeInSeconds = 0;
let isTimerRunning = false;

timerStartBtn.addEventListener('click', function () {
    if (!isTimerRunning) {
        isTimerRunning = true;
        const hours = parseInt(document.querySelector('.timer-hours').value, 10) || 0;
        const minutes = parseInt(document.querySelector('.timer-minutes').value, 10) || 0;
        const seconds = parseInt(document.querySelector('.timer-seconds').value, 10) || 0;

        // Calculate total time in seconds
        totalTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds;

        // Start the countdown
        timer = setInterval(updateTimer, 1000);
    }
});

timerStopBtn.addEventListener('click', function () {
    clearInterval(timer);
    isTimerRunning = false;
});

timerResetBtn.addEventListener('click', function () {
    clearInterval(timer);
    isTimerRunning = false;
    document.querySelector('.timer-hours').value = '00';
    document.querySelector('.timer-minutes').value = '00';
    document.querySelector('.timer-seconds').value = '00';
});

function updateTimer() {
    if (totalTimeInSeconds > 0) {
        totalTimeInSeconds--;

        const hours = Math.floor(totalTimeInSeconds / 3600);
        const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
        const seconds = totalTimeInSeconds % 60;

        document.querySelector('.timer-hours').value = String(hours).padStart(2, '0');
        document.querySelector('.timer-minutes').value = String(minutes).padStart(2, '0');
        document.querySelector('.timer-seconds').value = String(seconds).padStart(2, '0');
    } else {
        clearInterval(timer);
        isTimerRunning = false;
    }
}

// Swapping between timer and stopwatch
const stopwatchToggle = () => {
    sStopwatchToggleBtn.classList.add("chosen");
    sTimerToggleBtn.classList.remove("chosen");
    tStopwatchToggleBtn.classList.add("chosen");
    tTimerToggleBtn.classList.remove("chosen");
    
    // Change title text
    titleText.innerHTML = `Stopwatch`;

    // Reveal stopwatch container
    stopwatchDiv.classList.remove("hidden");
    timerDiv.classList.add("hidden");
}

const timerToggle = () => {
    sTimerToggleBtn.classList.add("chosen");
    sStopwatchToggleBtn.classList.remove("chosen");
    tTimerToggleBtn.classList.add("chosen");
    tStopwatchToggleBtn.classList.remove("chosen");

    // Change title text
    titleText.innerHTML = `Timer`;

    // Reveal timer container
    timerDiv.classList.remove("hidden");
    stopwatchDiv.classList.add("hidden");
}


sStopwatchToggleBtn.addEventListener("click", stopwatchToggle());

sTimerToggleBtn.addEventListener("click", () => timerToggle());

tStopwatchToggleBtn.addEventListener("click", () => stopwatchToggle());

tTimerToggleBtn.addEventListener("click", () => timerToggle());