var dices = [
  "./images/dice1.png",
  "./images/dice2.png",
  "./images/dice3.png",
  "./images/dice4.png",
  "./images/dice5.png",
  "./images/dice6.png",
];

function dicethrow() {
  var rolling = Math.floor(Math.random() * dices.length);
  var rolling2 = Math.floor(Math.random() * dices.length);
  document.getElementById("dice1").src = dices[rolling];
  document.getElementById("dice2").src = dices[rolling2];
  titlechanger(rolling, rolling2);
}

function titlechanger(rolling, rolling2) {
  if (rolling > rolling2) {
    document.getElementById("winner").innerHTML = "🚩 Player 1 wins ! ";
  } else if (rolling < rolling2) {
    document.getElementById("winner").innerHTML = " Player 2 wins ! 🚩";
  } else {
    document.getElementById("winner").innerHTML = " It's a tie";
  }
}

document.addEventListener("DOMContentLoaded", dicethrow);
