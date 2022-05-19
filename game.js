
window.onload = function() {

  const status = document.getElementById("status"),
        start = document.getElementById("start"),
        end = document.getElementById("end"),
        gameArea = document.getElementById("game"),
        scoreUpdate = document.querySelector(".example"),
        boundaries = document.getElementsByClassName("boundary");

  var score = 0;

  
  start.addEventListener("mouseover", () => boundColorChange("#eeeeee"))
  
  
  start.addEventListener("click",() => {
    gameArea.addEventListener("mousemove", followCursor)

});

  

  function followCursor(e) {
    
    var target = e.target;
    if (target.classList.contains("boundary")) {
      
      boundColorChange("red")
      status.textContent = "You lost"
      score -= 10
      gameArea.removeEventListener("mousemove", followCursor)
      scoreUpdate.innerHTML = `Your score: ${score}`
    }

    if (target.getAttribute("id") === "end") {
      
      console.log(end.getBoundingClientRect().left + 20, e.x)
      if (end.getBoundingClientRect().left + 20 < e.x) {
        status.textContent = "You lost"
        score -= 10
        gameArea.removeEventListener("mousemove", followCursor)
        scoreUpdate.innerHTML = `Your score: ${score}`
        alert("Don't do that next time. You lost 10 points!")
      }

      status.textContent = "You won"
      score += 5
      gameArea.removeEventListener("mousemove", followCursor)
      scoreUpdate.innerHTML = `Your score: ${score}`
    }
  }


  function boundColorChange(color) {
    for (let i =0; i < boundaries.length; i++) {
      boundaries[i].style.backgroundColor = color
    }
  }
}

