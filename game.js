window.onload = function () {
  const status = document.getElementById("status"),
    start = document.getElementById("start"),
    end = document.getElementById("end"),
    gameArea = document.getElementById("game"),
    scoreUpdate = document.querySelector(".score"),
    liveScore = document.querySelector(".live-score");
  boundaries = document.getElementsByClassName("boundary");

  var score = 0;

  var min = document.getElementById("min"),
    sec = document.getElementById("sec"),
    milli_sec = document.getElementById("milli-sec");

  var stopWatch;
  var best = "0:0.0",
      isBestStarted = false;
  // var stopWatch = setInterval(startMilli, 100);

  // whenever the user hover on the start button the background color of the boundaries will be "#eeeeee"
  // start.addEventListener("mouseover", () => boundColorChange("#eeeeee"))

  // when start button clicked, cursor movements will be followed inside "#game" div only
  start.addEventListener("mousemove", () => {
    if (!stopWatch) {
      stopWatch = setInterval(startMilli, 100);
    }
    gameArea.addEventListener("mousemove", followCursor);
  });

  // call back functions

  // function behave according to each move of the cursor
  function followCursor(e) {
    boundColorChange("#eeeeee");

    var target = e.target; // target of the mouse while moving

    // if the cursor pointed to an element contains class "boundary", then the user hit the boundaries
    if (target.classList.contains("boundary")) {
      restartStopWatch()

      boundColorChange("red");
      status.textContent = "You lost";

      // stop following the cursor
      gameArea.removeEventListener("mousemove", followCursor);
      // print the new modified score
      scoreUpdate.innerHTML = `Your score: ${(score -= 10)}`;
    }
    // if the cursor arrived the end then he/she either cheated or won
    if (target.getAttribute("id") === "end") {
      // if the user cursor arrived from the right side, then he/she cheated
      // so if the distance between the middle of "#end" element and left offset is bigger than that of cursor and left offset
      if (end.getBoundingClientRect().left + 20 < e.x) {
        // then the user cheated
        restartStopWatch()
        
        status.textContent = "You lost";
        gameArea.removeEventListener("mousemove", followCursor); // stop following the cursor
        scoreUpdate.innerHTML = `Your score: ${(score -= 10)}`; // update the score
        alert("Don't do that next time. You lost 10 points!");
      }
      // the user won the game and gained 5 points. He/She can replay the game
      else {
        

        document.querySelector(".time_stats .scores .last-score span").innerText = `${min.innerText}:${sec.innerText}.${milli_sec.innerText}`
        let bstColonSplit = best.split(":");
        let bestMin = bstColonSplit[0],
            bstDotSplit = bstColonSplit[1].split("."),
            bestSec = bstDotSplit[0]
            bestMilli = bstDotSplit[1];

        if (isBestStarted == false) {
          document.querySelector(".time_stats .scores .best-score span").innerText = `${min.innerText}:${sec.innerText}.${milli_sec.innerText}`
          best = `${min.innerText}:${sec.innerText}.${milli_sec.innerText}`
          isBestStarted = true
        }
        else {

          if (parseInt(min.innerText + sec.innerText + milli_sec.innerText) < parseInt(bestMin + bestSec + bestMilli)) {
            document.querySelector(".time_stats .scores .best-score span").innerText = `${min.innerText}:${sec.innerText}.${milli_sec.innerText}`
            best = `${min.innerText}:${sec.innerText}.${milli_sec.innerText}`
          }
        }


        restartStopWatch()

        status.textContent = "You won";
        gameArea.removeEventListener("mousemove", followCursor);
        scoreUpdate.innerHTML = `Your score: ${(score += 5)}`;
      }
    }
  }

  // function colors the boundaries background with the given color
  function boundColorChange(color) {
    for (let i = 0; i < boundaries.length; i++) {
      boundaries[i].style.backgroundColor = color;
    }
  }

  function startMilli() {
    if (milli_sec.innerText == 9) {
      milli_sec.innerText = 0;
      incrementSec();
    } else {
      milli_sec.innerText = parseInt(milli_sec.innerText) + 1;
    }
  }

  function incrementSec() {
    if (sec.innerText == 59) {
      sec.innerText = 0;
      min.innerText = parseInt(min.innerText) + 1;
    } else {
      sec.innerText = parseInt(sec.innerText) + 1;
    }
  }

  function restartStopWatch() {
    clearInterval(stopWatch);
    stopWatch = undefined;
    min.innerText = 0
    sec.innerText = 0
    milli_sec.innerText = 0
  }
};
