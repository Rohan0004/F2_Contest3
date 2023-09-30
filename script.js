//button for adding new timers
const addTimeBtn = document.querySelector(".set-time > button");

//get time enter by user
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");

//container for storing timers
const timerContainer = document.getElementById("timers-container");
//adding timer in container
function addToList() {
    // get time enter by user and convert it in seconds
    let ss = (second.value === "") ? 0 : parseInt(second.value),
        mm = (minute.value === "") ? 0 : parseInt(minute.value),
        hh = (hour.value === "") ? 0 : parseInt(hour.value);
    let timeInSec = ss + mm * 60 + hh * 3600;
    let interval = null;
    let newTimerContainer=null;
    //checking the values enter by user 
    if (ss >= 0 && mm >= 0 && hh >= 0 && !isNaN(timeInSec) && timeInSec > 0) {
        newTimerContainer = document.createElement("div");
        newTimerContainer.className="timer";
        
        let newTimer = document.createElement("span");
        let deletButton = document.createElement("button");
        deletButton.innerText = "Delete";

        let stopPlayBtn = document.createElement("button");
        stopPlayBtn.innerText = "Stop";

        newTimer.innerHTML = `Time Left : ${printInFormat(hh, mm, ss)}`;

        newTimerContainer.append(newTimer, stopPlayBtn, deletButton);
        
        timerContainer.appendChild(newTimerContainer);
        decrementTime(newTimer, timeInSec);
        second.value = "";
        minute.value = "";
        hour.value = "";
        deletButton.addEventListener("click", () => {
            clearInterval(interval);
            timerContainer.removeChild(newTimerContainer);
            
        });
    } else {
        alert("Please enter correct values");
    }

    //for decrementing time, timerObj is reference of element which displays time
    function decrementTime(timerObj, timeInSec) {
        let totalTime = [timeInSec];
        interval = createInterval(timerObj, totalTime);

        let stopPlayBtn = timerObj.nextElementSibling;
        stopPlayBtn.addEventListener("click", () => {
            if (stopPlayBtn.innerText === "Stop") {
                clearInterval(interval);
                stopPlayBtn.innerText = "Start";
            } else {
                interval = createInterval(timerObj, totalTime);
                stopPlayBtn.innerText = "Stop";
            }
        });
    }

    function createInterval(timerObj, totalTime) {
        interval = setInterval(() => {
            totalTime[0]--;
            let hh = Math.floor(totalTime[0] / 3600), mm = Math.floor((totalTime[0] % 3600) / 60), ss = totalTime[0] % 60;
            timerObj.innerHTML = `Time Left :  ${printInFormat(hh, mm, ss)}`;

            if (totalTime[0] <= 0) {
                clearInterval(interval);
                timerObj.innerHTML = "Timer is Up!";
                timerObj.nextElementSibling.remove();   
                newTimerContainer.classList.add("timer-complete");             
            }
        }, 1000);
        return interval;
    }

    function printInFormat(hour, minute, second) {
        return hour.toString().padStart(2, '0') + " : " + minute.toString().padStart(2, "0") + " : " + second.toString().padStart(2, "0");
    }    
}

addTimeBtn.addEventListener("click", addToList);