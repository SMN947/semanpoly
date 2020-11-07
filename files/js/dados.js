function rollDice() {
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach((die) => {
        toggleClasses(die);
        die.dataset.roll = getRandomNumber(1, 6);
        game.dados[die.dataset.id] = die.dataset.roll = getRandomNumber(1, 6);
        console.log(die.dataset);
        console.log(game.dados);
    });
  }
  
  function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }
  
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  document.getElementById("roll-button").addEventListener("click", rollDice);
  