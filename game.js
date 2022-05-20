
window.onload = function() {

  const status = document.getElementById("status"),
        start = document.getElementById("start"),
        end = document.getElementById("end"),
        gameArea = document.getElementById("game"),
        scoreUpdate = document.querySelector(".example"),
        boundaries = document.getElementsByClassName("boundary");

  var score = 0;

  // whenever the user hover on the start button the background color of the boundaries will be "#eeeeee"
  start.addEventListener("mouseover", () => boundColorChange("#eeeeee"))
  
  // when start button clicked, cursor movements will be followed inside "#game" div only
  start.addEventListener("click",() => {
    gameArea.addEventListener("mousemove", followCursor)

});

  // call back functions

  // function behave according to each move of the cursor
  function followCursor(e) {
    
    var target = e.target; // target of the mouse while moving

    // if the cursor pointed to an element contains class "boundary", then the user hit the boundaries
    if (target.classList.contains("boundary")) {
      
      boundColorChange("red")
      status.textContent = "You lost"

      // stop following the cursor
      gameArea.removeEventListener("mousemove", followCursor)

      // print the new modified score
      scoreUpdate.innerHTML = `Your score: ${score -= 10}`
    }

    // if the cursor arrived the end then he/she either cheated or won
    if (target.getAttribute("id") === "end") {
      
      // if the user cursor arrived from the right side, then he/she cheated

      // if the distance between the middle of "#end" element and left offset is bigger than that of cursor and left offset
      if (end.getBoundingClientRect().left + 20 < e.x) { // then the user cheated

        status.textContent = "You lost"
        gameArea.removeEventListener("mousemove", followCursor) // stop following the cursor
        scoreUpdate.innerHTML = `Your score: ${score -= 10}` // update the score
        alert("Don't do that next time. You lost 10 points!")
      }
      // the user won the game and gained 5 points. He/She can replay the game
      else {
        status.textContent = "You won"
        gameArea.removeEventListener("mousemove", followCursor)
        scoreUpdate.innerHTML = `Your score: ${score += 5}`
      }
    }
  }

  // function colors the boundaries background with the given color
  function boundColorChange(color) {
    for (let i =0; i < boundaries.length; i++) {
      boundaries[i].style.backgroundColor = color
    }
  }
}

