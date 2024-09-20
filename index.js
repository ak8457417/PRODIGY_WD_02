let timer;
let isRunning = false;
let time = 0;
let laps = [];

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("startStopBtn").textContent = "Start";
        document.getElementById("pauseBtn").disabled = true;
    } else {
        timer = setInterval(updateDisplay, 10);
        document.getElementById("startStopBtn").textContent = "Stop";
        document.getElementById("pauseBtn").disabled = false;
    }
    isRunning = !isRunning;
}

function pause() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById("startStopBtn").textContent = "Start";
    document.getElementById("pauseBtn").disabled = true;
}

function updateDisplay() {
    time += 10;
    const formattedTime = formatTime(time);
    document.getElementById("display").textContent = formattedTime;
}

function reset() {
    clearInterval(timer);
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startStopBtn").textContent = "Start";
    document.getElementById("pauseBtn").disabled = true;
    isRunning = false;
    time = 0;
    laps = [];
    displayLaps();
}

function lap() {
    laps.push(time);
    displayLaps();
}

function displayLaps() {
    const lapsList = document.getElementById("laps");
    lapsList.innerHTML = "";  // Clear previous laps

    laps.forEach((lapTime, index) => {
        const li = document.createElement("li");
        // Corrected to use backticks for template literal
        li.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapsList.appendChild(li);

        setTimeout(() => {
            li.style.opacity = 1;
            li.style.transform = "translateY(0)";
        }, index * 100);  // Stagger animations for each lap
    });
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const millisecondsPart = String(Math.floor(milliseconds % 1000 / 10)).padStart(2, '0');
    // Corrected to use backticks for template literal
    return `${minutes}:${seconds}:${millisecondsPart}`;
}
